import { CustomEmote } from '../api/elpatoApi/types';

export type MessagePart = {
  type: 'text' | 'emote' | 'mention' | 'reply' | 'redeption',
  content: string,
  customEmote?: CustomEmote,
  originalContent: string
}

export interface ChatMessageData {
  id: string,
  effect: 'normal' | 'rainbow' | 'simmer' | 'big-emote',
  content: string,
  emoteOffsets: Map<string, Array<string>>,
  userDisplayName: string,
  displayPronoun?: string | null,
  color?: string | undefined,
  badges: Array<{
    id: string,
    url: string
  }>,
  contentParts: Array<MessagePart>,
}

export interface TTSMessage {
  id: string,
  parts: Array<MessagePart>,
  content: string,
  sentBy?: string,
}