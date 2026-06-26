import { updateUserConfiguration } from '@/store/configurationStore/actions';
import { useConfigurationStore } from '@/store/configurationStore';
import { Icon } from '@iconify/react';

import * as S from './styles';

const MIN_FONT_SIZE = 5;
const MAX_FONT_SIZE = 25;

export const FontSizeSection = () => {
  const fontSize = useConfigurationStore(state => state.userConfiguration.fontSize);

  const updateFontSize = (newValue: number) => {
    updateUserConfiguration({
      fontSize: Math.min(Math.max(newValue, MIN_FONT_SIZE), MAX_FONT_SIZE)
    });
  };

  return (
    <>
      <h2>
        Font Size
      </h2>

      <S.FontSizeContainer>
        <button
          title='decrease font size'
          disabled={fontSize == MIN_FONT_SIZE}
          onClick={() => updateFontSize( fontSize - 1 )}
        >
          <Icon icon="mingcute:minimize-fill" />
        </button>
        <span>{fontSize}</span>
        <button
          title='increase font size'
          disabled={fontSize == MAX_FONT_SIZE}
          onClick={() => updateFontSize( fontSize + 1 )}
        >
          <Icon icon="mingcute:add-fill" />
        </button>
      </S.FontSizeContainer>
    </>
  );
};
