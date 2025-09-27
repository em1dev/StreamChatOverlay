import * as S from './styles';
import { Select } from '@/components/Select';
import { ToggleInput } from '@/components/ToggleInput';
import { useConfiguration } from '@/store/configuration';
import { useTtsVoices } from '@/store/ttsVoices';
import { SettingsTemplate } from '@/templates/SettingsTemplate';
import { useEffect } from 'react';

export const TextToSpeechSettings = () => {
  const ttsConfiguration = useConfiguration(c => c.ttsConfiguration);
  const updateConfig = useConfiguration(c => c.updateUserConfiguration);

  const { voices, setVoices } = useTtsVoices(state => state);

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

  return (
    <SettingsTemplate>
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


      <div>
        <ToggleInput
          isChecked={ttsConfiguration.readEmotes} 
          onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readEmotes: value } }); }}
        >
          Read emotes
        </ToggleInput>
      </div>

      { ttsConfiguration.readEmotes && (
        <S.EmotesToReadContainer>
          <span>Read a maximun of</span>
          <input
            type='number'
            min={1}
            value={ttsConfiguration.emotesToRead}
            onChange={(e) => { updateConfig({ ttsConfiguration: { ...ttsConfiguration, emotesToRead: parseInt(e.target.value) }}); }}
          />
          <span>emote per message</span>
        </S.EmotesToReadContainer>
      )}

      <div>
        <ToggleInput
          isChecked={ttsConfiguration.readBots}
          onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readBots: value } }); }}
        >
          Read bots
        </ToggleInput>
      </div>

      <ToggleInput
        isChecked={ttsConfiguration.readCommands} 
        onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readCommands: value } }); }}
      >
        Read commands ( messages starting with ! )
      </ToggleInput>

      <h2>Extra</h2>

      <ToggleInput
        isChecked={ttsConfiguration.readUnderscoresAsSpaces}
        onChange={(value) => { updateConfig({ ttsConfiguration: {...ttsConfiguration, readUnderscoresAsSpaces: value } }); }}
      >
        Read underscores as spaces
      </ToggleInput>
    </SettingsTemplate>
  );
};