import { ChatTheme } from '../styled';

export const centeredChatTheme: ChatTheme = {
  font: 'poppins',
  fillContainer: true,

  bubble: {
    bg: '#eefcff',
    border: 'solid 0.2em #0063a0',
    borderRadius: '0.6em',
    padding: '0.4em',
    text: 'black',
  },

  header: {
    bg: '#94dbea',
    text: '#070a41',
    borderRadius: '0.3em 0.3em 0 0',
    border: 'none',
    fontWeight: '500',
    padding: '0.8em',
    marginBottom: '0.3em',
  },

  content: {
    bg: 'transparent',
    text: '#070a41',
    border: 'none',
    borderRadius: '0',
    fontWeight: '500',
    padding: '0.3em',

    mention: {
      bg: 'transparent',
      text: '#0042f5',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },

    reply: {
      bg: 'transparent',
      text: '#0042f5',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },

    reward: {
      bg: 'transparent',
      text: '#0042f5',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },
  }
};