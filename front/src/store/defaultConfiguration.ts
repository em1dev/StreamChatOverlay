import { TTSConfiguration, UserConfiguration } from '@/types/userConfigurationTypes';

const ttsDefaultConfig: TTSConfiguration = {
  isTTSEnabled: false,

  onlyReadMessagesThatStartWithTtsCommand: false,
  ttsCommand: '!tts',

  ignoreBotMessages: true,
  ignoreCommandMessages: true,
  readUnderscoresAsSpaces: true,
  allowRoleplay: true,

  readEmotes: true,
  emotesToRead: 1,

  ignoredUsers: [],
  selectedVoice: undefined,
  userReplacement: [
    { id: crypto.randomUUID(), isEnabled: true, ordinal: 0, regex: 'emythedoll', replaceWith: 'emydoll', regexFlags: '', description: '' },
  ],
  replacements: [],
};

export const defaultUserConfiguration: UserConfiguration = {
  chatTheme: 'duck',
  ignoredUsers: [],
  chatDirection: 'right',
  emotes: {
    isBetterTTVEnabled: true,
    isFrankerFaceEnabled: true,
    isSevenTVEnabled: true,
  },
  hideBotMessages: true,
  hideCommands: true,
  showChatterBadges: true,
  ttsConfiguration: ttsDefaultConfig,
  lowerOpacityOnTop: true,
  headerOrdering: ['badges', 'pronouns', 'name'],
  fontSize: 12,
  chatFont: 'itim',
  chatFontWeight: 'normal',
  allowedConnections: {
    twitch: true,
    youtube: true
  }
};
