import styled from 'styled-components';

export const VoiceSelectContainer = styled.div`
  margin-bottom: 0.5em;
  display: flex; 
  flex-direction: column;
  gap: 0.5em;
`;

export const TryTtsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  input {
    width: 100%;
  }
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  svg {
    font-size: 1.5em;
  }
`;

export const EmotesToReadContainer = styled.p`
  margin: 0;
  input {
    margin: 0.5em;
    width: 7ch;
    font-size: 0.8em;
  }
`;

export const TTSExampleBlock = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin: auto;
  gap: 0.2em;
  padding: 0.5em;
  svg {
    font-size: 1.3em;
  }
`;