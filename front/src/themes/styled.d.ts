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
  headerOnTop?: boolean,

  header: Box & {
    fontSize: string,
    fontWeight: string,
    marginHorizontal?: string,
    marginBottom: string,
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
        primary_bg_hover: string,
        primary_text: string,

        secondary_bg: string,
        secondary_bg_hover: string,
        secondary_text: string,
        secondary_border: string,

        select_bg: string,
        select_text: string
        input_bg: string,
        input_text: string

        warning_bg: string,
        warning_text: string,

        danger_bg: string,
        danger_bg_hover: string,
        danger_text: string
      }
    }
  }
}