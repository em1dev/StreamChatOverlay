import { CustomEmote } from '../api/chatApi/types';

export type MessagePart = {
  type: 'text' | 'emote' | 'mention' | 'reply' | 'redeption',
  content: string,
  customEmote?: CustomEmote,
  originalContent: string
}

export interface ChatMessageData {
  id: string,
  effect: 'normal' | 'rainbow' | 'simmer' | 'big-emote',
  fullMessageText: string,
  emoteOffsets: Map<string, Array<string>>,
  userDisplayName: string,
  displayPronoun?: string | null,
  color?: string | undefined,
  badges: Array<{
    id: string,
    url: string
  }>,
  messageParts: Array<MessagePart>,
}

export interface TTSMessage {
  id: string,
  parts: Array<MessagePart>,
  fullMessageText: string,
  sentBy?: string,
}