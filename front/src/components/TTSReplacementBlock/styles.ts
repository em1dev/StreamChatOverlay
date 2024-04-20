import styled from 'styled-components';

export const Container = styled.div`
  background-color: #1A1A1A;
  border: solid 1px #585858;
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
    background-color: #151515;
    color: #B9B9B9;
  }
`;

export const AddSubReplacementBtn = styled.button`
  padding: 1em;
  display: flex;
  border: none;
  border-radius: 0.5em;
  background-color: #818181;
  font-family: inherit;
  font-weight: 600;
  color: #151515;
  cursor: pointer;
  &:hover {
    background-color: #a5a5a5;
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
