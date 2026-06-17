import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: inherit;
  > :last-child {
      font-size: 1.3em;
    }
`;

export const InnerContainer = styled.div`
  padding: 0 2em;

  margin: 0 auto;
  max-width: 900px;
  font-size: 1.3em;

  h1, h2 {
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  h1 {
    font-size: 1.5em;
    margin: 1em 0 1em 0;
    color: #66364B;
  }

  h2 {
      font-size: 1.2em;
      margin: 0.5em 0;
    color: #66364B;
  }

  i {
      color: #A16C6C;
  }

  p {
    margin: 1em 0;
  }

  a {
      color: #0070ff;
  }

  section {
    margin-bottom: 2em;
  }
`;
