import { themeKeyMap, ThemeKeys, themeKeyWithDisplayName } from '@/themes/chatThemes';
import { Select } from '../Select';
import { useConfiguration } from '@/store/configuration';
import { useId, useMemo } from 'react';
import { useAuth } from '@/context/authContext/useAuth';

import * as S from './styles';

export interface ThemePickerProps {
  label?: string
}

export const ThemePicker = (props: ThemePickerProps) => {
  const id = useId();
  const { session } = useAuth();
  const themeKey = useConfiguration(c => c.userConfiguration.chatTheme);
  const themeVariant = useConfiguration(c => c.userConfiguration.chatThemeVariant);
  const updateConfig = useConfiguration(c => c.updateUserConfiguration);

  const variants = useMemo(() => {
    const themeVariants = (themeKey ? themeKeyMap[themeKey] : themeKeyMap['duck']) ?? themeKeyMap['duck']; 
    return Object.entries(themeVariants);
  }, [themeKey]);

  return (
    <S.Container>
      <label htmlFor={id}>
        <h2>
          {props.label ?? 'Theme'}
        </h2>
      </label>
      <Select id={id} value={themeKey} onChange={(e) => {
        updateConfig({ chatTheme: e.target.value as ThemeKeys, chatThemeVariant: 'default' }, session);
      }}>
        {themeKeyWithDisplayName.map(v => (
          <option key={v.key} value={v.key}>{v.displayName}</option>
        ))}
      </Select>

      <h2>Color Variant</h2>
      <S.ColorButtonContainer>
        {variants.map(v => (
          <S.ColorButton
            title={v[0]}
            key={v[0]}
            onClick={() => {
              updateConfig({ chatThemeVariant: v[0] }, session);
            }}
            $selected={
              !themeVariant ? v[0] == 'default' : v[0] == themeVariant
            }
            $color={v[1].displayColor}
          />
        ))}
      </S.ColorButtonContainer>
    </S.Container>
  );
};