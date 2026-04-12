import styled from 'styled-components';

export const Select = styled.select<{ $fontFamily?: string }>`
  width: 100%;
  padding: 0.5em;
  border-radius: 0.8em;
  background-color: ${(props) => props.theme.page.colors.select_bg};
  color: ${(props) => props.theme.page.colors.select_text};
  border: none;
  font-family: ${({$fontFamily}) => $fontFamily ? `"${$fontFamily}"` : 'inherit' };
  font-size: inherit;
`;