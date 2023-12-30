import styled, { css, keyframes } from 'styled-components';

const easeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(500px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Message = styled.div<{ direction: 'left' | 'right' }>`
  animation: ${easeIn} 0.2s ease-in;
  text-align: end;
  color: white;

  display: flex;
  flex-direction: column;
  ${({ direction }) => direction === 'left' ?
    css` align-items: start;` :
    css` align-items: end; `
  }

  margin: 0.3em 0;
  font-size: 0.9em;

  background-color: rgba(0,0,0,0.8);
  padding: 0.4em 0.7em 0.9em 0.7em;
  border-radius: 0.5em;
`;

export const Content = styled.div<{ direction: 'left' | 'right'}>`
  word-break: break-word;
  ${({ direction }) => direction === 'left' ?
    css` text-align: start;` :
    css` text-align: end; `
  }
`;
