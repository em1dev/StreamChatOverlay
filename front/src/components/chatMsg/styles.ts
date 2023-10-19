import styled, { keyframes } from 'styled-components';

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

export const Message = styled.div`
  animation: ${easeIn} 0.2s ease-in;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-align: end;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 0.3em 0;
  font-size: 0.9em;

  background-color: rgba(0,0,0,0.8);
  padding: 0.4em 0.7em 0.9em 0.7em;
  border-radius: 0.5em;
`;

export const Content = styled.div`
  word-break: break-word;
  text-align: end;
`;
