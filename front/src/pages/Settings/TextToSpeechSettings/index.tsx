import { Select } from '@/components/Select';
import { ToggleInput } from '@/components/ToggleInput';
import { updateUserConfiguration } from '@/store/configurationStore/actions';
import { useConfigurationStore } from '@/store/configurationStore';
import { useTtsVoiceStore, setTtsVoices } from '@/store/ttsVoices';
import { useCallback, useEffect, useState } from 'react';
import { UserPronunciationBlock } from './UserPronounciationBlock';
import { Icon } from '@iconify/react';
import { useTTS } from '@/hooks/useTTS/useTTS';
import { IconButton } from '@/components/IconButton';
import { Input } from '@/components/Input';
import { MessagePart } from '@/types';

import * as S from './styles';


export const TextToSpeechSettings = () => {
  const ttsConfiguration = useConfigurationStore(state => state.userConfiguration?.ttsConfiguration);

  const tts = useTTS();
  const { voices } = useTtsVoiceStore(state => state);

  const [testTtsMessage, setTestTtsMessage ] = useState<string>('Hello world');

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

  const speak = useCallback((text: string) => {
    const parts:Array<MessagePart> = [];

    if (ttsConfiguration.onlyReadMessagesThatStartWithTtsCommand &&
      ttsConfiguration.ttsCommand.length > 0
    ) {
      parts.push({
        content: ttsConfiguration.ttsCommand,
        originalContent: ttsConfiguration.ttsCommand,
        type: 'text',
      });
    }

    parts.push({
      content: text,
      originalContent: text,
      type: 'text',
    });

    tts.speak({
      id: crypto.randomUUID(),
      isCommand: false,
      isFromBot: false,
      sentBy: 'emydev',
      parts: parts
    });
  }, [tts, ttsConfiguration]);

  if (!ttsConfiguration) return null;

  return (
    <>
      <h1>Text to speech</h1>

      <section>
        <h2>Settings</h2>
        <ToggleInput
          isChecked={ttsConfiguration.isTTSEnabled}
          onChange={(value) => { updateUserConfiguration(
            { ttsConfiguration: {...ttsConfiguration, isTTSEnabled: value } }); }}
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
              updateUserConfiguration({
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
            <IconButton onClick={() => speak(testTtsMessage)}>
              <Icon icon="mingcute:announcement-line" />
            </IconButton>
          </div>
        </S.TryTtsContainer>
      </section>

      <section>
        <h2>When to read messages</h2>

        <S.InlineInputContainer>
          <ToggleInput
            isChecked={ttsConfiguration.onlyReadMessagesThatStartWithTtsCommand}
            onChange={(value) => { updateUserConfiguration(
              { ttsConfiguration: {...ttsConfiguration, onlyReadMessagesThatStartWithTtsCommand: value } }); }}
          >
            Only read messages starting with
          </ToggleInput>
          <Input
            value={ttsConfiguration.ttsCommand}
            onChange={(e) => {
              updateUserConfiguration({
                ttsConfiguration: { ...ttsConfiguration, ttsCommand: e.target.value }
              });
            }}
          />
        </S.InlineInputContainer>

        <div>
          <ToggleInput
            isChecked={ttsConfiguration.ignoreBotMessages}
            onChange={(value) => { updateUserConfiguration(
              { ttsConfiguration: {...ttsConfiguration, ignoreBotMessages: value } }); }}
          >
            Don't read bot messages
          </ToggleInput>
        </div>

        <ToggleInput
          isChecked={ttsConfiguration.ignoreCommandMessages}
          onChange={(value) => { updateUserConfiguration(
            { ttsConfiguration: {...ttsConfiguration, ignoreCommandMessages: value } }); }}
        >
          Don't read commands ( messages starting with ! )
        </ToggleInput>

        <ToggleInput
          isChecked={ttsConfiguration.readUnderscoresAsSpaces}
          onChange={(value) => { updateUserConfiguration(
            { ttsConfiguration: {...ttsConfiguration, readUnderscoresAsSpaces: value } }); }}
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
        <h2>Emotes</h2>
        <ToggleInput
          isChecked={ttsConfiguration.readEmotes}
          onChange={(value) => { updateUserConfiguration(
            { ttsConfiguration: {...ttsConfiguration, readEmotes: value } }); }}
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
              onChange={(e) => { updateUserConfiguration(
                { ttsConfiguration: { ...ttsConfiguration, emotesToRead: parseInt(e.target.value) }}); }}
            />
            <span>emote per message</span>
          </S.EmotesToReadContainer>
        )}
      </section>

      <section>
        <h2>Fun</h2>
        <ToggleInput
          isChecked={ttsConfiguration.allowRoleplay}
          onChange={(value) => { updateUserConfiguration(
            { ttsConfiguration: { ...ttsConfiguration, allowRoleplay: value }}); }}
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
        <h2>Urls</h2>
        <ToggleInput
          isChecked={ttsConfiguration.replaceUrls}
          onChange={(value) => { updateUserConfiguration(
            { ttsConfiguration: { ...ttsConfiguration, replaceUrls: value }});
          }}
        >
          Replace messages containing urls with
        </ToggleInput>
        <Input
          value={ttsConfiguration.replaceUrlWith}
          onChange={(e) => {
            updateUserConfiguration({
              ttsConfiguration: { ...ttsConfiguration, replaceUrlWith: e.target.value }
            });
          }}
        />
        <p>$who is replace with the user sending the message</p>

        <S.TTSExampleBlock>
          <span>{ location.origin }</span>
          <IconButton onClick={() => speak(location.origin)}>
            <Icon icon="mingcute:announcement-line" />
          </IconButton>
        </S.TTSExampleBlock>
      </section>

      <section>
        <h2>Pronunciation</h2>
        <p>Change how a chatter name is pronounced</p>
        <UserPronunciationBlock speak={speak} />
      </section>
    </>
  );
};
