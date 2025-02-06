import { DefaultTheme } from 'styled-components';


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
      padding: '0.4em 1.5em 0.8em 1.5em'
    },

    content: {
      bg: '#F6D6BD',
      text: '#08141E',
      border: 'solid 1px #2a2a2a',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0.5em 0.8em',

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
      padding: '0.4em 1.5em 0.8em 1.5em'
    },
    content: {
      bg: 'white',
      text: 'black',
      border: '3px solid black',
      borderRadius: '0',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0.5em 0.8em',

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
      padding: '0.4em 1.5em 0.8em 1.5em'
    },

    content: {
      bg: '#fff8ea',
      text: 'black',
      border: '0px solid #282828',
      borderRadius: '1em',
      fontSize: '13px',
      fontWeight: '500',
      padding: '0.5em 0.8em',

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


export { theme1, theme2, theme3 };