import { useYoutubeChat } from '@/hooks/useYoutubeChat/useYoutubeChat';
import { BaseCSS } from '../styles';
import Chat from '@/components/ChatVisualizerCore';

export const ChatWithYoutubeConnection = ({
  secret,
  userId
}: {
    secret: string,
    userId: number
}) => {
  const chatMessages = useYoutubeChat(secret, userId);

  return (
    <>
      <BaseCSS />
      <Chat msgs={chatMessages} />
    </>
  );
};
