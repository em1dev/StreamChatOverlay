import { Icon } from '@iconify/react';
import { useCallback, useMemo } from 'react';
import { TTSReplacement } from '@/types/userConfigurationTypes';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/IconButton';
import { removeRegexCharacters } from '@/utils/regexUtils';
import { updateUserConfiguration } from '@/store/configurationStore/actions';
import { useConfigurationStore } from '@/store/configurationStore';

import * as S from './styles';


export interface UserPronunciationBlockProps
{
  speak: (text: string) => void,
}

export const UserPronunciationBlock = ({
  speak
}: UserPronunciationBlockProps) => {
  const ttsConfiguration = useConfigurationStore(c => c.userConfiguration.ttsConfiguration);
  const userReplacement = useConfigurationStore(c => c.userConfiguration.ttsConfiguration.userReplacement);

  const userReplacementOrdered = useMemo(() => (
    userReplacement.sort((a,b) => a.ordinal - b.ordinal)
  ), [userReplacement]);

  const removeReplacement = useCallback((replacement: TTSReplacement) => {
    const newList = userReplacement.filter(item => item.id !== replacement.id);
    updateUserConfiguration({
      ttsConfiguration: {
        ...ttsConfiguration,
        userReplacement: newList
      }
    });
  }, [userReplacement, ttsConfiguration]);

  const addNewReplacement = useCallback(() => {
    const newOrdinal = (userReplacementOrdered.at(-1)?.ordinal ?? 0) + 1;

    updateUserConfiguration({
      ttsConfiguration: {
        ...ttsConfiguration,
        userReplacement: [
          ...userReplacementOrdered,
          {
            id: crypto.randomUUID(),
            isEnabled: true,
            description: '',
            ordinal: newOrdinal,
            regex: '',
            regexFlags: '',
            replaceWith: '',
          }
        ]
      }
    });
  }, [userReplacementOrdered, ttsConfiguration]);

  const updateReplacement = useCallback((replacement: TTSReplacement) => {
    const newList = [
      ...userReplacement.filter(item => item.id !== replacement.id),
      {
        ...replacement,
        regex: removeRegexCharacters(replacement.regex),
        replaceWith: removeRegexCharacters(replacement.replaceWith)
      }
    ];
    updateUserConfiguration({
      ttsConfiguration: {
        ...ttsConfiguration,
        userReplacement: newList
      }
    });
  }, [userReplacement, ttsConfiguration]);

  return (
    <S.Container>
      <thead>
        <tr>
          <th></th>
          <th>User name</th>
          <th>Pronunciation</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {
          userReplacementOrdered
            .map(item => (
              <tr key={item.id}>
                <td>
                  <IconButton title='remove row' onClick={() => removeReplacement(item)}>
                    <Icon icon="mingcute:close-fill" />
                  </IconButton>
                </td>
                <td>
                  <Input
                    onChange={(e) => updateReplacement({ ...item, regex: e.target.value })}
                    value={item.regex}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) => updateReplacement({ ...item, replaceWith: e.target.value })}
                    value={item.replaceWith}
                  />
                </td>
                <td>
                  <IconButton title='speak name' onClick={() => speak(item.replaceWith)} >
                    <Icon icon="mingcute:announcement-line" />
                  </IconButton>
                </td>
              </tr>
            ))
        }
      </tbody>

      <tfoot>
        <tr>
          <td></td>
          <td colSpan={2}>
            <button onClick={() => addNewReplacement()}>Add new row</button>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </S.Container>
  );
};
