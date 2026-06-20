import { CustomEmote } from '../api/chatApi/types';

export type MessagePart = {
  type: 'text' | 'emote' | 'mention' | 'reply' | 'redeption',
  content: string,
  customEmote?: CustomEmote,
  originalContent: string
}

export interface ChatMessageData {
  id: string,
  sentAt: number,
  effect: 'normal' | 'rainbow' | 'simmer' | 'big-emote',
  emoteOffsets: Map<string, Array<string>>,
  userDisplayName: string,
  displayPronoun?: string | null,
  color?: string | undefined,
  badges: Array<{
    id: string,
    url: string
  }>,
  messageParts: Array<MessagePart>,
  isFromBot: boolean,
  isCommand: boolean,
}

export interface TTSMessage {
  id: string,
  parts: Array<MessagePart>,
  sentBy?: string,
  isFromBot: boolean,
  isCommand: boolean
}

// using umami for analytics which adds the global object umami
interface Umami {
  track: (event: string) => void,
  identify: (sessionId: string) => void,
}

declare global {
  interface Window {
    umami?: Umami
  }
}
