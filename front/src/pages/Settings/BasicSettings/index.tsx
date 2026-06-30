import { ToggleInput } from '@/components/core/ToggleInput';
import { useChatSettings } from '@/store';
import { Icon } from '@iconify/react';
import { HeaderOrdering } from './HeaderOrdering';
import { FontSizeSection } from './FontSizeSection';
import { ThemePicker } from '@/components/ThemePicker';
import FontPicker from '@/components/FontPicker';
import { DisplayTextSection } from './DisplayTextSection';
import { ChatPreview } from './ChatPreview';
import { updateChatSettings } from '@/store/actions/chatActions';
import * as S from './styles';
import { Button } from '@/components/core/Button';


export const BasicSettings = () => {
  const chatDirection =  useChatSettings(state => state.chatDirection);
  const emoteConfiguration = useChatSettings(state =>  state.emotes);
  const hideBotMessages = useChatSettings(state => state.hideBotMessages);
  const hideCommands = useChatSettings(state => state.hideCommands);
  const lowerOpacityOnTop = useChatSettings(state =>  state.lowerOpacityOnTop);
  const chatTheme = useChatSettings(state =>  state.chatTheme);
  const chatThemeVariant = useChatSettings(state =>  state.chatThemeVariant);

  return (
    <>
      <h1>Basic Settings</h1>

      <ChatPreview />

      <section>
        <h2>Chat Direction</h2>

        <div role="radiogroup">
          <S.DirectionContainer>
            <Button
              $size='icon'
              $variant='ghost'
              aria-label='left'
              aria-checked={chatDirection == 'left'}
              onClick={() => updateChatSettings({ chatDirection: 'left' })}
              type='button'
              role='radio'
            >
              {
                chatDirection == 'left' ? (
                  <Icon aria-hidden icon="mingcute:arrow-left-circle-fill" />
                ) : (
                  <Icon aria-hidden icon="mingcute:arrow-left-circle-line" />
                )
              }
            </Button>

            <Button
              $size='icon'
              $variant='ghost'
              aria-label='right'
              aria-checked={chatDirection == 'right'}
              onClick={() => updateChatSettings({ chatDirection: 'right' })}
              type='button'
              role='radio'
            >
              {
                chatDirection == 'right' ? (
                  <Icon aria-hidden icon="mingcute:arrow-right-circle-fill" />
                ) : (
                  <Icon aria-hidden icon="mingcute:arrow-right-circle-line" />
                )
              }
            </Button>
          </S.DirectionContainer>
        </div>

        <h2>Container</h2>
        <ToggleInput
          isChecked={lowerOpacityOnTop}
          onChange={(value) => { updateChatSettings({ lowerOpacityOnTop: value }); }}
        >
          Lower message opacity at the top
        </ToggleInput>
      </section>

      <ThemePicker
        themeKey={chatTheme}
        themeVariant={chatThemeVariant}
        onChange={(newKey, newVariant) => {
          updateChatSettings({
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
            onChange={(value) => { updateChatSettings(
              {
                emotes: { ...emoteConfiguration, isBetterTTVEnabled: value }
              });
            }}
          >
            BetterTTV
          </ToggleInput>

          <ToggleInput
            isChecked={emoteConfiguration.isFrankerFaceEnabled}
            onChange={(value) => { updateChatSettings(
              {
                emotes: { ...emoteConfiguration, isFrankerFaceEnabled: value }
              });
            }}
          >
            FrankerFaceZ
          </ToggleInput>

          <ToggleInput
            isChecked={emoteConfiguration.isSevenTVEnabled}
            onChange={(value) => { updateChatSettings(
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
          onChange={(value) => { updateChatSettings(
            {
              hideBotMessages: value
            });
          }}
        >
          Hide bot messages
        </ToggleInput>

        <ToggleInput
          isChecked={hideCommands}
          onChange={(value) => { updateChatSettings(
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
