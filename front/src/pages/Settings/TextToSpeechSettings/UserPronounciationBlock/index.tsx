import { useTTS } from '@/hooks/useTTS/useTTS';
import * as S from './styles';
import { useConfiguration } from '@/store/configuration';
import { Icon } from '@iconify/react';
import { useCallback, useMemo } from 'react';
import { TTSReplacement } from '@/types/userConfigurationTypes';
import { Input } from '@/components/Input';
import { IconButton } from '@/components/IconButton';

export const UserPronunciationBlock = () => {
  const updateConfig = useConfiguration(c => c.updateUserConfiguration);
  const ttsConfiguration = useConfiguration(c => c.ttsConfiguration);
  const userReplacement = useConfiguration(c => c.ttsConfiguration.userReplacement);
  const tts = useTTS();

  const userReplacementOrdered = useMemo(() => (
    userReplacement.sort((a,b) => a.ordinal - b.ordinal)
  ), [userReplacement]);

  const speak = useCallback((text: string) => {
    tts.speak({
      id: crypto.randomUUID(),
      content: text,
      parts: [{ content: text, originalContent: text, type: 'text' }]
    });
  }, [tts]);

  const removeReplacement = useCallback((replacement: TTSReplacement) => {
    const newList = userReplacement.filter(item => item.id !== replacement.id);
    updateConfig({
      ttsConfiguration: {
        ...ttsConfiguration,
        userReplacement: newList
      }
    });
  }, [userReplacement, ttsConfiguration, updateConfig]);

  const addNewReplacement = useCallback(() => {
    const newOrdinal = (userReplacementOrdered.at(-1)?.ordinal ?? 0) + 1;

    updateConfig({
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
  }, [userReplacementOrdered, ttsConfiguration, updateConfig]);

  const updateReplacement = useCallback((replacement: TTSReplacement) => {
    const newList = [
      ...userReplacement.filter(item => item.id !== replacement.id),
      replacement
    ];
    updateConfig({
      ttsConfiguration: {
        ...ttsConfiguration,
        userReplacement: newList
      }
    });
  }, [userReplacement, ttsConfiguration, updateConfig]);

  return (
    <S.Container cellSpacing={10}>
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