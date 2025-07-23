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

declare module 'styled-components' {
  export interface DefaultTheme {
    chat: {
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
  }
}