import styled from 'styled-components';

export const Header = styled.header`
  padding: 2em;
  width: 900px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1.2em;
  }

  > div:first-child a {
    color: ${(props) => props.theme.page.colors.title};
    font-family: 'Caveat Variable';
    font-size: 2em;
    text-decoration: none;
    font-weight: bold;
  }

`;