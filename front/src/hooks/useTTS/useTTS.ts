import { useCallback, useEffect, useMemo, useState } from 'react';
import { applyTTSMessageTransformations } from './configuration';
import { TTSMessage } from '../../types';
import { useConfiguration } from '../../store/configuration';
import { useTtsVoices } from '../../store/ttsVoices';
import { TTSConfiguration } from '@/types/userConfigurationTypes';


export const useTTS = () => {
  const configuration = useConfiguration(state => state.userConfiguration.ttsConfiguration);
  const [messagesToRead, setMessagesToRead] = useState<Array<TTSMessage>>([]);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  const { setVoices, voices } = useTtsVoices(state => state);

  const validTTSConfiguration: TTSConfiguration = useMemo(() => ({
    ...configuration,
    userReplacement: configuration
      .userReplacement
      .filter(r => r.regex.length > 0) // avoid empty rules to stop it from replacing everything
  }), [configuration]);

  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') {
      console.log('speach synthesis is not suported');
      return;
    }

    const onVoicesChange = () => {
      const voices = speechSynthesis.getVoices();
      setVoices(voices);
    };

    onVoicesChange();

    speechSynthesis.addEventListener('voiceschanged', onVoicesChange);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChange);
    };
  }, [setVoices]);

  const speakInternal = useCallback((message: TTSMessage, onEnd: () => void) => {
    // parse
    const messageToRead = applyTTSMessageTransformations(message, validTTSConfiguration);

    // speak
    const utterance = new SpeechSynthesisUtterance(messageToRead);
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
      speakInternal(messageToRead, () => {
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
    setMessagesToRead(prev => [...prev, message]);
  }, []);

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