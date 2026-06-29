import { ThemeProvider } from 'styled-components';
import Chat from '@/components/ChatVisualizerCore';
import { useChatTheme } from '@/hooks/useChatTheme';
import { useChatSettings } from '@/store';
import { landingExamplesMessages } from '@/examples/landingExamplesMessages';

import * as S from './styles';


export const ChatPreview = () => {
  const chatTheme = useChatTheme();
  const chatDirection = useChatSettings(state => state.chatDirection);
  const lowerOpacityOnTop = useChatSettings(state =>  state.lowerOpacityOnTop);
  const chatFontKey = useChatSettings(state => state.chatFont);
  const fontSize = useChatSettings(state => state.fontSize);
  const fontWeight = useChatSettings(state => state.chatFontWeight);
  const headerOrdering = useChatSettings(state =>  state.headerOrdering);
  const showChatterBadges = useChatSettings(state => state.showChatterBadges);

  return (
    <S.ChatContainer>
      <ThemeProvider theme={chatTheme}>
        <Chat
          headerOrdering={headerOrdering}
          showBadges={showChatterBadges}
          lowerOpacityOnTop={lowerOpacityOnTop}
          fontWeight={fontWeight}
          fontSize={fontSize}
          chatFont={chatFontKey}
          chatDirection={chatDirection}
          msgs={landingExamplesMessages}
        />
      </ThemeProvider>
    </S.ChatContainer>
  );
};
