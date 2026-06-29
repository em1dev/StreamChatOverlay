import { themeKeyMap, ThemeKeys, themeKeyWithDisplayName } from '@/themes/chatThemes';
import { Select } from '../core/Select';
import { useId, useMemo } from 'react';


import * as S from './styles';

export interface ThemePickerProps {
  label?: string,
  themeKey: ThemeKeys,
  themeVariant?: string,
  onChange: (
    themeKey: ThemeKeys,
    themeVariant: string
  ) => void
}

export const ThemePicker = ({
  onChange,
  themeKey,
  label,
  themeVariant
}: ThemePickerProps) => {
  const id = useId();

  const variants = useMemo(() => {
    const themeVariants = (themeKey ? themeKeyMap[themeKey] : themeKeyMap['duck']) ?? themeKeyMap['duck'];
    return Object.entries(themeVariants);
  }, [themeKey]);

  return (
    <S.Container>
      <label htmlFor={id}>
        <h2>
          {label ?? 'Theme'}
        </h2>
      </label>
      <Select id={id} value={themeKey} onChange={(e) => {
        onChange(e.target.value as ThemeKeys, 'default');
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
              onChange(themeKey, v[0]);
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
