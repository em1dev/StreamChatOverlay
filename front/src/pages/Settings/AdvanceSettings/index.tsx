import * as S from './style';
import { useConfiguration } from '@/store/configuration';
import { TTSReplacementBlock } from './TTSReplacementBlock';

export const AdvanceSettings = () => {
  const configuration = useConfiguration(state => state.userConfiguration);
  const updateUserConfiguration = useConfiguration(state => state.updateUserConfiguration);

  if (configuration == null) return null;

  return (
    <>
      <h1>Advance Settings</h1>

      <p>TTS Replacement Rules</p>
      <p>
        Regex rules used for text subtition in text to speech.
      </p>
      <p>
        Be aware that broken regex might break things.
      </p>

      <p>
        The description field is there to explain what each regex is meant to do.
      </p>

      <S.BlockContainer>
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

        <button onClick={() => {
          updateUserConfiguration({
            ttsConfiguration: {
              ...configuration.ttsConfiguration,
              replacements: [
                ...configuration.ttsConfiguration.replacements,
                {
                  description: '',
                  id: crypto.randomUUID(),
                  isEnabled: true,
                  ordinal: configuration.ttsConfiguration.replacements.length,
                  regex: '',
                  regexFlags: '',
                  replaceWith: '',
                  replaceFullMessage: false,
                }
              ]
            }});
        }}>
          Add new block
        </button>
      </S.BlockContainer>
    </>
  );

};