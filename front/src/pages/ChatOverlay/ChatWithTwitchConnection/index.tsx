import { useTwitchChat } from '@/hooks/useTwitchChat/useTwitchChat';
import { BaseCSS } from '../styles';
import Chat from '@/components/ChatVisualizerCore';
import { useChatSettings } from '@/store';


export const ChatWithTwitchConnection = ({
  channelId,
  channelLogin
}: {
  channelId: string,
  channelLogin: string
}) => {
  const { chatMessages } = useTwitchChat(channelId, channelLogin);

  const chatDirection = useChatSettings(c => c.chatDirection);
  const fontSize = useChatSettings(c => c.fontSize);
  const chatFont = useChatSettings(c => c.chatFont);
  const chatFontWeight = useChatSettings(c => c.chatFontWeight);
  const headerOrdering = useChatSettings(c => c.headerOrdering);
  const showChatterBadges = useChatSettings(c => c.showChatterBadges);
  const lowerOpacityOnTop = useChatSettings(c => c.lowerOpacityOnTop);

  return (
    <>
      <BaseCSS />
      <Chat
        chatDirection={chatDirection}
        fontSize={fontSize}
        chatFont={chatFont}
        fontWeight={chatFontWeight}
        headerOrdering={headerOrdering}
        showBadges={showChatterBadges}
        lowerOpacityOnTop={lowerOpacityOnTop}
        msgs={chatMessages}
      />
    </>
  );
};
