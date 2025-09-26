import styled from 'styled-components';

export const VoiceSelectContainer = styled.div`
  margin: 0.5em 0;
  display: flex; 
  flex-direction: column;
  gap: 0.5em;
`;

export const EmotesToReadContainer = styled.p`
  margin: 0;
  input {
    padding: 0.5em 1em;
    margin: 0.5em;
    width: 10ch;
    border: none;
    background-color: #E2ABB4;
    border-radius: 0.8em;
    font-family: inherit;
    font-size: 0.8em;
    color: #681018;
  }
`;