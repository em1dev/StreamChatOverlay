import { ChatClient } from '@twurple/chat';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageData } from '../../types';
import { TwurpleChatMessage } from '../../twurpleTypes';
import { usePronouns } from '../usePronouns';
import { useBadges } from '../useBadges';
import { UserInformation } from '../../api/elpatoApi/types';
import { TwitchChatParser } from './twitchChatParser';
import { useCustomEmotes } from '../useCustomEmotes';
import { useTTS } from '../useTTS/useTTS';
import { useConfiguration } from '../../store/configuration';

const MAX_MESSAGES = 20;

type OnChatMessageEventHandler = (channel: string, user:string, text:string, msg: TwurpleChatMessage) => Promise<void>;

export const useTwitchChat = (channel: UserInformation) => {
  const configuration = useConfiguration(state => state);

  const { 
    clearQueue: ttsClearQueue,
    onRemoveMessage: ttsRemoveMessage,
    speak: ttsSpeak
  } = useTTS();
  const customEmotes = useCustomEmotes(channel.id);
  const { parseBadges } = useBadges(channel.id);
  const { getPronounsFromTwitchName } = usePronouns();
  const [chat, setChat] = useState<ChatClient | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<ChatMessageData> | []>([]);
  const onMessageHandlerRef = useRef<OnChatMessageEventHandler | null>(null);
  const onChatClearRef = useRef<(() => void) | null>(null);
  const onMessageRemovedRef = useRef<((messageId: string) => void) | null>(null);

  useEffect(() => {
    const chatClient = new ChatClient({
      channels: [channel.login]
    });
    chatClient.connect();
    setChat(chatClient);

    return () => {
      chatClient.quit();
      setChat(null);
    };
  }, [channel]);

  // avoids reconnection on callback changes by keeping them on ref
  // twurple does not allow us to disconnect events for some reason... :/ so this works
  useEffect(() => {
    if (!chat) return;
    chat.onMessage(async (channel: string, user: string, text: string, msg: TwurpleChatMessage) => {
      if (!onMessageHandlerRef.current) return;
      await onMessageHandlerRef.current(channel, user, text, msg);
    });

    chat.onChatClear(() => {
      if (onChatClearRef.current) {
        onChatClearRef.current();
      }
      setChatMessages([]);
    });

    chat.onTimeout((channel, user) => {
      setChatMessages(prev => prev.filter(item => (
        item.userDisplayName.toLowerCase() !== user
      )));
    });

    chat.onMessageRemove((channel: string, messageId: string) => {
      if (onMessageRemovedRef.current) {
        onMessageRemovedRef.current(messageId);
      }
      setChatMessages(prev => prev.filter(item => item.id !== messageId));
    });
  }, [chat]);

  useEffect(() => {
    onMessageHandlerRef.current = async (channel: string, user: string, text: string, msg: TwurpleChatMessage) => {
      if (configuration.ignoredUsers.find(ignoredUser => ignoredUser.value === user)) return;
      const pronoun = await getPronounsFromTwitchName(user);
      const msgParts = TwitchChatParser.parseMessage(msg.text, msg.emoteOffsets, customEmotes, msg);

      const newMessage: ChatMessageData = {
        id: msg.id,
        content: msg.text,
        userDisplayName: msg.userInfo.displayName,
        displayPronoun: pronoun,
        color: msg.userInfo.color,
        emoteOffsets: msg.emoteOffsets,
        badges: parseBadges(msg.userInfo.badges),
        contentParts: msgParts
      };

      if (configuration.isTTSEnabled) {
        ttsSpeak({
          parts: msgParts,
          content: newMessage.content,
          id: newMessage.id,
          sentBy: newMessage.userDisplayName
        });
      }

      setChatMessages((msgs) => (
        [newMessage, ...msgs].slice(0, MAX_MESSAGES)
      ));
    };
  }, [getPronounsFromTwitchName, parseBadges, customEmotes, ttsSpeak, configuration]);

  useEffect(() => {
    onMessageRemovedRef.current = (msgId: string) => {
      if (configuration.isTTSEnabled) {
        ttsRemoveMessage([msgId]);
      }
    };
  }, [ttsRemoveMessage, configuration]);

  useEffect(() => {
    onChatClearRef.current = ttsClearQueue;
  }, [ttsClearQueue]);

  return {
    chat,
    chatMessages
  };
};