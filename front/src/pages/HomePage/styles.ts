import styled, { createGlobalStyle } from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;

  > * {
    -webkit-mask-image: none;
    box-shadow: 0px 0px 20px 17px #00000026;
    overflow: hidden;
    width: 500px;
    height: 792px;
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: white;
  }
`;

export const Page = styled.div`
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  text-align: center;
`;

export const Input = styled.input`
  padding: 0.5em 1em;
  font-size: 1.2em;
  border: none;
  border-radius: 0.3em;
  margin: 1em;
  background-color: white;
`;

export const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  body {
    background-color: #201f1f;
  }

  h1 {
    margin-top: 2em;
  }
  h2 {
    margin-bottom: 2em;
  }
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8em;
`;

export const Subtitle = styled.p``;
export const Label = styled.label``;