import styled from 'styled-components';

export const HeaderOrderingContainer = styled.div`
  display: inline-flex;
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
  }
`;
