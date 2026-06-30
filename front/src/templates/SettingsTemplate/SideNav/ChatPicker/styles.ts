import { Button } from '@/components/core/Button';
import styled from 'styled-components';


export const Container = styled.div`
  font-size: 1.2rem;
`;

export const Menu = styled.div<{ $isOpen: boolean }>`
  z-index: 2;
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  border-radius: 0.8rem;
  border: solid 0.1rem #f6d5d5;
  position: absolute;
  max-width: min(500px, 100vw);
  min-width: 100%;
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
    min-width: auto;
  }
`;

export const MenuSelectItem = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items:center;
  > button:first-child {
    justify-content: flex-start;
    word-break:break-word;
    flex: 1;
    gap: 0;

    overflow: hidden;

    > span {
        overflow: hidden;
        word-break:break-word;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    > svg {
      min-width: 1.2em;
    }
  }
`;

export const MenuButton = styled(Button)`
  margin: 0.5rem;
`;
