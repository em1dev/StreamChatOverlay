import { TTSConfiguration, UserConfiguration } from '@/types/userConfigurationTypes';
import { textVariables } from '@/utils/variableReplacementEngine';

const ttsDefaultConfig: TTSConfiguration = {
  isTTSEnabled: false,

  onlyReadMessagesThatStartWithTtsCommand: false,
  ttsCommand: '!tts',

  replaceUrls: true,
  replaceUrlWith: '$who has sent a link',

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
  redemptionLabel: 'Channel Point Redemption',
  replyLabel: `Replying to: ${textVariables.replyTo} ${textVariables.shortParentMsg}`,
  allowedConnections: {
    twitch: true,
    youtube: true
  }
};
