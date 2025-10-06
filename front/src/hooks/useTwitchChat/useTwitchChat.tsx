import { ChatClient } from '@twurple/chat';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageData } from '../../types';
import { TwurpleChatMessage } from './types';
import { usePronouns } from '../usePronouns';
import { useBadges } from '../useBadges';
import { TwitchChatParser } from './twitchChatParser';
import { useCustomEmotes } from '../useCustomEmotes';
import { useTTS } from '../useTTS/useTTS';
import { useConfiguration } from '../../store/configuration';

const MAX_MESSAGES = 20;

type OnChatMessageEventHandler = (channel: string, user:string, text:string, msg: TwurpleChatMessage) => Promise<void>;

export const useTwitchChat = (channelId: string, channelLogin: string) => {
  const configuration = useConfiguration(state => state);

  const { 
    clearQueue: ttsClearQueue,
    onRemoveMessage: ttsRemoveMessage,
    speak: ttsSpeak
  } = useTTS();
  const customEmotes = useCustomEmotes(channelId);
  const { parseBadges } = useBadges(channelId);
  const { getPronounsFromTwitchName } = usePronouns();
  const [chat, setChat] = useState<ChatClient | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<ChatMessageData> | []>([]);
  const onMessageHandlerRef = useRef<OnChatMessageEventHandler | null>(null);
  const onChatClearRef = useRef<(() => void) | null>(null);
  const onMessageRemovedRef = useRef<((messageId: string) => void) | null>(null);

  useEffect(() => {
    const chatClient = new ChatClient({
      channels: [channelLogin]
    });
    chatClient.connect();
    setChat(chatClient);

    return () => {
      chatClient.quit();
      setChat(null);
    };
  }, [channelLogin]);

  // avoids reconnection on callback changes by keeping them on ref
  // twurple does not allow us to disconnect events for some reason... :/ so this works
  useEffect(() => {
    if (!chat) return;
    /*
    chat.irc.onAnyMessage((e) => {
      console.log(e);
    });
    */

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

    chat.onBan((channel, user) => {
      setChatMessages(prev => prev.filter(item => {
        const shouldKeep = item.userDisplayName.toLowerCase() !== user;

        if (!shouldKeep && onMessageRemovedRef.current) {
          onMessageRemovedRef.current(item.id);
        }

        return shouldKeep;
      }));
    });

    chat.onTimeout((channel, user) => {
      setChatMessages(prev => prev.filter(item => {
        const shouldKeep = item.userDisplayName.toLowerCase() !== user;

        if (!shouldKeep && onMessageRemovedRef.current) {
          onMessageRemovedRef.current(item.id);
        }

        return shouldKeep;
      }));
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
      if (configuration.userConfiguration.ignoredUsers.find(ignoredUser => ignoredUser.value === user)) return;
      const pronoun = await getPronounsFromTwitchName(user);
      const msgParts = TwitchChatParser.parseMessage(msg.text, msg.emoteOffsets, customEmotes, msg);

      const isBot = msg.userInfo.badges.get('bot-badge') == '1';
      const isCommand = text.trim().startsWith('!');

      const badges = configuration.userConfiguration.showChatterBadges ? parseBadges(msg.userInfo.badges) : [];
      const effect = TwitchChatParser.parseMessageEffect(msg);
      const newMessage: ChatMessageData = {
        id: msg.id,
        effect,
        fullMessageText: msg.text,
        userDisplayName: msg.userInfo.displayName,
        displayPronoun: pronoun,
        color: msg.userInfo.color,
        emoteOffsets: msg.emoteOffsets,
        badges: badges,
        messageParts: msgParts
      };

      const shouldIgnoreBotTTS = configuration.userConfiguration.ttsConfiguration.ignoreBotMessages && isBot;
      const shouldIgnoreCommandTTS = configuration.userConfiguration.ttsConfiguration.ignoreCommandMessages && isCommand;
      if (
        configuration.userConfiguration.ttsConfiguration.isTTSEnabled &&
        !shouldIgnoreBotTTS &&
        !shouldIgnoreCommandTTS
      ) {
        ttsSpeak({
          parts: msgParts,
          fullMessageText: newMessage.fullMessageText,
          id: newMessage.id,
          sentBy: newMessage.userDisplayName
        });
      }

      const shouldIgnoreBotMsgDisplay = configuration.userConfiguration.hideBotMessages && isBot;
      const shouldIgnoreCommandMsgDisplay = configuration.userConfiguration.hideCommands && isCommand;

      if (!shouldIgnoreBotMsgDisplay && !shouldIgnoreCommandMsgDisplay){
        setChatMessages((msgs) => (
          [newMessage, ...msgs].slice(0, MAX_MESSAGES)
        ));
      }
    };
  }, [getPronounsFromTwitchName, parseBadges, customEmotes, ttsSpeak, configuration]);

  useEffect(() => {
    onMessageRemovedRef.current = (msgId: string) => {
      if (configuration.userConfiguration.ttsConfiguration.isTTSEnabled) {
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