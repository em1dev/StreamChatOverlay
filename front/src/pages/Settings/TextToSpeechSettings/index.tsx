import * as S from './styles';
import { Select } from '@/components/Select';
import { ToggleInput } from '@/components/ToggleInput';
import { useConfiguration } from '@/store/configuration';
import { useTtsVoices } from '@/store/ttsVoices';
import { SettingsTemplate } from '@/templates/SettingsTemplate';
import { useCallback, useEffect, useState } from 'react';
import { UserPronunciationBlock } from './UserPronounciationBlock';
import { Icon } from '@iconify/react';
import { useTTS } from '@/hooks/useTTS/useTTS';
import { IconButton } from '@/components/IconButton';
import { Input } from '@/components/Input';

export const TextToSpeechSettings = () => {
  const ttsConfiguration = useConfiguration(c => c.ttsConfiguration);
  const updateConfig = useConfiguration(c => c.updateUserConfiguration);

  const tts = useTTS();
  const { voices, setVoices } = useTtsVoices(state => state);

  const [testTtsMessage, setTestTtsMessage ] = useState<string>('Hello world');

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

  const speak = useCallback((text: string) => {
    tts.speak({
      content: text,
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
      content: testTtsMessage,
      id: crypto.randomUUID(),
      sentBy: 'emydev',
      parts: [{
        content: testTtsMessage,
        originalContent: testTtsMessage,
        type: 'text',
      }]
    });
  }, [testTtsMessage, tts]);

  return (
    <SettingsTemplate>
      <section>

        <h1>Text to speech</h1>

        <ToggleInput
          isChecked={ttsConfiguration.isTTSEnabled} 
          onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, isTTSEnabled: value } }); }}
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
              });
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
          onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readEmotes: value } }); }}
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
              onChange={(e) => { updateConfig({ ttsConfiguration: { ...ttsConfiguration, emotesToRead: parseInt(e.target.value) }}); }}
            />
            <span>emote per message</span>
          </S.EmotesToReadContainer>
        )}
      </section>

      <section>

        <h2>Ignore messages</h2>
        <div>
          <ToggleInput
            isChecked={ttsConfiguration.readBots}
            onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readBots: value } }); }}
          >
            Don't read bot messages
          </ToggleInput>
        </div>

        <ToggleInput
          isChecked={ttsConfiguration.readCommands} 
          onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readCommands: value } }); }}
        >
          Don't read commands ( messages starting with ! )
        </ToggleInput>

        <ToggleInput
          isChecked={ttsConfiguration.readUnderscoresAsSpaces}
          onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readUnderscoresAsSpaces: value } }); }}
        >
          Don't read underscores
        </ToggleInput>
        <p>Underscores will be subtituted by spaces improving the readability of names like 'potatoe_is_here'</p>
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
          onChange={(value) => { updateConfig({ ttsConfiguration: { ...ttsConfiguration, allowRoleplay: value }}); }}
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

    </SettingsTemplate>
  );
};