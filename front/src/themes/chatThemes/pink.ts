import { ChatTheme } from '../styled';
import { duckChatTheme } from './duck';

export const pinkChatTheme:ChatTheme = {
  ...duckChatTheme,
  header: {
    ...duckChatTheme.header,
    marginHorizontal: undefined,
    bg: '#ffb7f2',
  },
  content: {
    ...duckChatTheme.content,
    marginHorizontal: '8px',
    bg: '#fff2f2'
  }
};
