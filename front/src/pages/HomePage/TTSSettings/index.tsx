import * as S from './styles';
import { useConfiguration } from '../../../store/configuration';
import { TTSReplacementBlock } from '../../../components/TTSReplacementBlock';
import { IconButton } from '../../../components/IconButton';

export const TTSSettings = () => {
  const { 
    updateUserConfiguration,
    ...configuration
  } = useConfiguration(state => state);

  return (
    <S.Container>

      <h2>TTS Text Replacements</h2>
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