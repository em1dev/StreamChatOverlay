import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Itim';
    background-color: ${(props) => ( props.theme.page.colors.bg )};
    color: ${(props) => ( props.theme.page.colors.text )};
  }

  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  ::selection {
    color: #ffcccc;
    background: #ff7878;
    border-radius: 2em;
  }

  button {
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;
  }
`;