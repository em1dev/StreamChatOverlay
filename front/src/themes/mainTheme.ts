import { DefaultTheme } from 'styled-components';

export const THEME_USER_COLOR = '$userColor';

const theme1: DefaultTheme = {
  chat: {
    font: 'poppins',

    header: {
      bg: '#2a2a2a',
      text: '#F6D6BD',
      borderRadius: '12px',
      border: 'none',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0.4em 1.5em 0.8em 1.5em',
      marginHorizontal: '8px',
    },

    content: {
      bg: '#F6D6BD',
      text: '#08141E',
      border: 'solid 1px #2a2a2a',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0.5em 0.8em',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

      mention: {
        bg: '#2a2a2a',
        text: '#F6D6BD',
        border: 'none',
        borderRadius: '0.8em',
        padding: '0.5em',
      },

      reply: {
        bg: '#2a2a2a',
        text: '#F6D6BD',
        border: 'none',
        borderRadius: '0.8em',
        padding: '0.5em',
      },

      reward: {
        bg: '#2a2a2a',
        text: '#F6D6BD',
        border: 'none',
        borderRadius: '0.8em',
        padding: '0.5em',
      },
    }
  }
};


const theme3: DefaultTheme = {
  chat: {
    font: 'poppins',
    header: {
      bg: 'black',
      text: 'white',
      borderRadius: '0',
      border: '1px white solid',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0.4em 1.5em 0.8em 1.5em',
      marginHorizontal: '8px',
    },
    content: {
      bg: 'white',
      text: 'black',
      border: '3px solid black',
      borderRadius: '0',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0.5em 0.8em',
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
  }
};

const theme2: DefaultTheme = {
  chat: {
    font: 'poppins',
    header: {
      bg: '#ffda86',
      text: 'black',
      borderRadius: '2em',
      border: '0px #fff8ea solid',
      fontSize: '12px',
      fontWeight: '500',
      padding: '0.4em 1.5em 0.8em 1.5em',
      marginHorizontal: '8px',
    },

    content: {
      bg: '#fff8ea',
      text: 'black',
      border: '0px solid #282828',
      borderRadius: '1em',
      fontSize: '13px',
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
  }
};

const floating:DefaultTheme = {
  chat: {
    font: 'poppins',
    header: {
      bg: 'transparent',
      text: THEME_USER_COLOR,
      textShadow: `0 0 3px ${THEME_USER_COLOR}`,
      borderRadius: '0',
      border: 'none',
      fontSize: '13px',
      fontWeight: '500',
      padding: '0',
    },

    content: {
      bg: 'transparent',
      text: 'white',
      border: 'none',
      borderRadius: '0',
      fontSize: '13px',
      fontWeight: '500',
      padding: '0.2em 0',
      textShadow: '0 0 2px black',

      mention: {
        bg: 'transparent',
        text: '#fffbae',
        border: 'none',
        borderRadius: '0',
        padding: '0',
      },

      reply: {
        bg: 'transparent',
        text: '#fffbae',
        border: 'none',
        borderRadius: '0',
        padding: '0',
      },

      reward: {
        bg: '#ffcaad',
        text: '#fffbae',
        border: 'none',
        borderRadius: '0',
        padding: '0',
      },
    }
  }
};

const pinkTheme:DefaultTheme = {
  ...theme2,
  chat: {
    ...theme2.chat,
    header: {
      ...theme2.chat.header,
      bg: '#ffb7f2',
    },
    content: {
      ...theme2.chat.content,
      bg: '#fff2f2'
    }
  }
};

export { theme1, theme2, theme3, pinkTheme, floating };