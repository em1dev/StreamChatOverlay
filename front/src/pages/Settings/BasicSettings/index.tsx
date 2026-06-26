import { ToggleInput } from '@/components/ToggleInput';
import { updateUserConfiguration } from '@/store/configurationStore/actions';
import { useConfigurationStore } from '@/store/configurationStore';
import { Icon } from '@iconify/react';
import { HeaderOrdering } from './HeaderOrdering';
import { FontSizeSection } from './FontSizeSection';
import { ThemePicker } from '@/components/ThemePicker';
import FontPicker from '@/components/FontPicker';
import { DisplayTextSection } from './DisplayTextSection';
import { ChatPreview } from './ChatPreview';

import * as S from './styles';


export const BasicSettings = () => {
  const chatDirection =  useConfigurationStore(state => state.userConfiguration.chatDirection);
  const emoteConfiguration = useConfigurationStore(state =>  state.userConfiguration.emotes);
  const hideBotMessages = useConfigurationStore(state => state.userConfiguration.hideBotMessages);
  const hideCommands = useConfigurationStore(state => state.userConfiguration.hideCommands);
  const lowerOpacityOnTop = useConfigurationStore(state =>  state.userConfiguration.lowerOpacityOnTop);
  const chatTheme = useConfigurationStore(state =>  state.userConfiguration.chatTheme);
  const chatThemeVariant = useConfigurationStore(state =>  state.userConfiguration.chatThemeVariant);

  return (
    <>
      <h1>Basic Settings</h1>

      <ChatPreview />

      <section>
        <h2>Chat Direction</h2>

        <div role="radiogroup">
          <S.DirectionContainer>
            <button
              aria-label='left'
              aria-checked={chatDirection == 'left'}
              onClick={() => updateUserConfiguration({ chatDirection: 'left' })}
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
              aria-checked={chatDirection == 'right'}
              onClick={() => updateUserConfiguration({ chatDirection: 'right' })}
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

        <h2>Container</h2>
        <ToggleInput
          isChecked={lowerOpacityOnTop}
          onChange={(value) => { updateUserConfiguration({ lowerOpacityOnTop: value }); }}
        >
          Lower message opacity at the top
        </ToggleInput>
      </section>

      <ThemePicker
        themeKey={chatTheme}
        themeVariant={chatThemeVariant}
        onChange={(newKey, newVariant) => {
          updateUserConfiguration({
            chatTheme: newKey,
            chatThemeVariant: newVariant
          });
        }}
      />

      <section>
        <FontPicker />
        <FontSizeSection />
      </section>

      <section>
        <h2>Emote support</h2>

        <S.EmoteToggleContainer>
          <ToggleInput
            isChecked={emoteConfiguration.isBetterTTVEnabled}
            onChange={(value) => { updateUserConfiguration(
              {
                emotes: { ...emoteConfiguration, isBetterTTVEnabled: value }
              });
            }}
          >
            BetterTTV
          </ToggleInput>

          <ToggleInput
            isChecked={emoteConfiguration.isFrankerFaceEnabled}
            onChange={(value) => { updateUserConfiguration(
              {
                emotes: { ...emoteConfiguration, isFrankerFaceEnabled: value }
              });
            }}
          >
            FrankerFaceZ
          </ToggleInput>

          <ToggleInput
            isChecked={emoteConfiguration.isSevenTVEnabled}
            onChange={(value) => { updateUserConfiguration(
              {
                emotes: { ...emoteConfiguration, isSevenTVEnabled: value }
              });
            }}
          >
            7TV
          </ToggleInput>
        </S.EmoteToggleContainer>
      </section>

      <section>
        <h2>Hide messages</h2>
        <ToggleInput
          isChecked={hideBotMessages}
          onChange={(value) => { updateUserConfiguration(
            {
              hideBotMessages: value
            });
          }}
        >
          Hide bot messages
        </ToggleInput>

        <ToggleInput
          isChecked={hideCommands}
          onChange={(value) => { updateUserConfiguration(
            {
              hideCommands: value
            });
          }}
        >
          Hide commands ( messages starting with ! )
        </ToggleInput>
      </section>

      <HeaderOrdering />

      <DisplayTextSection />

    </>
  );
};
