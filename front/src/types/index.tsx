import { CustomEmote } from '../api/elpatoApi/types';

export type MessagePart = {
  type: 'text' | 'emote' | 'mention' | 'reply' | 'redeption',
  content: string,
  customEmote?: CustomEmote,
  originalContent: string
}

export interface ChatMessageData {
  id: string,
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

export interface TTSReplacement {
  id: string,
  ordinal: number,
  regex: string,
  regexFlags: string,
  replaceWith: string,
  replaceFullMessage?: boolean,
  replacement?: TTSReplacement,
  description: string
}

export interface TTSConfiguration {
  selectedVoice?: string,
  userReplacement: Array<TTSReplacement>,
  replacements: Array<TTSReplacement>,
  ignoredUsers: Array<{
    id: string,
    userName: string
  }>
}

export interface UserConfiguration {
  channelName: string,
  channelId: string,
  isTTSEnabled: boolean,
  chatDirection: 'left' | 'right',
  betterTTVEnabled: boolean,
  frankerFaceEnabled: boolean,
  sevenTVEnabled: boolean,
  ignoredUsers: Array<{
    id: string,
    value: string
  }>
  ttsConfiguration: TTSConfiguration,
}

export interface TTSMessage {
  id: string,
  parts: Array<MessagePart>,
  content: string,
  sentBy?: string,
}