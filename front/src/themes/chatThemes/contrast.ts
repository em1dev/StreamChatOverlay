import { ChatTheme } from '../styled';

export const contrastChatTheme: ChatTheme = {
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

export const contrastRedChatTheme:ChatTheme = {
  ...contrastChatTheme,
  header: {
    ...contrastChatTheme.header,
    bg: 'white',
    text: 'black',
    border: '3px solid black',
  },
  content: {
    ...contrastChatTheme.content,
    bg: 'black',
    text: 'white',
    mention: {
      ...contrastChatTheme.content.mention,
      bg: 'white',
      text: 'black',
    },
    reward: {
      ...contrastChatTheme.content.reward,
      bg: 'white',
      text: 'black',
    },
    reply: {
      ...contrastChatTheme.content.reply,
      bg: 'white',
      text: 'black',
    },
  },
};