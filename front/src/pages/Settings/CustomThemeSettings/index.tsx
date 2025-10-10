import { ThemeProvider } from 'styled-components';
import Chat from '@/components/ChatVisualizerCore';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import { useConfiguration } from '@/store/configuration';
import { useChatTheme } from '@/hooks/useChatTheme';
import { Select } from '@/components/Select';
import { ChatThemeOverride } from '@/types/userConfigurationTypes';
import { ToggleInput } from '@/components/ToggleInput';
import { ThemePicker } from '../Common/ThemePicker';

import * as S from './styles';

export const CustomThemeSettings = () => {
  const configuration = useConfiguration(state => state.userConfiguration);
  const updateConfig = useConfiguration(state => state.updateUserConfiguration);

  const chatTheme = useChatTheme(configuration?.chatTheme);

  const updateThemeOverride = (newThemeOverride: ChatThemeOverride) => {
    updateConfig({
      chatThemeOverride: configuration.chatThemeOverride ?
        {
          ...configuration.chatThemeOverride,
          ...newThemeOverride
        } : newThemeOverride
    });
  };

  if (configuration == null) return null;

  return (
    <>
      <h1>Customize Theme</h1>

      <S.ChatContainer>
        <ThemeProvider theme={chatTheme}>
          <Chat msgs={landingExamplesMessages} />
        </ThemeProvider>
      </S.ChatContainer>

      <section>
        <ThemePicker />

        <p>Customizations are applied on top of the selected theme</p>
        <ToggleInput onChange={() => {}} isChecked={false}>
          Disable all customizations
        </ToggleInput>
      </section>

      <section>
        <label htmlFor='font-select-config'>
          <h2>
            Font
          </h2>
        </label>

        <Select
          id='font-select-config'
          value={configuration.chatThemeOverride?.font ?? ''}
          onChange={(e) => {
            updateThemeOverride({ font: e.target.value.length ? e.target.value : undefined });
          }}
        >
          <option value={undefined}>Use theme font</option>
          <option value='Poppins'>Poppins</option>
          <option value='Itim'>Itim</option>
          <option value='Roboto'>Roboto</option>
          <option value='Josefin Sans'>Josefin Sans</option>
          <option value='Montserrat'>Montserrat</option>
          <option value='Permanent Marker'>Permanent Marker</option>
        </Select>
      </section>

      <section>
        <h1>Header</h1>
        <label><h2>Text Color</h2></label>
        <input type='color' />
      </section>
    </>
  );
};