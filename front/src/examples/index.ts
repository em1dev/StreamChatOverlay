import { ChatMessageData } from '../types';
import { pickRandom } from '../utils/randomUtils';

export const users = [
  { userDisplayName: 'Niv3k_El_Pato', displayPronoun: 'Any', color: 'yellow' },
  { userDisplayName: 'bulbsum', displayPronoun: 'Any', color: 'orange' },
  { userDisplayName: 'ckmu32', displayPronoun: 'She/Her', color: 'pink' },
  { userDisplayName: 'hellsing2030' },
  { userDisplayName: 'danirod_', color: 'cyan' },
] satisfies Array<Pick<ChatMessageData, 'userDisplayName' | 'displayPronoun' | 'color'>>;

const messageContents:Array<string> = [
  'Buenos dias buenas tardes buenas noches',
  ':D',
  'hahahahhahah',
  'claro que si',
  'alksjd al;sdj al;skdjl;ak djalkjsd lk;asj dlal;dj asdljas dl;ajs dl;jasdj',
  'Hoy es un buen dia!',
  'Hoy es un mal dia!',
  'Tres tristes triger trigaban en un trigal',
  'Hoy es un buen dia!',
  'pareces nuevo pato',
  'Hoy es un buen dia!',
];

export const testMessages = messageContents.map((content, index) => (
  {
    badges: [],
    content,
    id: `${index}`,
    emoteOffsets: new Map(),
    contentParts: [{
      originalContent: content,
      content,
      type: 'text'
    }],
    ...pickRandom(users),
  } satisfies ChatMessageData
)) satisfies Array<ChatMessageData>;