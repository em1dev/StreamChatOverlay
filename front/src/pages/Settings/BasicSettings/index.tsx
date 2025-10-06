import Chat from '@/components/ChatVisualizerCore';
import { Select } from '@/components/Select';
import { ToggleInput } from '@/components/ToggleInput';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import { useChatTheme } from '@/hooks/useChatTheme';
import { useConfiguration } from '@/store/configuration';
import { ThemeKeys } from '@/themes/chatThemes';
import { Icon } from '@iconify/react';
import { ThemeProvider } from 'styled-components';

import * as S from './styles';

export const BasicSettings = () => {
  const configuration = useConfiguration(state => state.userConfiguration);
  const updateConfig = useConfiguration(state => state.updateUserConfiguration);

  const themeKey = configuration?.chatTheme;
  const chatTheme = useChatTheme(configuration?.chatTheme);

  if (configuration == null) return null;

  const chatDirection = configuration.chatDirection;
  const emoteConfiguration = configuration.emotes;
  const showChatterBadges = configuration.showChatterBadges;
  const hideBotMessages = configuration.hideBotMessages;
  const hideCommands = configuration.hideCommands;

  return (
    <>
      <h1>Basic Settings</h1>

      <S.ChatContainer>
        <ThemeProvider theme={chatTheme}>
          <Chat msgs={landingExamplesMessages} />
        </ThemeProvider>
      </S.ChatContainer>

      <section>
        <div role="radiogroup">

          <h2>Chat Direction</h2>
          <S.DirectionContainer>
            <button
              aria-label='left'
              onClick={() => updateConfig({ chatDirection: 'left' })}
              type='button'
              role='radio'
            >
              {
                chatDirection == 'left' ? (
                  <Icon aria-hidden="true" icon="mingcute:arrow-left-circle-fill" />
                ) : (
                  <Icon aria-hidden="true" icon="mingcute:arrow-left-circle-line" />
                )
              }
            </button>

            <button
              aria-label='right'
              onClick={() => updateConfig({ chatDirection: 'right' })}
              type='button'
              role='radio'
            >
              {
                chatDirection == 'right' ? (
                  <Icon aria-hidden="true" icon="mingcute:arrow-right-circle-fill" />
                ) : (
                  <Icon aria-hidden="true" icon="mingcute:arrow-right-circle-line" />
                )
              }
            </button>
          </S.DirectionContainer>
        </div>
      </section>

      <section>
        <label htmlFor='theme-select-config'>
          <h2>
            Theme
          </h2>
        </label>
        <Select id='theme-select-config' value={themeKey} onChange={(e) => {updateConfig({ chatTheme: e.target.value as ThemeKeys });}}>
          <option value={'duck' satisfies ThemeKeys}>Duck</option>
          <option value={'coffee' satisfies ThemeKeys}>Coffee</option>
          <option value={'pink' satisfies ThemeKeys}>Pink</option>
          <option value={'floating' satisfies ThemeKeys}>Floating</option>
          <option value={'contrast' satisfies ThemeKeys}>Contrast</option>
        </Select>
      </section>

      <section>
        <h2>Emote support</h2>

        <S.EmoteToggleContainer>
          <ToggleInput
            isChecked={emoteConfiguration.isBetterTTVEnabled} 
            onChange={(value) => { updateConfig({ emotes: {...emoteConfiguration, isBetterTTVEnabled: value} }); }}
          >
            BetterTTV
          </ToggleInput>

          <ToggleInput
            isChecked={emoteConfiguration.isFrankerFaceEnabled} 
            onChange={(value) => { updateConfig({ emotes: {...emoteConfiguration, isFrankerFaceEnabled: value} }); }}
          >
            FrankerFaceZ
          </ToggleInput>

          <ToggleInput
            isChecked={emoteConfiguration.isSevenTVEnabled} 
            onChange={(value) => { updateConfig({ emotes: {...emoteConfiguration, isSevenTVEnabled: value} }); }}
          >
            7TV
          </ToggleInput>
        </S.EmoteToggleContainer>
      </section>

      <section>
        <h2>Hide messages</h2>
        <ToggleInput
          isChecked={hideBotMessages} 
          onChange={(value) => { updateConfig({ hideBotMessages: value }); }}
        >
          Hide bot messages
        </ToggleInput>

        <ToggleInput
          isChecked={hideCommands} 
          onChange={(value) => { updateConfig({ hideCommands: value }); }}
        >
          Hide commands ( messages starting with ! )
        </ToggleInput>
      </section>

      <section>
        <h2>Badges</h2>
        <ToggleInput
          isChecked={showChatterBadges} 
          onChange={(value) => { updateConfig({ showChatterBadges: value }); }}
        >
          Show chatter badges
        </ToggleInput>
      </section>
    </>
  );
};