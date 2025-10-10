import { ThemeKeys } from '@/themes/chatThemes';

export interface ChatThemeOverride
{
  font?: string,
}

export interface TTSReplacement {
  id: string,
  isEnabled: boolean,
  ordinal: number,
  regex: string,
  regexFlags: string,
  replaceWith: string,
  replaceFullMessage?: boolean,
  replacement?: TTSReplacement,
  description: string
}

export interface TTSConfiguration {
  isTTSEnabled: boolean,
  selectedVoice?: string,
  userReplacement: Array<TTSReplacement>,
  replacements: Array<TTSReplacement>,
  ignoredUsers: Array<{
    id: string,
    userName: string
  }>,
  emotesToRead: number
  readEmotes: boolean,
  ignoreBotMessages: boolean,
  ignoreCommandMessages: boolean,
  readUnderscoresAsSpaces: boolean,
  allowRoleplay: boolean
}

export interface UserConfiguration {
  chatDirection: 'left' | 'right',
  emotes: {
    isBetterTTVEnabled: boolean,
    isFrankerFaceEnabled: boolean,
    isSevenTVEnabled: boolean,
  }
  hideBotMessages: boolean,
  hideCommands: boolean,
  showChatterBadges: boolean,

  ignoredUsers: Array<{
    id: string,
    value: string
  }>
  ttsConfiguration: TTSConfiguration,
  chatTheme: ThemeKeys,
  headerOrdering: Array<ChatMessageHeaderType>,
  chatThemeOverride?: ChatThemeOverride,
  fontSize: number
}

export type ChatMessageHeaderType = 'pronouns' | 'name' | 'badges'