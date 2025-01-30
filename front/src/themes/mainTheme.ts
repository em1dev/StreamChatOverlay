import { DefaultTheme } from 'styled-components';


const theme1: DefaultTheme = {
  chat: {
    font: 'poppins',
    header: {
      bg: '#2a2a2a',
      text: '#F6D6BD',
      borderRadius: '12px',
      border: 'none',
    },
    content: {
      bg: '#F6D6BD',
      text: '#08141E',
      border: 'solid 1px #2a2a2a',
      borderRadius: '12px',

      mention: {
        bg: '#2a2a2a',
        text: '#F6D6BD',
        border: 'none',
        borderRadius: '0.8em',
      },

      reply: {
        bg: '#2a2a2a',
        text: '#F6D6BD',
        border: 'none',
        borderRadius: '0.8em',
      },

      reward: {
        bg: '#2a2a2a',
        text: '#F6D6BD',
        border: 'none',
        borderRadius: '0.8em',
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

    },
    content: {
      bg: 'white',
      text: 'black',
      border: '3px solid black',
      borderRadius: '0',

      mention: {
        bg: 'black',
        text: 'white',
        border: '3px solid black',
        borderRadius: '0',
      },

      reply: {
        bg: 'black',
        text: 'white',
        border: '3px solid black',
        borderRadius: '0',
      },

      reward: {
        bg: 'black',
        text: 'white',
        border: '3px solid black',
        borderRadius: '0',
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
      borderRadius: '1em',
      border: '0px #fff8ea solid',
    },

    content: {
      bg: '#fff8ea',
      text: 'black',
      border: '3px solid #282828',
      borderRadius: '1em',

      mention: {
        bg: 'none',
        text: '#f82b2b',
        border: 'none',
        borderRadius: '0',
      },

      reply: {
        bg: '#ff8686',
        text: 'black',
        border: 'none',
        borderRadius: '0.8em',
      },

      reward: {
        bg: '#ff8686',
        text: 'black',
        border: 'none',
        borderRadius: '0.8em',
      },
    }
  }
};


export { theme1, theme2, theme3 };