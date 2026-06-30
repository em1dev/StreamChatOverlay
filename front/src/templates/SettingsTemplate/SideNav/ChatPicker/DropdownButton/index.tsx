import { Icon } from '@iconify/react';
import * as S from './styles';


export interface DropdownButtonProps {
  isOpen: boolean,
  label: string,
  onClick: () => void
}

export const DropdownButton = ({ label, isOpen, onClick }: DropdownButtonProps) => (
  <S.Select $isOpen={isOpen} onClick={onClick}>
    <Icon aria-hidden icon="mingcute:chat-1-line" />
    <span>
      {label}
    </span>
    <Icon aria-hidden icon="mingcute:selector-vertical-line" />
  </S.Select>
);
