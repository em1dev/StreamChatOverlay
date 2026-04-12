import { useAuth } from '@/context/authContext/useAuth';
import { FontKeys, FontMap } from '@/fonts/ChatFonts';
import { useConfiguration } from '@/store/configuration';
import { Select } from '../Select';
import { useId } from 'react';

import * as S from './styles';

const FontPicker = () => {
  const id = useId();
  const selectedFontKey = useConfiguration(state => state.userConfiguration.chatFont);
  const selectedFont = FontMap[selectedFontKey];
  const { session } = useAuth();
  const updateConfig = useConfiguration(state => state.updateUserConfiguration);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as FontKeys || undefined;
    if (newValue == undefined) return;
    updateConfig({ chatFont: newValue }, session);
  };

  return (
    <div>
      <label htmlFor={id}>
        <h2>
          Font
        </h2>
      </label>

      <Select
        id={id}
        $fontFamily={selectedFont.fontFamily}
        $fontWeight={selectedFont.overrideWeight ?? 'regular'}
        value={selectedFontKey}
        onChange={onChange}
      >
        {Object.entries(FontMap).map(([key, value]) => (
          <S.Option
            $fontFamily={value.fontFamily}
            $fontWeight={value.overrideWeight}
            key={key}
            value={key}
          >
            {value.displayName || value.fontFamily}
          </S.Option>
        ))}
      </Select>
    </div>
  );
};

export default FontPicker;