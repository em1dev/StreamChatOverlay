import { useTwitchChat } from '@/hooks/useTwitchChat/useTwitchChat';
import { useYoutubeChat } from '@/hooks/useYoutubeChat/useYoutubeChat';
import { BaseCSS } from '../styles';
import Chat from '@/components/ChatVisualizerCore';
import { useMemo } from 'react';

export const ChatWithBothConnections = ({
  twitchChannelId,
  twitchChannelLogin,
  secret,
  userId
}: {
    twitchChannelId: string,
    twitchChannelLogin: string,
    secret: string,
    userId: number
}) => {
  const { chatMessages: twMessages  } = useTwitchChat(twitchChannelId, twitchChannelLogin);
  const ytMessages = useYoutubeChat(secret, userId);

  const combinedMessages = useMemo(() => {
    return [...twMessages, ...ytMessages]
      .sort((a,b) => b.sentAt - a.sentAt);
  }, [ytMessages, twMessages]);

  return (
    <>
      <BaseCSS />
      <Chat msgs={combinedMessages} />
    </>
  );
};
