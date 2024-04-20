import * as S from './styles';
import { useEffect } from 'react';
import { useConfiguration } from '../../../store/configuration';
import { useTtsVoices } from '../../../store/ttsVoices';
import { TTSReplacementBlock } from '../../../components/TTSReplacementBlock';
import { IconButton } from '../../../components/IconButton';
import { Select } from '../../../components/Select';

export const TTSSettings = () => {
  const { voices, setVoices } = useTtsVoices(state => state);
  const { 
    updateUserConfiguration,
    ...configuration
  } = useConfiguration(state => state);

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
    <S.Container>
      <h2>TTS Settings</h2>

      <div>
        <input
          id='config-checkbox-ttsenabled'
          type='checkbox'
          checked={configuration.isTTSEnabled}
          onChange={(e) => {
            updateUserConfiguration({
              isTTSEnabled: e.target.checked
            });
          }}
        />
        <label htmlFor='config-checkbox-ttsenabled'>Enable TTS</label>
      </div>

      <Select
        value={configuration.ttsConfiguration.selectedVoice}
        onChange={(e) => {
          const newVoice = voices.find(v => v.voiceURI === e.target.value);
          updateUserConfiguration({
            ttsConfiguration: {
              ...configuration.ttsConfiguration,
              selectedVoice: newVoice?.voiceURI
            }
          });
        }}
      >
        {
          voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name}</option>
          ))
        }
      </Select>

      <h2>Replacements</h2>
      {
        configuration.ttsConfiguration.replacements
          .sort((a,b) => (a.ordinal - b.ordinal))
          .map((r) => (
            <TTSReplacementBlock 
              canAddSubReplacement
              key={r.id}
              onDelete={() => {
                updateUserConfiguration({
                  ttsConfiguration: {
                    ...configuration.ttsConfiguration,
                    replacements: [
                      ...configuration.ttsConfiguration.replacements
                        .filter(re => re.id !== r.id),
                    ]
                  }
                });
              }}
              onChange={(newR) => {
                updateUserConfiguration({
                  ttsConfiguration: {
                    ...configuration.ttsConfiguration,
                    replacements: [
                      ...configuration.ttsConfiguration.replacements
                        .filter(re => re.id !== r.id),
                      newR
                    ]
                  }
                });
              }}
              replacement={r}
            />
          ))
      }

      <IconButton style={{ margin: '0 auto' }} type='add' onClick={() => {
        updateUserConfiguration({
          ttsConfiguration: {
            ...configuration.ttsConfiguration,
            replacements: [
              ...configuration.ttsConfiguration.replacements,
              {
                description: '',
                id: crypto.randomUUID(),
                ordinal: configuration.ttsConfiguration.replacements.length,
                regex: '',
                regexFlags: '',
                replaceWith: '',
                replaceFullMessage: false,
              }
            ]
          }});
      }}/>
    </S.Container>
  );
};