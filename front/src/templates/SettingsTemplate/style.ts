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
    margin: 0 auto;
    width: 900px;
    display: flex;
    gap: 3em;


    @media (${({ theme }) => theme.page.query.mobile}) {
        width: auto;
        margin: 0.5em;
        padding: 0.5em;
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
}
`;
