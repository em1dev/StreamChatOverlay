import { useConfiguration } from '@/store/configuration';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/authContext/useAuth';

import * as S from './styles';

const MIN_FONT_SIZE = 5;
const MAX_FONT_SIZE = 25;

export const FontSizeSection = () => {
  const { session } = useAuth();
  const updateConfig = useConfiguration(state => state.updateUserConfiguration);
  const fontSize = useConfiguration(state => state.userConfiguration.fontSize);

  const updateFontSize = (newValue: number) => {
    updateConfig({
      fontSize: Math.min(Math.max(newValue, MIN_FONT_SIZE), MAX_FONT_SIZE)
    },
    session);
  };

  return (
    <section>
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
    </section>
  );
};