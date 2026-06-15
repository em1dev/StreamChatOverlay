import { ChatMessageData } from '@/types';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_WS_URL;

const MAX_MESSAGES = 20;

export interface YoutubeChatMessage {
  id: string,
  userDisplayName: string,
  sentAt: string,
  messageContent: string,
  isModerator: boolean,
  isOwner: boolean,
  isSponsor: boolean,
  isVerified: boolean
}

export const useYoutubeChat = (secret: string, userId: number) => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  useEffect(() => {
    const ws = new WebSocket(BASE_URL + '/youtube/chat');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe-with-secret',
        data: {
          secret,
          userId
        }
      }));
    };
    ws.onmessage = (e) => {
      const messages = JSON.parse(e.data as string) as YoutubeChatMessage[];
      const newMessages = messages
         .map(c => ({
           sentAt: (new Date(c.sentAt)).getTime(),
           badges: [],
         effect: 'normal',
         id: c.id,
         fullMessageText: c.messageContent,
         userDisplayName: c.userDisplayName.replace('@', ''),
         emoteOffsets: new Map(),
         messageParts: [
           {
             content: c.messageContent,
             originalContent: c.userDisplayName,
             type: 'text',
           }
         ]
       } satisfies ChatMessageData));

      setMessages(prev => [...prev, ...newMessages]);
    };

    return () => {
      ws.close();
    };
  }, [secret, userId]);

  /*
  useEffect(() => {
    console.log('Using youtube connection');
    chatApi.getYoutubeBroadcast(secret, userId)
      .then(resp => {
        setChatId(resp.data?.liveChatId ?? null);
      });
  }, [secret, userId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!chatId) return;

      const resp = await youtubeApi.getLiveChatMessages(youtubeToken, chatId, paginationRef.current);
      if (!resp)
        return;

      const hasNextPage = resp.pageInfo.totalResults > resp.pageInfo.resultsPerPage;
      if (hasNextPage)
      {
        paginationRef.current = resp.nextPageToken;
      }

      const newMessages = resp.items
        .filter(c => c.snippet.type == 'textMessageEvent' && c.snippet.hasDisplayContent)
        .map(c => ({
          sentAt: (new Date(c.snippet.publishedAt)).getTime(),
          badges: [],
        effect: 'normal',
        id: c.id,
        fullMessageText: c.snippet.displayMessage,
        userDisplayName: c.authorDetails.displayName.replace('@', ''),
        emoteOffsets: new Map(),
        messageParts: [
          {
            content: c.snippet.displayMessage,
            originalContent: c.authorDetails.displayName,
            type: 'text',
          }
        ]
      } satisfies ChatMessageData));

      setMessages(() => (
        [...newMessages].slice(0, MAX_MESSAGES)
      ));

    }, POOLING_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [chatId, youtubeToken]);

  */
  return messages;
};
