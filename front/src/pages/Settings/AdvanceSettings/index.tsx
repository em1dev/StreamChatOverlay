import { updateChatSettings } from '@/store/actions/chatActions';
import { TTSReplacementBlock } from './TTSReplacementBlock';
import { useChatSettings } from '@/store';
import * as S from './style';

export const AdvanceSettings = () => {
  const configuration = useChatSettings(state => state);

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
                  updateChatSettings({
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
                  updateChatSettings({
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
          updateChatSettings({
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
