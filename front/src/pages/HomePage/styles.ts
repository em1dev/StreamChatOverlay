import styled, { createGlobalStyle } from 'styled-components';

export const Page = styled.div`
  height: 100%;
  justify-content: center;
  padding: 2em;
  color: #818181;
  display: flex;
  flex-direction: row;
  max-height: 100vh;
  overflow-y: hidden;
`;

export const Info = styled.div`
  color: #eee1b4;
  margin-top: 1em;
`;

export const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
  background-color: #3f3f3f;
  border-radius: 0.5em;

  > * {
    overflow: hidden;
    width: 500px;
    height: 100%;
    padding: 0.6em;
    background-color: #3f3f3f;
  }
`;

export const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
  }

  html, body {
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  body {
    background-color: #1A1A1A;
  }

  h1, h2 {
    margin: 0;
    font-weight: 500;
    font-size: 1.2em;
    color: #B9B9B9;
  }
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2em;
  gap: 1em;
`;

export const FullSection = styled.div`
  flex: 1 100%;
`;

export const SettingSectionCard = styled.div`
  min-width: 400px;
  padding: 1.5em;
  background-color: #151515;
  color: #B9B9B9;
  border-radius: 0.8em;
`;

export const ChatSettings = styled(SettingSectionCard)`
  flex: 1;
  overflow: auto;
  width: 500px;
  max-width: 500px;
`;

export const TTSSettings = styled(SettingSectionCard)`
  flex: 1 100%;
  display: flex;
  flex-direction: row;
  gap: 2em;
  > * {
    overflow: auto;
    padding-right: 0.8em;
  }
`;

export const RowGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3em;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const DirectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const TextInput = styled.input`
  background-color: #272727;
  color: #818181;
  font-size: 0.5em;
  padding: 0.8em;
  font-size: 1.2em;
  border: none;
  border-radius: 0.3em;
`;

export const Radio = styled.input`
  transform: scale(1.2);
`;

export const Checkbox = styled.input`
  transform: scale(1.2);
`;

export const Subtitle = styled.p``;
export const Label = styled.label``;


export const InputWithButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  > input {
    flex: 1;
  }

  > button {
    margin-right: -0.5em;
    cursor: pointer;
    display: flex;
    align-self: center;
    justify-content: center;
    padding: 0.2em;
    background-color: transparent;
    border: none;

    border-radius: 0.5em;
    &:hover {
      background-color: #822929;
    }

    img {
      height: 2em;
    }
  }
`;

export const AddBtn = styled.button`
  border-radius: 50%;
  border: none;
  margin: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  background-color: #ECF67C;
  cursor: pointer;
  &:hover {
    background-color: #e9fa31;
  }
`;