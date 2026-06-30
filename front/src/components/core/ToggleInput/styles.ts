import styled, { css } from 'styled-components';

export const Switch = styled.div<{ $on: boolean }>`
  width: 1.5em;
  height: 0.8em;
  border-radius: 10em;
  position: relative;
  display: flex;
  align-items: center;
  border: solid 0.15em ${({ theme }) => theme.page.colors.secondary_text};

  &::after {
      content: ' ';
      position: absolute;
      display: block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 100%;
      outline: solid 0.15em ${({ theme }) => theme.page.colors.secondary_text};
      background-color: white;
      transform: translateX(0);

      transition: transform 0.1s ease-out;
    }

  background-color: transparent;

  ${({ $on, theme }) => $on && css`
    background-color: ${theme.page.colors.secondary_text};
    &::after {
      transform: translateX(0.7em);
    }
  `}

  transition: background-color 0.1s ease-out;
`;

export const Label = styled.label`
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
`;
