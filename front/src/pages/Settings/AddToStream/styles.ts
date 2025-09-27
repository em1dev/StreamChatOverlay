import styled from 'styled-components';

export const WarningContainer = styled.div`
  background-color: #FCFFB1;
  padding: 1em;
  border-radius: 0.5em;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1em;
  margin: 1em 0;

  color: #AC7B53;

  svg {
    font-size: 1.8em;
  }

  p:first-child {
    margin-top: 0;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 1em;
    padding: 0.8em 1em;
    color: #70000A;
    background-color: #FF8284;
  }
`;

export const ClickToCopyBtn = styled.button`
  margin: auto;
  display: block;
  padding: 1em;
  border-radius: 2em;
  color: #681018;
  background-color: #FFD9DF;
  border: 0.1em solid #E2ABB3;
`;

export const StepContainer = styled.div`

  margin-bottom: 2em;

  > p {
    margin-left: 2em;
    margin-bottom: 0;
    margin-top: 0.5em;
  }

  > p:first-child {
    margin-left: 0;
    display: flex;
    gap: 1em;
    align-items: center;

    &:before {
      content: ' ';
      display: block;
      width: 1em;
      height: 1em;
      border-radius: 100%;
      background-color: #E2ABB3;
    }
  }

  img {
    width: 100%;
    margin: 1em 0;
  }
`;