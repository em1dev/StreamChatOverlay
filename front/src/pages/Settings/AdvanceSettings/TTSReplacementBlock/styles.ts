import styled from 'styled-components';

export const Container = styled.div`
  background-color: #FFEEEE;
  border: solid 1px #B65770;
  padding: 1em;
  border-radius: 0.8em;

  display: flex;
  flex-direction: column;
  gap: 1em;

  input {
    font-family: monospace;
    border-radius: 0.5em;
    padding: 0.8em;
    border: none;
    background-color: #F1D1D9;
    color: #5F5F5F;
  }

  header {
    display: flex;
    justify-content: space-between;

    button {
      padding: 0.4em;
      background-color: transparent;
      border: none;
      color: inherit;
      display: flex;
      align-items: center;
      justify-items: center;
      border-radius: 100%;
      &:hover {
        background-color: #FFD9DF;
      }
    }
  }

`;

export const AddSubReplacementBtn = styled.button`
  text-align: center;
  padding: 0.5em;
  border-radius: 0.5em;
  border: solid #E2ABB3 1px;
  background-color: #FFD9DF;
  color: #681018;

  &:hover {
    background-color: #e4bdc3ff;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const RegexInputContainer = styled.div`
  display: flex;
  gap: 0.5em;

  > :first-child {
    flex: 1;
  }
  > :last-child {
    text-align: center;
    width: 5ch;
  }
`;

export const MultiLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
