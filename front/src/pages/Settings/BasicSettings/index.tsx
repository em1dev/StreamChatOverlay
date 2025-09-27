import * as S from './styles';
import Chat from '@/components/ChatVisualizerCore';
import { Select } from '@/components/Select';
import { ToggleInput } from '@/components/ToggleInput';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import { useConfiguration } from '@/store/configuration';
import { SettingsTemplate } from '@/templates/SettingsTemplate';
import { themeKeyMap, ThemeKeys } from '@/themes/chatThemes';
import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';

export const BasicSettings = () => {
  const themeKey = useConfiguration(s => s.chatTheme);
  const chatDirection = useConfiguration(s => s.chatDirection);

  const emoteConfiguration = useConfiguration(s => s.emotes);

  const showChatterBadges = useConfiguration(s => s.showChatterBadges);
  const hideBotMessages = useConfiguration(s => s.hideBotMessages);
  const hideCommands = useConfiguration(s => s.hideCommands);

  const updateConfig = useConfiguration(s => s.updateUserConfiguration);

  const theme = useTheme();
  const chatTheme: DefaultTheme = useMemo(() => (
    {
      ...theme,
      chat: themeKeyMap[themeKey]
    }
  ), [themeKey, theme]);

  return (
    <SettingsTemplate>
      <h1>Basic Settings</h1>

      <S.ChatContainer>
        <ThemeProvider theme={chatTheme}>
          <Chat msgs={landingExamplesMessages} />
        </ThemeProvider>
      </S.ChatContainer>

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

      <h2>Badges</h2>
      <ToggleInput
        isChecked={showChatterBadges} 
        onChange={(value) => { updateConfig({ showChatterBadges: value }); }}
      >
        Show chatter badges
      </ToggleInput>
    </SettingsTemplate>
  );
};