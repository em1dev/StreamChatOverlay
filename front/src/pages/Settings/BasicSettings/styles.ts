import styled from 'styled-components';

export const EmoteToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const ChatContainer = styled.div`
  background-color: #dfd7ce;
  border-radius: 1em;
  padding: 1em;
  height: 400px;
`;

export const DirectionContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    cursor: pointer;
    font-size: 1.5em;
    font-family: inherit;
    background-color: transparent;
    border: none;
    color: inherit;
    display: flex;
    align-items: center;
  }
`;

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
