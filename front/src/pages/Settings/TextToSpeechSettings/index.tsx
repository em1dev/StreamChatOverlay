import { Select } from '@/components/Select';
import { ToggleInput } from '@/components/ToggleInput';
import { useConfiguration } from '@/store/configuration';
import { useTtsVoices } from '@/store/ttsVoices';
import { useCallback, useEffect, useState } from 'react';
import { UserPronunciationBlock } from './UserPronounciationBlock';
import { Icon } from '@iconify/react';
import { useTTS } from '@/hooks/useTTS/useTTS';
import { IconButton } from '@/components/IconButton';
import { Input } from '@/components/Input';
import { useAuth } from '@/context/authContext/useAuth';

import * as S from './styles';

export const TextToSpeechSettings = () => {
  const { session } = useAuth();
  const ttsConfiguration = useConfiguration(state => state.userConfiguration?.ttsConfiguration);
  const updateConfig = useConfiguration(state => state.updateUserConfiguration);

  const tts = useTTS();
  const { voices, setVoices } = useTtsVoices(state => state);

  const [testTtsMessage, setTestTtsMessage ] = useState<string>('Hello world');

  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') {
      console.log('speech synthesis is not suported');
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

  const speak = useCallback((text: string) => {
    tts.speak({
      fullMessageText: text,
      id: crypto.randomUUID(),
      sentBy: 'emydev',
      parts: [{
        content: text,
        originalContent: text,
        type: 'text',
      }]
    });
  }, [tts]);

  const onTryOutTts = useCallback(() => {
    tts.speak({
      fullMessageText: testTtsMessage,
      id: crypto.randomUUID(),
      sentBy: 'emydev',
      parts: [{
        content: testTtsMessage,
        originalContent: testTtsMessage,
        type: 'text',
      }]
    });
  }, [testTtsMessage, tts]);

  if (!ttsConfiguration) return null;

  return (
    <>
      <section>

        <h1>Text to speech</h1>

        <ToggleInput
          isChecked={ttsConfiguration.isTTSEnabled} 
          onChange={(value) => { updateConfig(
            { ttsConfiguration: {...ttsConfiguration, isTTSEnabled: value } },
            session
          ); }}
        >
          Enable TTS
        </ToggleInput>

        <S.VoiceSelectContainer>
          <label 
            htmlFor='tts-voice-selector-config'
          >
            Voice
          </label>
          <Select
            id="tts-voice-selector-config"
            value={ttsConfiguration.selectedVoice}
            onChange={(e) => {
              const newVoice = voices.find(v => v.voiceURI === e.target.value);
              updateConfig({
                ttsConfiguration: {
                  ...ttsConfiguration,
                  selectedVoice: newVoice?.voiceURI
                }
              }, session);
            }}
          >
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>{v.lang} - {v.name}</option>
            ))}
          </Select>
        </S.VoiceSelectContainer>

        <S.TryTtsContainer>
          <label htmlFor='try-out-tts-input'>Try out tts</label>
          <div>
            <Input id="try-out-tts-input" value={testTtsMessage} onChange={(e) => { setTestTtsMessage(e.target.value); }} />
            <IconButton onClick={onTryOutTts}>
              <Icon icon="mingcute:announcement-line" />
            </IconButton>
          </div>
        </S.TryTtsContainer>
      </section>

      <section>
        <h2>Emotes</h2>
        <ToggleInput
          isChecked={ttsConfiguration.readEmotes} 
          onChange={(value) => { updateConfig(
            { ttsConfiguration: {...ttsConfiguration, readEmotes: value } },
            session
          ); }}
        >
          Read emotes
        </ToggleInput>

        { ttsConfiguration.readEmotes && (
          <S.EmotesToReadContainer>
            <span>Read a maximun of</span>
            <Input
              type='number'
              min={1}
              value={ttsConfiguration.emotesToRead}
              onChange={(e) => { updateConfig(
                { ttsConfiguration: { ...ttsConfiguration, emotesToRead: parseInt(e.target.value) }},
                session
              ); }}
            />
            <span>emote per message</span>
          </S.EmotesToReadContainer>
        )}
      </section>

      <section>
        <h2>Ignore messages</h2>
        <div>
          <ToggleInput
            isChecked={ttsConfiguration.ignoreBotMessages}
            onChange={(value) => { updateConfig(
              { ttsConfiguration: {...ttsConfiguration, ignoreBotMessages: value } },
              session
            ); }}
          >
            Don't read bot messages
          </ToggleInput>
        </div>

        <ToggleInput
          isChecked={ttsConfiguration.ignoreCommandMessages} 
          onChange={(value) => { updateConfig(
            { ttsConfiguration: {...ttsConfiguration, ignoreCommandMessages: value } },
            session
          ); }}
        >
          Don't read commands ( messages starting with ! )
        </ToggleInput>

        <ToggleInput
          isChecked={ttsConfiguration.readUnderscoresAsSpaces}
          onChange={(value) => { updateConfig(
            { ttsConfiguration: {...ttsConfiguration, readUnderscoresAsSpaces: value } },
            session
          ); }}
        >
          Don't read underscores
        </ToggleInput>
        <p>Underscores will be subtituted by spaces improving the readability of names like 'emy_is_here'</p>
        <S.TTSExampleBlock>
          <span>emy_is_here</span>
          <IconButton onClick={() => speak('emy_is_here')}>
            <Icon icon="mingcute:announcement-line" />
          </IconButton>
        </S.TTSExampleBlock>
      </section>

      <section>
        <h2>Fun</h2>
        <ToggleInput
          isChecked={ttsConfiguration.allowRoleplay} 
          onChange={(value) => { updateConfig(
            { ttsConfiguration: { ...ttsConfiguration, allowRoleplay: value }},
            session
          ); }}
        >
          Allow roleplay
        </ToggleInput>
        <p>Messages surrounded by asterisks will be read with the chatter name prepended</p>

        <S.TTSExampleBlock>
          <span>*says hi*</span>
          <IconButton onClick={() => speak('*says hi*')}>
            <Icon icon="mingcute:announcement-line" />
          </IconButton>
        </S.TTSExampleBlock>
      </section>


      <section>
        <h2>Pronunciation</h2>
        <p>Change how a chatter name is pronounced</p>
        <UserPronunciationBlock />
      </section>
    </>
  );
};