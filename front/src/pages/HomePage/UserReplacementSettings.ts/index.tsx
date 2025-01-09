import * as S from './styles';
import { NameReplacementBlock } from '../../../components/NameReplacementBlock';
import { useConfiguration } from '../../../store/configuration';
import { IconButton } from '../../../components/IconButton';


export const UserReplacementSettings = () => {
  const ttsConfiguration = useConfiguration(state => state.ttsConfiguration);
  const updateUserConfiguration = useConfiguration(state => state.updateUserConfiguration);

  return (
    <S.Container>
      <h2>TTS Chatter name replacement</h2>

      {
        ttsConfiguration.userReplacement
          .sort((a,b) => (a.ordinal - b.ordinal))
          .map(item => (
            <NameReplacementBlock
              key={item.id}
              replacement={item}
              onDelete={() => {
                updateUserConfiguration({
                  ttsConfiguration: {
                    ...ttsConfiguration,
                    userReplacement: [
                      ...ttsConfiguration.userReplacement.filter(v => v.id !== item.id),
                    ]
                  }
                });
              }}
              onChange={(newItem) => {
                updateUserConfiguration({
                  ttsConfiguration: {
                    ...ttsConfiguration,
                    userReplacement: [
                      ...ttsConfiguration.userReplacement.filter(v => v.id !== item.id),
                      newItem
                    ]
                  }
                });
              }}
            />
          ))
      }

      <IconButton style={{ margin: 'auto'}} type='add' onClick={() => {
        updateUserConfiguration({
          ttsConfiguration: {
            ...ttsConfiguration,
            userReplacement: [
              ...ttsConfiguration.userReplacement,
              {
                description: '',
                id: crypto.randomUUID(),
                ordinal: ttsConfiguration.userReplacement.length,
                regex: '',
                regexFlags: '',
                replaceWith: '',
              }
            ]
          }
        });
      }} />
    </S.Container>
  );
};