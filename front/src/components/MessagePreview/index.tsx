import { FontMap } from '@/fonts/ChatFonts';
import { useChatTheme } from '@/hooks/useChatTheme';
import { useConfiguration } from '@/store/configuration';
import { ThemeProvider } from 'styled-components';
import ChatMsg from '../ChatVisualizerCore/ChatBubble';
import { ChatMessageData } from '@/types';

import * as S from './styles';

export interface MessagePreviewProps {
  message: ChatMessageData;
}

export const MessagePreview = ({
  message
}: MessagePreviewProps) => {
  const fontKey = useConfiguration(c => c.userConfiguration.chatFont);
  const font = FontMap[fontKey] || FontMap.itim;
  const fontWeight = useConfiguration(c => c.userConfiguration.chatFontWeight);
  const fontSize = useConfiguration(c => c.userConfiguration.fontSize);
  const chatTheme = useChatTheme();

  return (
    <S.Container style={{
      fontFamily: font.fontFamily,
      fontWeight: fontWeight,
      fontSize: fontSize
    }}>
      <ThemeProvider theme={chatTheme}>
        <ChatMsg {...message}  />
      </ThemeProvider>
    </S.Container>
  );
};
