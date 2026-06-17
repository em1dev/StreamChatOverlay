import { NavLink } from 'react-router';
import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.page.colors.bg };
  padding: 2em 0em 2em 2em;
  width: 900px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  button {
    border: none;
    background-color: transparent;
    color: inherit;
  }

  > div:first-child {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  @media (${({ theme }) => theme.page.query.mobile}) {
    outline: solid 1px ${({ theme }) => theme.page.colors.input_bg};
    padding: 0.5em;
    position: sticky;
    top: 0;
    z-index: 2;
  }
`;

export const Logo = styled(NavLink)`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.page.colors.title};
  font-family: 'Caveat';
  font-size: 2em;
  text-decoration: none;
  font-weight: bold;

  @media (${({ theme }) => theme.page.query.mobile}) {
    padding-left: 0.5em;
  }
`;

export const ProfileDetailsContainer = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  gap: 0.7em;
  img {
    border-radius: 100%;
    border: solid 2px ${({ theme }) => theme.page.colors.text };
  }
  > div {
      display: flex;
      flex-direction: column;
        align-items: flex-start;
      > * {
          padding: 0.2em;
      }
  }
  button {
    width: 100%;
    text-align: inherit;
    color: #66364b;
    opacity: 0.8;
    &:hover, &:focus {
      text-decoration: underline;
      opacity: 1;
    }
  }
  @media (${({ theme }) => theme.page.query.mobile}) {
      display: none;
  }
`;

export const MenuButton = styled.button`
  display: none;
  @media (${({ theme }) => theme.page.query.mobile}) {
    display: block;
  }
  padding: 1em;
`;
