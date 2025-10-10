import { ChatTheme } from '../styled';

export const duckChatTheme: ChatTheme = {
  font: 'poppins',
  headerOnTop: true,
  messageGap: '1em',

  header: {
    bg: '#ffe7af',
    text: '#352604',
    border: 'solid 0.25em #ebc977',
    borderRadius: '2em',
    fontWeight: '500',
    padding: '0.6em 1.2em',
    marginBottom: '0',
    rotation: 2,
  },

  content: {
    bg: '#fff8ea',
    text: 'black',
    border: 'none',
    borderRadius: '1em',
    fontWeight: '500',
    padding: '0.5em 0.8em',
    boxShadow: '0 0.2em 0.2em 0 rgba(0, 0, 0, 0.25)',
    marginHorizontal: '1.2em',

    mention: {
      bg: 'none',
      text: '#f82b2b',
      border: 'none',
      borderRadius: '0',
      padding: '0',
    },

    reply: {
      bg: '#ffe7af',
      text: '#352604',
      border: 'none',
      borderRadius: '0.8em',
      padding: '0.5em',
    },

    reward: {
      bg: '#ffe7af',
      text: '#352604',
      border: 'none',
      borderRadius: '0.8em',
      padding: '0.5em',
    },
  }
};

export const pinkChatTheme:ChatTheme = {
  ...duckChatTheme,
  header: {
    ...duckChatTheme.header,
    bg: '#ffd7f8',
    text: '#4b003e',
    border: 'solid 0.25em #dea1d3',
  },
  content: {
    ...duckChatTheme.content,
    bg: '#ffeffd',
    mention: {
      ...duckChatTheme.content.mention,
      text: '#4b003e',
    },
    reward: {
      ...duckChatTheme.content.reward,
      bg: '#ffd7f8',
      text: '#4b003e',
    },
    reply: {
      ...duckChatTheme.content.reply,
      bg: '#ffd7f8',
      text: '#4b003e',
    },
  },
};

export const blueChatTheme:ChatTheme = {
  ...duckChatTheme,
  header: {
    ...duckChatTheme.header,
    bg: '#c5daf7',
    text: '#020058',
    border: 'solid 0.25em #8b86ff',
  },
  content: {
    ...duckChatTheme.content,
    bg: '#f4f8ff',
    mention: {
      ...duckChatTheme.content.mention,
      text: '#020058',
    },
    reward: {
      ...duckChatTheme.content.reward,
      bg: '#c5daf7',
      text: '#020058',
    },
    reply: {
      ...duckChatTheme.content.reply,
      bg: '#c5daf7',
      text: '#020058',
    },
  },
};


export const redChatTheme:ChatTheme = {
  ...duckChatTheme,
  header: {
    ...duckChatTheme.header,
    bg: '#f7c5c5',
    text: '#480000',
    border: 'solid 0.25em #ed6063',
  },
  content: {
    ...duckChatTheme.content,
    bg: '#fff4f4',
    mention: {
      ...duckChatTheme.content.mention,
      text: '#480000',
    },
    reward: {
      ...duckChatTheme.content.reward,
      bg: '#f7c5c5',
      text: '#480000',
    },
    reply: {
      ...duckChatTheme.content.reply,
      bg: '#f7c5c5',
      text: '#480000',
    },
  },
};


export const greenChatTheme:ChatTheme = {
  ...duckChatTheme,
  header: {
    ...duckChatTheme.header,
    bg: '#b1fbb1',
    text: '#002b10',
    border: 'solid 0.25em #2ebf2e',
  },
  content: {
    ...duckChatTheme.content,
    bg: '#ecfeeb',
    mention: {
      ...duckChatTheme.content.mention,
      text: '#002b10',
    },
    reward: {
      ...duckChatTheme.content.reward,
      bg: '#b1fbb1',
      text: '#002b10',
    },
    reply: {
      ...duckChatTheme.content.reply,
      bg: '#b1fbb1',
      text: '#002b10',
    },
  },
};

