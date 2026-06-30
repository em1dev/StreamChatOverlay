import * as S from './styles';

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

    <S.Switch $on={isChecked} />

    {children}
  </S.Label>
);
