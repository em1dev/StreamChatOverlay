import styled, { css } from 'styled-components';

export const Container = styled.div<{ direction: 'left' | 'right'}>`
  -webkit-mask-image: -webkit-gradient(    linear, left top, left bottom,     color-stop(0.01,  rgba(0,0,0,0)), color-stop(0.4,  rgba(0,0,0,1)));
  margin: 0 0.5em;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  ${({ direction }) => direction === 'left' ? 
    css`align-items:start;` :
    css`align-items:end;`
}
`;