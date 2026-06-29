import styled, { css } from 'styled-components';

export const Select = styled.button <{ $isOpen: boolean }>`
  word-break:break-word;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  font-size: 1.2em;

  padding: 0.8em 0.8em 0.8em 1.6em;
  border-radius: 1em;

  border: none;
  background-color: transparent;
  font-weight: inherit;
  font-family: inherit;
  color: inherit;
  outline: none;

  > svg {
    min-width: 1.5em;
    font-size: 1.5em;
  }

  > :last-child {
    margin-left: auto;
    min-width: 1.8rem;
    font-size: 1.8rem;
  }

  color: ${({ theme }) => theme.page.colors.input_text};
  &.active {
    background-color: ${({ theme }) => theme.page.colors.nav_bg_hover};
  }

  &:hover:not(.active) {
    background-color: ${({ theme }) => theme.page.colors.nav_bg_hover};
  }

  ${({ $isOpen }) => $isOpen && css`
    background-color: ${({ theme }) => theme.page.colors.nav_bg_hover};
  `}
`;
