import styled from 'styled-components';

export const Container = styled.main`
  display: grid;
  min-height: inherit;
  margin: 0 auto;
  max-width: 900px;

  grid-template-rows: min-content auto 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "header header header" "nav body body" "footer footer footer";
  gap: 2em;

  > :first-child {
    grid-area: header;
  }
  > :nth-child(2) {
    grid-area: nav;
  }

  > :last-child {
    font-size: 1.3em;
    grid-area: footer;
  }
  @media (${({ theme }) => theme.page.query.mobile}) {
    grid-template-areas: "header header header" "body body body" "footer footer footer";
    gap: 0.5em;
  }
`;

export const ContentContainer = styled.div`
  font-size: 1.3em;
  grid-area: body;
  @media (${({ theme }) => theme.page.query.mobile}) {
      width: auto;
      margin: 0.5em;
      padding: 0.5em;
  }

  h1 {
      font-weight: inherit;
      font-family: inherit;
      font-size: inherit;
      margin-top: 0;
      color: #66363B;
  }

  h2 {
      font-size: inherit;
      font-weight: inherit;
      margin: 0.5em 0;
      color: #66364B;
  }

  section {
    margin-bottom: 1.5em;
    p {
      margin: 0;
      color: #A16C6C;
    }
  }
`;
