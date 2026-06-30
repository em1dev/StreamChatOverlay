import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${({ theme }) => theme.page.colors.input_bg};
  color: ${({ theme }) => theme.page.colors.input_text};
  border-radius: ${({ theme }) => theme.page.borderRadius};
  outline: ${({ theme }) => theme.page.outlines.input};
  padding: 0.4em 0.8em;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  border: none;
`;
