import { NavLink } from 'react-router';
import * as S from './styles';

export const Footer = () => (
  <S.Container>
    <NavLink end to='/privacy'>Privacy</NavLink>
    <NavLink end to='/terms'>Terms of Service</NavLink>
    <NavLink target='_blank' to='https://ko-fi.com/emydev'>
      Support me 💖
    </NavLink>
    <NavLink target='_blank' to='https://github.com/em1dev/streamchatoverlay'>
      Source Code
    </NavLink>
  </S.Container>
);
