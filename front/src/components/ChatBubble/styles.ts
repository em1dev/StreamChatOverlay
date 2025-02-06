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

  font-family: ${(props) => props.theme.chat.font};
`;

export const Content = styled.div<{ $direction: 'left' | 'right', $effect: ChatMessageData['effect']}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3ch;

  background-color: ${(props) => props.theme.chat.content.bg};
  color: ${(props) => props.theme.chat.content.text};
  border-radius: ${(props) => props.theme.chat.content.borderRadius};
  border: ${(props) => props.theme.chat.content.border};
  padding: ${(props) => props.theme.chat.content.padding};

  font-weight: ${(props) => props.theme.chat.content.fontWeight};
  font-size: ${(props) => props.theme.chat.content.fontSize};

  z-index: 0;
  position: relative;
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
