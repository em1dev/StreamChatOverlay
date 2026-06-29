import { Button } from '@/components/core/Button';
import styled from 'styled-components';


export const Container = styled.div`

`;

export const Menu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: 0.rem;
  border-radius: 0.5rem;
  border: solid 0.1rem #f6d5d5;
  position: absolute;
  width: 100%;
  background-color: white;
  margin-top: 0.2rem;

  box-shadow: 2px 4px 3px 0px #99696973;
  background-color: ${({ theme }) => theme.page.colors.bg};
  overflow: auto;
  max-height: 20rem;

  @media (${({ theme }) => theme.page.query.mobile}) {
    left: 0;
    margin: 1%;
    width: 98%;
    max-height: 60vh;
  }
`;

export const MenuSelectItem = styled.div`
  margin: 0.5rem;
  font-size: 1.2rem;
  display: flex;
  > button:first-child {
    word-break:break-word;
    display: flex;
    align-items: center;
    gap: 0.3em;
    margin: 0;
    padding: 0.5rem;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    border-radius: 0.4rem;
    color: inherit;
    &:hover {
        background-color: ${({ theme }) => theme.page.colors.button_bg_hover};
    }
  }
  > button:not(:first-child){
      width: 2.5em;
  }
`;

export const MenuButton = styled(Button)`
  margin: 0.5rem;
  font-size: 1.2rem;
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;
