import 'styled-components';


interface Box {
  bg: string,
  text: string,
  borderRadius: string,
  border: string,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    chat: {
      font: string,

      header: Box & {
        fontSize: string,
        fontWeight: string,
      },

      content: Box & {
        fontSize: string,
        fontWeight: string,

        reply: Box,
        reward: Box
        mention: Box,
      }
    }
  }
}