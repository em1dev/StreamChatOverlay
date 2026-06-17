import { NavLink } from 'react-router';
import * as S from './styles';
import { useAuth } from '@/context/authContext/useAuth';

export const Header = () => {
  const { logOut, signIn, session } = useAuth();

  return (
    <S.Header>
      <div>
        <NavLink to='/'>Stream Chat Overlay</NavLink>
      </div>
      {session ? (
        <S.ProfileDetailsContainer>
          <div>{session.user.provider.displayName}</div>
          <img width={50} height={50} src={session.user.provider.profileImageUrl} />
          <button onClick={logOut}>
            Log Out
          </button>
        </S.ProfileDetailsContainer>
        ) : (
        <button onClick={signIn}>
          Log in
        </button>
      )}
    </S.Header>
  );
};
