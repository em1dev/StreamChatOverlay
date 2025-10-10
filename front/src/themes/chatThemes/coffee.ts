import { ChatTheme } from '../styled';

export const coffeeChatTheme: ChatTheme = {
  font: 'poppins',

  header: {
    bg: '#3b3432',
    text: '#f2d4c6',
    borderRadius: '14px',
    border: 'none',
    fontWeight: 'bold',
    padding: '0.8em 1.5em 0.8em 1.5em',
    marginHorizontal: '8px',
    marginBottom: '-4px',
  },

  content: {
    bg: '#f2d4c6',
    text: '#3b3432',
    border: 'solid 4px #3b3432',
    borderRadius: '14px',
    fontWeight: 'bold',
    padding: '0.8em 0.8em',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

    mention: {
      bg: '#3b3432',
      text: '#f2d4c6',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5em',
    },

    reply: {
      bg: '#3b3432',
      text: '#f2d4c6',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5em',
    },

    reward: {
      bg: '#3b3432',
      text: '#f2d4c6',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5em',
    },
  }
};
