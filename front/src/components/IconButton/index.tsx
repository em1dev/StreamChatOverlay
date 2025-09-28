import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
}

const Button = styled.button`
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: inherit;
  padding: 0.2em;
  border-radius: 0.5em;

  background-color: transparent;

  &:hover {
    background-color: #FFD9DF;
  }
`;

export const IconButton = ({children, ...props}: IconButtonProps) => (
  <Button {...props}>
    {children}
  </Button>
);