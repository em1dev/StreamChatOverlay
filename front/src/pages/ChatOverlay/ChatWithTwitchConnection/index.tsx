import { useTwitchChat } from '@/hooks/useTwitchChat/useTwitchChat';
import { BaseCSS } from '../styles';
import Chat from '@/components/ChatVisualizerCore';
import { useConfigurationStore } from '@/store/configurationStore';

export const ChatWithTwitchConnection = ({
  channelId,
  channelLogin
}: {
  channelId: string,
  channelLogin: string
}) => {
  const { chatMessages } = useTwitchChat(channelId, channelLogin);

  const chatDirection = useConfigurationStore(c => c.userConfiguration.chatDirection);
  const fontSize = useConfigurationStore(c => c.userConfiguration.fontSize);
  const chatFont = useConfigurationStore(c => c.userConfiguration.chatFont);
  const chatFontWeight = useConfigurationStore(c => c.userConfiguration.chatFontWeight);
  const headerOrdering = useConfigurationStore(c => c.userConfiguration.headerOrdering);
  const showChatterBadges = useConfigurationStore(c => c.userConfiguration.showChatterBadges);
  const lowerOpacityOnTop = useConfigurationStore(c => c.userConfiguration.lowerOpacityOnTop);

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
