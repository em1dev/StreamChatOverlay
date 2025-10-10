import { ChatTheme } from '../styled';

export const duckChatTheme: ChatTheme = {
  font: 'poppins',

  header: {
    bg: '#ffda86',
    text: 'black',
    borderRadius: '2em',
    border: '0px #fff8ea solid',
    fontWeight: '500',
    padding: '0.8em 1.5em 0.8em 1.5em',
    marginHorizontal: '8px',
    marginBottom: '-4px',
  },

  content: {
    bg: '#fff8ea',
    text: 'black',
    border: '0px solid #282828',
    borderRadius: '1em',
    fontWeight: '500',
    padding: '0.5em 0.8em',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

    mention: {
      bg: 'none',
      text: '#f82b2b',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },

    reply: {
      bg: '#ffcaad',
      text: 'black',
      border: 'none',
      borderRadius: '0.8em',
      padding: '0.5em',
    },

    reward: {
      bg: '#ffcaad',
      text: 'black',
      border: 'none',
      borderRadius: '0.8em',
      padding: '0.5em',
    },
  }
};
