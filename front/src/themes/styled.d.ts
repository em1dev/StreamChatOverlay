import 'styled-components';


interface Box {
  bg: string,
  text: string,
  borderRadius: string,
  border: string,
  padding: string,
  boxShadow?: string,
  textShadow?: string
}

export interface ChatTheme
{
  font: string,

  header: Box & {
    fontSize: string,
    fontWeight: string,
    marginHorizontal?: string,
  },

  content: Box & {
    fontSize: string,
    fontWeight: string,
    marginHorizontal?: string,

    reply: Box,
    reward: Box
    mention: Box,
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    chat: ChatTheme,
    page: {
      colors: {
        bg: string,
        text: string,
        title: string,
        primary_bg: string,
        primary_text: string,
        secondary_bg: string,
        secondary_text: string,
        select_bg: string,
        select_text: string
      }
    }
  }
}