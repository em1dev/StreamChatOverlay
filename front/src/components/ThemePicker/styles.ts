import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const ColorButtonContainer = styled.div`
  display: flex;
  gap: 0.5em;
`;

export const ColorButton = styled.button<{
  $color: string ,
  $selected: boolean
}>`
  border-radius: 100%;
  width: 1.5em;
  height: 1.5em;
  border: solid 0.1em white;
  background-color: ${({ $color }) => $color};
  outline: #f7dbe2 solid 0.1em;

  ${({ $selected }) => $selected && css`
    outline: solid 0.1em #76293d;
  `}
`;
