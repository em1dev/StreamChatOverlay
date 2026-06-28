import styled, { css } from 'styled-components';

const navButton = css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  svg {
    font-size: 1.5em;
  }
  font-size: 1.2em;
  text-decoration: none;
  border-radius: 1em;
  padding: 0.8em 2em;
  color: inherit;

  &.active {
    color: ${({ theme }) => theme.page.colors.input_text};
    background-color: ${({ theme }) => theme.page.colors.nav_bg_hover};
  }

  &:hover:not(.active) {
    color: ${({ theme }) => theme.page.colors.input_text};
    background-color: ${({ theme }) => theme.page.colors.nav_bg_hover};
  }
`;

export const NavContainer = styled.nav<{ $isOpen: boolean }>`
  background-color: ${({ theme }) => theme.page.colors.bg};
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 300px;
  position: sticky;
  top: 7em;
  height: fit-content;
  margin-top: -1em;
  grid-area: nav;

  a {
    ${navButton}
  }

  transition: left ease-out 0.2s;

  @media (${({ theme }) => theme.page.query.mobile}) {
    left: ${({ $isOpen }) => ( $isOpen ? '0vw ' : '100vw' )};
    margin: 0;
    padding: 0.5em;
    z-index: 99999;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
`;

export const NavHeader = styled.header`
  display: none;
  > div {
    padding: 0 2em;
    display: flex;
    gap: 0.5em;
    align-items: center;
    img {
      border-radius: 100%;
      border: solid 2px ${({ theme }) => theme.page.colors.text };
    }
  }

  button {
    border: none;
    background-color: transparent;
    color: inherit;
    display: block;
    margin-left: auto;
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
  }

  @media (${({ theme }) => theme.page.query.mobile}) {
    display: flex;
  }
`;


export const BottomSection = styled.div`
  display: none;


  @media (${({ theme }) => theme.page.query.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 0.5em;


    > button {
      background: transparent;
      outline: none;
      border: none;
      ${navButton}
    }
  }
`;
