import styled, { css } from 'styled-components';
import { navButtonCss } from '../../styles';


export const Select = styled.button<{ $isOpen: boolean }>`
  ${navButtonCss}

  font-size: inherit;
  width: 100%;

  border: none;
  background-color: transparent;

  padding-right: 1em;

  > :last-child {
    margin-left: auto;
  }

  > svg {
    min-width: 1.2em;
  }

  span {
    word-break:break-word;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ $isOpen }) => $isOpen && css`
    background-color: ${({ theme }) => theme.page.colors.nav_bg_hover};
  `}
`;
