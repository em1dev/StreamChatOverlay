import { THEME_USER_COLOR } from '../chatThemes';
import { ChatTheme } from '../styled';

// TODO: this theme is really hard to read with different colors behind and needs improvements
export const floatingChatTheme:ChatTheme = {
  font: 'poppins',

  header: {
    bg: 'transparent',
    text: THEME_USER_COLOR,
    //text: 'white',
    textShadow: '0 0 5px black',
    //textShadow: `0 0 3px ${THEME_USER_COLOR}`,
    borderRadius: '0',
    border: 'none',
    fontWeight: '500',
    padding: '0 5px 0 0 ', // move text to the left to avoid shadow being cut off
    marginBottom: '5px',
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
