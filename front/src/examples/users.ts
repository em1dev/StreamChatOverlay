import { ChatMessageData } from '@/types';

type ChatUser = Pick<
  ChatMessageData,
  'userDisplayName' | 'displayPronoun' | 'color' | 'badges'
>;

const emy: ChatUser = {
  userDisplayName: 'EmyTheDoll',
  displayPronoun: 'she/her',
  color: '#F9C8E0',
  badges: [
    {
      'id': 'broadcaster',
      'url': 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2'
    }
  ],
};

export const chatUsers = {
  emy
};
