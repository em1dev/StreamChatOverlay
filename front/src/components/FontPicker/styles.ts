import styled, { css } from 'styled-components';

export const Option = styled.option<{ $fontFamily: string, $fontWeight?: string | number }>`
  font-family: '${({ $fontFamily }) => $fontFamily}';

  ${({ $fontWeight } ) => $fontWeight && css`
    font-weight: ${$fontWeight};
  `}
`;