import { useCallback, useEffect, useMemo, useState } from 'react';
import { applyTTSMessageTransformations } from './configuration';
import { TTSMessage } from '../../types';
import { useChatSettings, useStore } from '@/store';
import { TTSSettings } from '@/types/settingsTypes';
import { setTtsVoices } from '@/store/actions/voiceActions';


export const useTTS = () => {
  const voices = useStore(state => state.voices);
  const ttsSettings = useChatSettings(state => state.ttsConfiguration);
  const [messagesToRead, setMessagesToRead] = useState<Array<{
    id: string,
    text: string
  }>>([]);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);

  const validTTSConfiguration: TTSSettings = useMemo(() => ({
    ...ttsSettings,
    userReplacement: ttsSettings
      .userReplacement
      .filter(r => r.regex.length > 0) // avoid empty rules to stop it from replacing everything
  }), [ttsSettings]);

  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') {
      console.log('speech synthesis is not suported');
      return;
    }

    const onVoicesChange = () => {
      const voices = speechSynthesis.getVoices();
      setTtsVoices(voices);
    };

    onVoicesChange();

    speechSynthesis.addEventListener('voiceschanged', onVoicesChange);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChange);
    };
  }, []);

  const speakInternal = useCallback((text: string, onEnd: () => void) => {
    // speak
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const foundVoice = voices.find(v => (v.voiceURI === validTTSConfiguration.selectedVoice));
    utterance.voice = foundVoice ?? null;
    utterance.addEventListener('end', onEnd);
    // clear queue on error anyway to try again on next message
    //   it usually errors if the user has not interacted with the page
    utterance.addEventListener('error', onEnd);
    speechSynthesis.speak(utterance);
  }, [validTTSConfiguration]);

  useEffect(() => {
    const continueReadingChat = () => {
      if (currentMessageId !== null)
        return;

      const messageToRead = messagesToRead.at(0);
      if (!messageToRead) return;

      setMessagesToRead(prev => prev
        .filter(msg => msg.id !== messageToRead.id)
      );

      setCurrentMessageId(messageToRead.id);
      speakInternal(messageToRead.text, () => {
        setCurrentMessageId(null);
      });
    };

    continueReadingChat();

  }, [messagesToRead, speakInternal, currentMessageId]);

  const onRemoveMessage = useCallback((messageIds: Array<string>) => {
    if (currentMessageId !== null && messageIds.includes(currentMessageId)) {
      // is currentlty playing a message we want to remove
      speechSynthesis.cancel();
      setCurrentMessageId(null);
    }

    setMessagesToRead(msgs => msgs.filter(msg =>
      !messageIds.includes(msg.id)
    ));
  }, [currentMessageId]);

  const speakExternal = useCallback((message: TTSMessage) => {
    const messageToRead = applyTTSMessageTransformations(message, validTTSConfiguration);
    if (messageToRead == null) return null;
    setMessagesToRead(prev => [...prev, { id: message.id, text: messageToRead } ]);
    return messageToRead;
  }, [validTTSConfiguration]);

  const clearQueue = useCallback(() => {
    setMessagesToRead([]);
    setCurrentMessageId(null);
    speechSynthesis.cancel();
  }, []);

  return {
    clearQueue,
    onRemoveMessage,
    speak: speakExternal,
    voices,
  };
};
