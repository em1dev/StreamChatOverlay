import styled, { css } from 'styled-components';

export const Container = styled.div<{ 
  $direction: 'left' | 'right',
  $fontSize: number,
}>`
  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.01, rgba(0,0,0,0)), color-stop(0.4,  rgba(0,0,0,1)));
  padding: 0 0.5em;
  max-width: 100vw;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  font-size: ${({ $fontSize }) => $fontSize}px;
  ${({ $direction }) => $direction === 'left' ? 
      css`align-items:start;` :
      css`align-items:end;`
  }
`;