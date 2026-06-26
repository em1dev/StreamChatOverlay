import { FontKeys, FontMap, FontWeights, useAllChatFonts } from '@/fonts/ChatFonts';
import { updateUserConfiguration } from '@/store/configurationStore/actions';
import { useConfigurationStore } from '@/store/configurationStore';
import { Select } from '../Select';
import { Fragment, useId } from 'react';

import * as S from './styles';

const FontPicker = () => {
  const id = useId();
  const selectedFontKey = useConfigurationStore(state => state.userConfiguration.chatFont);
  const selectedFontWeight = useConfigurationStore(state => state.userConfiguration.chatFontWeight);
  const selectedFont = FontMap[selectedFontKey];
  useAllChatFonts();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as FontKeys || undefined;
    if (newValue == undefined) return;
    const newFont = FontMap[newValue];
    if (!newFont) return;

    if (!newFont.weights.includes(selectedFontWeight)) {
      updateUserConfiguration({ chatFont: newValue, chatFontWeight: 'normal' });
      return;
    }

    updateUserConfiguration({ chatFont: newValue });
  };

  const onFontWeightChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    const newFontWeight = e.target.value as FontWeights;
    updateUserConfiguration({ chatFontWeight: newFontWeight });
  };

  return (
    <S.Container>
      <label htmlFor={id}>
        <h2>
          Font
        </h2>
      </label>

      <Select
        id={id}
        $fontFamily={selectedFont.fontFamily}
        value={selectedFontKey}
        onChange={onChange}
      >
        {Object.entries(FontMap).map(([key, value]) => (
          <S.Option
            $fontFamily={value.fontFamily}
            key={key}
            value={key}
          >
            {value.displayName || value.fontFamily}
          </S.Option>
        ))}
      </Select>

      <S.WeightRadioGroup>
        {selectedFont.weights.map(w => (
          <Fragment key={w}>
            <input
              hidden
              onChange={onFontWeightChange}
              checked={w == selectedFontWeight}
              name="font weight"
              value={w}
              id={`weight_${w}`}
              type='radio'
            />
            <label htmlFor={`weight_${w}`}>{w}</label>
          </Fragment>
        ))}
      </S.WeightRadioGroup>
    </S.Container>
  );
};

export default FontPicker;
