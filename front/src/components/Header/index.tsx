import { useAuth, signIn, logOut } from '@/store/authStore';
import { setIsSideMenuOpen } from '@/store/sideMenuStore';
import { Icon } from '@iconify/react';
import * as S from './styles';

export const Header = () => {
  const { session, isLoading } = useAuth();

  return (
    <S.Header>
      <S.Logo to='/'>Stream Chat Overlay</S.Logo>

      { session ?
        <S.MenuButton title='open menu' onClick={() => setIsSideMenuOpen((isOpen) => !isOpen)}>
          <Icon fontSize='1.5em' aria-hidden icon={'mingcute:menu-fill'} />
        </S.MenuButton>
        : (
          <button disabled={isLoading} onClick={signIn}>
            Log in
          </button>
        )
      }

      { session && (
        <S.ProfileDetailsContainer>
          <div>
            <span>{session.user.provider.displayName}</span>
            <button onClick={logOut}>Log Out</button>
          </div>
          <img alt='profile' width={50} height={50} src={session.user.provider.profileImageUrl} />
        </S.ProfileDetailsContainer>
      )}
    </S.Header>
  );
};
