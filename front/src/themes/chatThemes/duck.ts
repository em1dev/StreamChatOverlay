import { ChatTheme } from '../styled';

export const duckChatTheme: ChatTheme = {
  font: 'poppins',
  headerOnTop: true,
  messageGap: '1em',

  header: {
    bg: '#ffe7af',
    text: '#352604',
    border: 'solid 0.25em #ebc977',
    borderRadius: '2em',
    fontWeight: '500',
    padding: '0.6em 1.2em',
    marginBottom: '0',
    rotation: 2,
  },

  content: {
    bg: '#fff8ea',
    text: 'black',
    border: 'none',
    borderRadius: '1em',
    fontWeight: '500',
    padding: '0.5em 0.8em',
    boxShadow: '0 0.2em 0.2em 0 rgba(0, 0, 0, 0.25)',
    marginHorizontal: '1.2em',

    mention: {
      bg: 'none',
      text: '#f82b2b',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },

    reply: {
      bg: '#ffe7af',
      text: '#352604',
      border: 'none',
      borderRadius: '0.8em',
      padding: '0.5em',
    },

    reward: {
      bg: '#ffe7af',
      text: '#352604',
      border: 'none',
      borderRadius: '0.8em',
      padding: '0.5em',
    },
  }
};
