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

export const pinkCenterTheme:ChatTheme = {
  ...centeredChatTheme,

  bubble: {
    ...centeredChatTheme.bubble!,
    border: 'solid 0.2em #7f1483',
    bg: '#ffeffd',
  },
  header: {
    ...centeredChatTheme.header,
    bg: '#ffd0f7',
    text: '#4b003e',
  },
  content: {
    ...centeredChatTheme.content,
    text: '#4b003e',
    mention: {
      ...centeredChatTheme.content.mention,
      text: '#c700a5',
    },
    reward: {
      ...centeredChatTheme.content.reward,
      text: '#c700a5',
    },
    reply: {
      ...centeredChatTheme.content.reply,
      text: '#c700a5',
    },
  },
};

export const redCenterTheme:ChatTheme = {
  ...centeredChatTheme,
  bubble: {
    ...centeredChatTheme.bubble!,
    border: 'solid 0.2em #8c0003',
    bg: '#fff4f4',
  },
  header: {
    ...centeredChatTheme.header,
    bg: '#f7c5c5',
    text: '#480000',
  },
  content: {
    ...centeredChatTheme.content,
    mention: {
      ...centeredChatTheme.content.mention,
      text: '#480000',
    },
    reward: {
      ...centeredChatTheme.content.reward,
      text: '#480000',
    },
    reply: {
      ...centeredChatTheme.content.reply,
      text: '#480000',
    },
  },
};

export const greenCenterTheme:ChatTheme = {
  ...centeredChatTheme,
  bubble: {
    ...centeredChatTheme.bubble!,
    border: 'solid 0.2em #006c00',
    bg: '#ecfeeb',
  },
  header: {
    ...centeredChatTheme.header,
    bg: '#b1fbb1',
    text: '#002b10',
  },
  content: {
    ...centeredChatTheme.content,
    mention: {
      ...centeredChatTheme.content.mention,
      text: '#002b10',
    },
    reward: {
      ...centeredChatTheme.content.reward,
      text: '#002b10',
    },
    reply: {
      ...centeredChatTheme.content.reply,
      text: '#002b10',
    },
  },
};
