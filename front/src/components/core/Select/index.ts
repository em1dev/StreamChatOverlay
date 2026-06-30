import styled from 'styled-components';

export const Select = styled.select<{ $fontFamily?: string }>`
  width: 100%;
  padding: 0.5em;
  border-radius: ${({ theme }) => theme.page.borderRadius};
  background-color: ${(props) => props.theme.page.colors.input_bg};
  color: ${(props) => props.theme.page.colors.input_text};
  outline: ${({ theme }) => theme.page.outlines.input};
  border: none;
  font-family: ${({$fontFamily}) => $fontFamily ? `"${$fontFamily}"` : 'inherit' };
  font-size: inherit;
  border-right: 10px solid transparent;
`;
