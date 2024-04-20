import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type: 'add' | 'close',
}

const BaseButton = styled.button`
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CloseButton = styled(BaseButton)`
  padding: 0.2em;
  background-color: transparent;
  border-radius: 0.8em;

  &:hover {
    background-color: #822929;
  }
`;

const AddButton = styled(BaseButton)`
  border-radius: 50%;
  padding: 0.5em;
  background-color: #ECF67C;
  &:hover {
    background-color: #e9fa31;
  }
`;

export const IconButton = ({ type, ...props }: IconButtonProps) => {

  if (type === 'close') return (
    <CloseButton {...props}>
      <img width={20} height={20} src='img/close.svg'></img>
    </CloseButton>
  );

  return (
    <AddButton {...props}>
      <img width={20} height={20} src='img/add.svg'></img>
    </AddButton>
  );
};