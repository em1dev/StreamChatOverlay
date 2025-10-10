import { ChatTheme } from '../styled';
import { duckChatTheme } from './duck';

export const pinkChatTheme:ChatTheme = {
  ...duckChatTheme,
  header: {
    ...duckChatTheme.header,
    bg: '#ffd7f8',
    text: '#4b003e',
    border: 'solid 0.25em #dea1d3',
  },
  content: {
    ...duckChatTheme.content,
    bg: '#ffeffd',
    mention: {
      ...duckChatTheme.content.mention,
      text: '#4b003e',
    },
    reward: {
      ...duckChatTheme.content.reward,
      bg: '#ffd7f8',
      text: '#4b003e',
    },
    reply: {
      ...duckChatTheme.content.reply,
      bg: '#ffd7f8',
      text: '#4b003e',
    },
  },
};
