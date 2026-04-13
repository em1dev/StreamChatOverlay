import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  border-radius: 1em;
  text-align: left;
  
  svg {
    font-size: 1.3em;
  }
  
  thead th {
    font-weight: inherit;
  }

  tbody input {
    font-size: 0.8em;
  }

  tfoot button {
    width: 100%;
    padding: 0.5em;
    border: none;
    border-radius: 0.5em;

    background-color: ${(props) => props.theme.page.colors.input_bg};
    color: ${(props) => props.theme.page.colors.input_text};

    &:hover {
      background-color: ${(props) => props.theme.page.colors.input_bg_hover};
    }
  }
`;