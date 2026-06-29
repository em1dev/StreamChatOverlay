import { FontKeys, FontMap, FontWeights, useAllChatFonts, useChatSettingsFont } from '@/fonts/ChatFonts';
import { Select } from '../core/Select';
import { Fragment, useId } from 'react';
import { useChatSettings } from '@/store';
import { updateChatSettings } from '@/store/actions/chatActions';
import * as S from './styles';


const FontPicker = () => {
  const id = useId();
  const selectedFontWeight = useChatSettings(state => state.chatFontWeight);
  const { font: selectedFont, fontKey: selectedFontKey } = useChatSettingsFont();

  useAllChatFonts();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as FontKeys || undefined;
    if (newValue == undefined) return;
    const newFont = FontMap[newValue];
    if (!newFont) return;

    if (!newFont.weights.includes(selectedFontWeight)) {
      updateChatSettings({ chatFont: newValue, chatFontWeight: 'normal' });
      return;
    }

    updateChatSettings({ chatFont: newValue });
  };

  const onFontWeightChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    const newFontWeight = e.target.value as FontWeights;
    updateChatSettings({ chatFontWeight: newFontWeight });
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
