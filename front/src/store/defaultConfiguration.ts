import { TTSConfiguration, UserConfiguration } from '@/types/userConfigurationTypes';

const ttsDefaultConfig: TTSConfiguration = {
  isTTSEnabled: false,

  readBots: false,
  readCommands: false,
  readUnderscoresAsSpaces: true,
  allowRoleplay: true,

  readEmotes: true,
  emotesToRead: 1,

  ignoredUsers: [],
  selectedVoice: 'Microsoft Sabina - Spanish (Mexico)',
  userReplacement: [
    { id: crypto.randomUUID(), isEnabled: true, ordinal: 0, regex: 'pierito95rsng', replaceWith: 'pierito', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), isEnabled: true, ordinal: 1, regex: 'lam277', replaceWith: 'lam', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), isEnabled: true, ordinal: 2, regex: 'inc0gn1t_94610', replaceWith: 'incognito', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), isEnabled: true, ordinal: 4, regex: 'bulbsum', replaceWith: 'bulbi', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), isEnabled: true, ordinal: 5, regex: 'guerra24_', replaceWith: 'lili', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), isEnabled: true, ordinal: 6, regex: 'ssmatiuri', replaceWith: 'matilda', regexFlags: '', description: '' }
  ],
  replacements: []
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
  ttsConfiguration: ttsDefaultConfig
};