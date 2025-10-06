import * as S from './styles';
import { Icon } from '@iconify/react';

export interface ToggleInputProps
{
  isChecked: boolean,
  onChange: (value:boolean) => void,
  children: React.ReactNode
}

export const ToggleInput = ({ isChecked, onChange, children }: ToggleInputProps) => (
  <S.Label>
    <input
      hidden
      type='checkbox'
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
    />
    {isChecked ? 
      <Icon aria-hidden icon="mingcute:toggle-right-fill" />
      :
      <Icon aria-hidden icon="mingcute:toggle-left-line" />
    }
    {children}
  </S.Label>
);