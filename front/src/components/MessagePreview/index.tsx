import { useConfigurationChatFont } from '@/fonts/ChatFonts';
import { useChatTheme } from '@/hooks/useChatTheme';
import { useConfigurationStore } from '@/store/configurationStore';
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
  const { font } = useConfigurationChatFont();
  const fontWeight = useConfigurationStore(c => c.userConfiguration.chatFontWeight);
  const fontSize = useConfigurationStore(c => c.userConfiguration.fontSize);
  const chatTheme = useChatTheme();
  const chatDirection = useConfigurationStore(c => c.userConfiguration.chatDirection);
  const headerOrdering = useConfigurationStore(c => c.userConfiguration.headerOrdering);
  const showChatterBadges = useConfigurationStore(c => c.userConfiguration.showChatterBadges);


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
