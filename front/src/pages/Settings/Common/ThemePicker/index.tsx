import { Select } from '@/components/Select';
import { useConfiguration } from '@/store/configuration';
import { ThemeKeys } from '@/themes/chatThemes';
import { useId } from 'react';

export const ThemePicker = () => {
  const id = useId();
  const themeKey = useConfiguration(state => state.userConfiguration?.chatTheme);
  const updateConfig = useConfiguration(state => state.updateUserConfiguration);

  return (
    <>
      <label htmlFor={id}>
        <h2>
          Theme
        </h2>
      </label>
      <Select id={id} value={themeKey} onChange={(e) => {updateConfig({ chatTheme: e.target.value as ThemeKeys });}}>
        <option value={'duck' satisfies ThemeKeys}>Duck</option>
        <option value={'coffee' satisfies ThemeKeys}>Coffee</option>
        <option value={'pink' satisfies ThemeKeys}>Pink</option>
        <option value={'floating' satisfies ThemeKeys}>Floating</option>
        <option value={'contrast' satisfies ThemeKeys}>Contrast</option>
      </Select>
    </>
  );
};