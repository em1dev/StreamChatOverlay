import { Icon } from '@iconify/react';
import * as S from './styles';
import { useConfiguration } from '@/store/configuration';
import { ChatMessageHeaderType } from '@/types/userConfigurationTypes';
import { Fragment } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';
import ChatMsg from '@/components/ChatVisualizerCore/ChatBubble';
import { ThemeProvider } from 'styled-components';
import { useChatTheme } from '@/hooks/useChatTheme';
import { ToggleInput } from '@/components/ToggleInput';
import { useAuth } from '@/context/authContext/useAuth';
import { FontMap } from '@/fonts/ChatFonts';

const headerTypeToDisplayName: Record<ChatMessageHeaderType, string> = {
  'badges': 'Badges',
  'name': 'User Name',
  'pronouns': 'Pronouns'
};

export const HeaderOrdering = () => {
  const showChatterBadges = useConfiguration(c => c.userConfiguration.showChatterBadges);
  const ordering = useConfiguration(c => c.userConfiguration.headerOrdering);
  const fontKey = useConfiguration(c => c.userConfiguration.chatFont);
  const font = FontMap[fontKey] || FontMap.itim;
  const fontWeight = useConfiguration(c => c.userConfiguration.chatFontWeight);
  const { session } = useAuth();
  const updateConfig = useConfiguration(c => c.updateUserConfiguration);
  const chatTheme = useChatTheme();

  const onSwitchRight = useCallback((index: number) => {
    const newOrder = [...ordering];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    updateConfig({
      headerOrdering: newOrder
    }, session);
  }, [ordering, updateConfig, session]);

  return (
    <section>
      <h2>Message Header</h2>

      <div style={{ 
        margin: '2em 0',
        fontSize: '14px',
        fontFamily: font.fontFamily,
        fontWeight: fontWeight 
      }}>
        <ThemeProvider theme={chatTheme}>
          <ChatMsg {...landingExamplesMessages[3]} />
        </ThemeProvider>
      </div>

      <ToggleInput
        isChecked={showChatterBadges} 
        onChange={(value) => { updateConfig({ showChatterBadges: value }, session); }}
      >
        Show chatter badges
      </ToggleInput>

      <S.HeaderOrderingContainer>
        {
          ordering.map((item, index) => (
            <Fragment key={item}>
              <div>{ headerTypeToDisplayName[item] }</div>
              {index != ordering.length - 1  && (
                <button 
                  aria-label={`switch ${headerTypeToDisplayName[item]} with ${headerTypeToDisplayName[ordering[index + 1]]}`}
                  type='button'
                  onClick={() => onSwitchRight(index)}
                >
                  <Icon icon="cuida:swap-horizontal-arrows-outline" />
                </button>
              )}
            </Fragment>
          ))
        }
      </S.HeaderOrderingContainer>
    </section>
  );

};