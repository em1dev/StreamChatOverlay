import styled, { css } from 'styled-components';

export const Container = styled.div<{ direction: 'left' | 'right'}>`
  max-width: 500px;
  display: flex;
  flex-direction: column-reverse;
  ${({ direction }) => direction === 'left' ? 
    css`align-items:start;` :
    css`align-items:end;`
  }
`;