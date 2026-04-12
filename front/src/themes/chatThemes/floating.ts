import { THEME_USER_COLOR } from '../chatThemeVariables';
import { ChatTheme } from '../styled';

// TODO: this theme is really hard to read with different colors behind and needs improvements
export const floatingChatTheme:ChatTheme = {
  header: {
    bg: 'transparent',
    text: THEME_USER_COLOR,
    textShadow: '0 0 5px black',
    borderRadius: '0.5em',
    border: 'none',
    fontWeight: '500',
    padding: '0.6em 0.6em',
    marginBottom: '0.3em',
  },

  content: {
    bg: 'transparent',
    text: 'white',
    border: 'none',
    borderRadius: '0',
    fontWeight: '500',
    padding: '0.2em 5px',
    textShadow: '0 0 5px black',

    mention: {
      bg: 'transparent',
      text: '#dfe7ff',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },

    reply: {
      bg: 'transparent',
      text: '#dfe7ff',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },

    reward: {
      bg: 'transparent',
      text: '#dfe7ff',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },
  }
};
