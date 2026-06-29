import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${({ theme }) => theme.page.colors.input_bg};
  color: ${({ theme }) => theme.page.colors.input_text};
  padding: 0.4em 0.8em;
  border-radius: 0.5em;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  border: none;
`;