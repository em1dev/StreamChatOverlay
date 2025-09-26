import { NavLink } from 'react-router';
import * as S from './styles';

export const Header = () => (
  <S.Header>
    <div>
      <NavLink to='/'>Stream Chat Overlay</NavLink>
    </div>
    <div>
      <NavLink to='/'>Log Out</NavLink>
    </div>
  </S.Header>
);