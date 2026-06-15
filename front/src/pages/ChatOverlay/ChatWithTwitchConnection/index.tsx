import { useTwitchChat } from '@/hooks/useTwitchChat/useTwitchChat';
import { BaseCSS } from '../styles';
import Chat from '@/components/ChatVisualizerCore';

export const ChatWithTwitchConnection = ({
  channelId,
  channelLogin
}: {
  channelId: string,
  channelLogin: string
}) => {
  const { chatMessages } = useTwitchChat(channelId, channelLogin);

  return (
    <>
      <BaseCSS />
      <Chat msgs={chatMessages} />
    </>
  );
};
