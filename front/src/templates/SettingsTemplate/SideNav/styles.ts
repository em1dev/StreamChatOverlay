import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  a {
    display: flex;
    align-items: center;
    gap: 0.5em;
    svg {
      font-size: 1.5em;
    }
    font-size: 1.2em;
    text-decoration: none;
    border-radius: 3em;
    padding: 0.8em 2em;
    color: inherit;

    &.active {
      background-color: #ffe0eb;
    }

    &:hover:not(.active) {
      background-color: #ffe0eb;
    }
  }
`;