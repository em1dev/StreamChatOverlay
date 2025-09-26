import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  > div:last-child {
    margin: auto;
    width: 900px;
    display: flex;
    gap: 3em;

    > nav:first-child
    {
      width: 300px;
    }

    > div:last-child {
      flex: 1;
      font-size: 1.3em;
      padding-bottom: 10em;
      h1 {
        font-weight: inherit;
        font-family: inherit;
        font-size: inherit;
        margin-top: 0;
      }

      h2 {
        font-size: inherit;
        font-weight: inherit;
        margin: 0.5em 0;
      }
    }
  }
`;