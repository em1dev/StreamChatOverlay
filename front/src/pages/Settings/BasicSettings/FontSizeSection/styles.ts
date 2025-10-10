import styled from 'styled-components';

export const FontSizeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  button {
    background-color: transparent;
    border: none;
    border-radius: 0.5em;
    padding: 0.5em;
    display: flex;
    align-items: center;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.page.colors.primary_bg};
    }
  }
  > span {
    text-align: center;
    width: 3ch;
  }
`;