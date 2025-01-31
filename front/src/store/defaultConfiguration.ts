import { TTSConfiguration, UserConfiguration } from '../types';


const ttsDefaultConfig: TTSConfiguration = {
  ignoredUsers: [],
  selectedVoice: 'Microsoft Sabina - Spanish (Mexico)',
  userReplacement: [
    { id: crypto.randomUUID(), ordinal: 0, regex: 'pierito95rsng', replaceWith: 'pierito', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), ordinal: 1, regex: 'lam277', replaceWith: 'lam', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), ordinal: 2, regex: 'inc0gn1t_94610', replaceWith: 'incognito', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), ordinal: 3, regex: 'ckmu32', replaceWith: 'cristi', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), ordinal: 4, regex: 'bulbsum', replaceWith: 'bulbi', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), ordinal: 5, regex: 'guerra24_', replaceWith: 'lili', regexFlags: '', description: '' },
    { id: crypto.randomUUID(), ordinal: 6, regex: 'ssmatiuri', replaceWith: 'matilda', regexFlags: '', description: '' }
  ],
  replacements: [
    { id: crypto.randomUUID(), ordinal: 0, regex: '^!.*', replaceFullMessage: true, replaceWith: '', regexFlags: '', description: 'Don\'t read messages starting with !'  },
    { id: crypto.randomUUID(), ordinal: 1, regex: '\\*quack\\*', regexFlags: 'gi', replaceWith: '', description: 'Don\'t read *quack*' },
    { id: crypto.randomUUID(), ordinal: 2, regex: '[g|j]+h*a+h*n+h*( ?)+[szx]+( ?)+o+', regexFlags: 'gi', replaceWith: 'pato', description: 'Replace ganso with pato' },
    { id: crypto.randomUUID(), ordinal: 3, regex: 'cks+[o|ó|O|Ó]', regexFlags: 'gi', replaceWith: 'se caso', description: '' },
    { id: crypto.randomUUID(), ordinal: 4, regex: '[\\uD83C-\\uFFFF]', regexFlags: 'g', replaceWith: '',  description: 'Don\'t read emojis (does not cover all emojis)' },
    { id: crypto.randomUUID(), ordinal: 5, regex: '_*', regexFlags: 'g', replaceWith: '', description: 'Don\'t read underscores' },
    { id: crypto.randomUUID(), ordinal: 6, regex: '\\bck\\b', regexFlags: 'gi', replaceWith: 'cristi', description: 'Read ck as cristi' },
    { id: crypto.randomUUID(), ordinal: 7, regex: '\\bckmu\\b', regexFlags: 'gi',  replaceWith: 'cristi', description: 'Read ckmu as cristi' },
    { id: crypto.randomUUID(), ordinal: 8, regex: '[0-9a-zA-z]\\.[a-zA-Z][a-zA-Z]', replaceFullMessage: true, replaceWith: '$who a enviado un link.',  regexFlags: '', description: 'Replace links' },
    { id: crypto.randomUUID(), ordinal: 9, regex: '^\\*.+\\*$', replaceWith: '$who $msg', replaceFullMessage: true, description: '', regexFlags: '',
      replacement: {
        id: crypto.randomUUID(), ordinal: 0, regex: '\\*', regexFlags: 'gi', replaceWith: '', description: 'Don\'t read *'
      }
    },
    { id: crypto.randomUUID(), ordinal: 10, regex: '^\\*.+\\*$', replaceWith: '$who $msg', replaceFullMessage: true, description: '', regexFlags: '',
      replacement: {
        id: crypto.randomUUID(), ordinal: 0, regex: '\\*', regexFlags: 'gi', replaceWith: '', description: '',
      }
    },
  ]
};

export const defaultUserConfiguration: UserConfiguration = {
  channelName: '',
  channelId: '',
  ignoredUsers: [
    { id: crypto.randomUUID(), value: 'el_pato_bot' },
    { id: crypto.randomUUID(), value: 'nightbot' },
    { id: crypto.randomUUID(), value: 'ckmu_bot' },
    { id: crypto.randomUUID(), value: 'streamelements' },
  ],
  betterTTVEnabled: true,
  chatDirection: 'right',
  frankerFaceEnabled: true,
  sevenTVEnabled: true,
  isTTSEnabled: true,
  ttsConfiguration: ttsDefaultConfig
};