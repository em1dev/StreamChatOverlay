import styled from 'styled-components';

export const HeaderOrderingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5em;
  border: solid 2px;
  border-radius: 0.5em;

  > button {
    width: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: ${({ theme }) => theme.page.colors.text };
    color: ${({ theme }) => theme.page.colors.bg };
    &:hover {
      background-color: #8e3b50;
    }
  }

  > div {
    width: 10ch;
    text-align: center;
    padding: 0.5em 0.5em;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;


  }

  @media (max-width: 470px) {
    flex-direction: column;
    > div, button {
      width: 100%;
      width: 100%;
    }
    > button {
      padding: 0.5em  0;
      > svg {
        rotate: 90deg;
      }
    }
  }
`;

