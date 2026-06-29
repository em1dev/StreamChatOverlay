import styled from 'styled-components';


export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  border: none;
  border-radius: 0.5em;

  background-color: transparent;
  color: ${(props) => props.theme.page.colors.input_text};

  &:hover {
    background-color: ${(props) => props.theme.page.colors.button_bg_hover};
  }
`;
