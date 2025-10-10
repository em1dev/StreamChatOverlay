import { ChatTheme } from './styled';

export const THEME_USER_COLOR = '$userColor';

const coffee: ChatTheme = {
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


const contrast: ChatTheme = {
  font: 'poppins',
  header: {
    bg: 'black',
    text: 'white',
    borderRadius: '0',
    border: 'none',
    fontWeight: 'bold',
    padding: '0.8em 1.5em 0.8em 1.5em',
    marginHorizontal: '8px',
    marginBottom: '-3px',
  },
  content: {
    bg: 'white',
    text: 'black',
    border: '3px solid black',
    borderRadius: '0',
    fontWeight: 'bold',
    padding: '0.6em 0.6em',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

    mention: {
      bg: 'black',
      text: 'white',
      border: '3px solid black',
      borderRadius: '0',
      padding: '0.5em',
    },

    reply: {
      bg: 'black',
      text: 'white',
      border: '3px solid black',
      borderRadius: '0',
      padding: '0.5em',
    },

    reward: {
      bg: 'black',
      text: 'white',
      border: '3px solid black',
      borderRadius: '0',
      padding: '0.5em',
    },
  }
};

const duck: ChatTheme = {
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

// TODO: this theme is really hard to read with different colors behind and needs improvements
const floating:ChatTheme = {
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

const pinkTheme:ChatTheme = {
  ...duck,
  header: {
    ...duck.header,
    marginHorizontal: undefined,
    bg: '#ffb7f2',
  },
  content: {
    ...duck.content,
    marginHorizontal: '8px',
    bg: '#fff2f2'
  }
};

export type ThemeKeys = 'duck' | 'coffee' | 'pink' | 'floating' |  'contrast' ;

export const themeKeyMap: Record<ThemeKeys, ChatTheme> = {
  'duck': duck,
  'coffee': coffee,
  'pink': pinkTheme,
  'floating': floating,
  'contrast': contrast,
};