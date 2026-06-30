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
    margin: 0;
    color: #66364B;
  }

  section {
    background-color: #fbf6ee;
    outline: ${({ theme }) => theme.page.outlines.section };
    border-radius: 1em;
    padding: 1em;
    margin-bottom: 1.5em;

    display: flex;
    flex-direction: column;
    gap: 0.5em;

    p {
      margin: 0;
      color: #A16C6C;
    }
  }
`;

export const NoContentContainer = styled(ContentContainer)`
  grid-area: nav / nav / body / body;
  @media (${({ theme }) => theme.page.query.mobile}) {
    grid-area: body;
  }
  `;
