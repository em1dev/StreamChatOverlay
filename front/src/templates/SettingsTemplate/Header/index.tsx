import { NavLink } from 'react-router';
import * as S from './styles';
import { useAuth } from '@/authContext/useAuth';

export const Header = () => {
  const { logOut, session } = useAuth();
  
  if (!session) return;

  return (
    <S.Header>
      <div>
        <NavLink to='/'>Stream Chat Overlay</NavLink>
      </div>
      <S.ProfileDetailsContainer>
        <div>{session.user.provider.displayName}</div>
        <img width={50} height={50} src={session.user.provider.profileImageUrl} />
        <button onClick={logOut}>
          Log Out
        </button>
      </S.ProfileDetailsContainer>
    </S.Header>
  );
};