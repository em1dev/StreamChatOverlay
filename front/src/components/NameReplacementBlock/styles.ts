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

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;