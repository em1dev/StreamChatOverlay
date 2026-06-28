import { useChatTheme } from '@/hooks/useChatTheme';
import { ThemeProvider } from 'styled-components';
import ChatMsg from '../ChatVisualizerCore/ChatBubble';
import { ChatMessageData } from '@/types';
import { useChatSettings } from '@/store';
import { useChatSettingsFont } from '@/fonts/ChatFonts';
import * as S from './styles';


export interface MessagePreviewProps {
  message: ChatMessageData;
}

export const MessagePreview = ({
  message
}: MessagePreviewProps) => {
  const { font } = useChatSettingsFont();
  const fontWeight = useChatSettings(c => c.chatFontWeight);
  const chatDirection = useChatSettings(c => c.chatDirection);
  const headerOrdering = useChatSettings(c => c.headerOrdering);
  const showChatterBadges = useChatSettings(c => c.showChatterBadges);
  const fontSize = useChatSettings(c => c.fontSize);
  const chatTheme = useChatTheme();

  return (
    <S.Container style={{
      fontFamily: font.fontFamily,
      fontWeight: fontWeight,
      fontSize: fontSize
    }}>
      <ThemeProvider theme={chatTheme}>
        <ChatMsg
          chatDirection={chatDirection}
          headerOrdering={headerOrdering}
          showBadges={showChatterBadges}
          message={message}
        />
      </ThemeProvider>
    </S.Container>
  );
};
