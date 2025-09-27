import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  padding: 0.3em;
  border: solid 1px #B65770;
  background-color: #FFEEEE;
  border-radius: 1em;
  text-align: left;
  
  svg {
    font-size: 1.3em;
  }
  
  thead th {
    font-weight: inherit;
  }


  tbody button {
    background-color: transparent;
    border: none;
    color: inherit;
    border-radius: 0.5em;
    padding: 0.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #FFD9DF;
    }
  }

  tbody input {
    padding: 0.5em;
    border-radius: 0.5em;
    border: none;
    background-color: #F1D1D9;
    font-family: inherit;
    font-size: 0.8em;
    color: #5F5F5F;
  }

  tfoot button {
    width: 100%;
    padding: 0.5em;
    border: solid 1px #E2ABB3;
    border-radius: 0.5em;
    background-color: #FFD9DF;;
    color: #681018;
  }
`;