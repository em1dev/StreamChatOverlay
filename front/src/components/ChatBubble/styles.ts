import styled, { css } from 'styled-components';
import { ChatMessageData } from '../../types';

export const Message = styled.div<{ $direction: 'left' | 'right' }>`
  text-align: end;

  display: flex;
  flex-direction: column;
  ${({ $direction }) => $direction === 'left' ?
    css` align-items: start;` :
    css` align-items: end; `
}

  margin: 0.3em 0;

  font-size: 12px;
  font-weight: bold;
`;

export const Content = styled.div<{ $direction: 'left' | 'right', $effect: ChatMessageData['effect']}>`
  z-index: 0;
  position: relative;
  background-color: #F6D6BD;
  color: #08141E;
  padding: 0.5em 0.8em;
  border-radius: 12px;
  border: solid 1px #2a2a2a;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  word-break: break-word;
  ${({ $direction }) => $direction === 'left' ?
    css` text-align: start;` :
    css` text-align: end; `
}

  ${({ $effect }) => ($effect === 'rainbow' || $effect === 'simmer') && css`

    &:before {
      content: "";
      position: absolute;
      z-index: -2;
      inset: -2px;
      transform: translate(0, 0);
      filter: blur(5px);
      border-radius: 12px;

      background: rgb(131,58,180);
      background: conic-gradient(#ff0041, #ff00fd, #00b1ff, #00ffc6);
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      inset: 0;
      /* Inherit all the decorations defined on the main element */
      background: inherit;
      border: inherit;
      box-shadow: inherit;
      border-radius: inherit;
    }
  `}
`;
