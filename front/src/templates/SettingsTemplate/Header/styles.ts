import styled from 'styled-components';

export const Header = styled.header`
  padding: 2em;
  width: 900px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;

  button {
    border: none;
    background-color: transparent;
    color: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1.2em;
  }

  > div:first-child a {
    color: ${(props) => props.theme.page.colors.title};
    font-family: 'Caveat';
    font-size: 2em;
    text-decoration: none;
    font-weight: bold;
  }
`;

export const ProfileDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;
  img {
    border-radius: 100%;
    border: solid 2px ${({ theme }) => theme.page.colors.text };
  }
`;