import 'styled-components';
import { ButtonVariantKey } from  '@/components/core/Button';


interface Box {
  bg: string,
  text: string,
  borderRadius: string,
  border: string,
  padding: string,
  boxShadow?: string,
  textShadow?: string,
  rotation?: number,
}

export interface ChatTheme
{
  headerOnTop?: boolean,
  messageGap?: string,
  fillContainer?: boolean,

  bubble?: Box,

  header: Box & {
    marginHorizontal?: string,
    marginBottom: string,
  },

  content: Box & {
    marginHorizontal?: string,

    reply: Box,
    reward: Box
    mention: Box,
  }
}

export interface ButtonVariant {
  color: string,
  bg: string,
  bg_hover: string,
  color_hover: string,
  outline: string,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    chat: ChatTheme,
    page: {
      buttons: Record<ButtonVariantKey, ButtonVariant>,
      outlines: {
        section: string,
        input: string
      },
      borderRadius: string,
      query: {
        mobile: string,
      },
      colors: {
        bg: string,
        text: string,
        title: string,

        primary_bg: string,
        primary_bg_hover: string,
        primary_text: string,

        nav_bg_hover: string

        button_bg_hover: string,

        secondary_bg: string,
        secondary_bg_hover: string,
        secondary_text: string,
        secondary_border: string,

        input_bg: string,
        input_bg_hover: string,
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
