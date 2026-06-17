import * as S from './styles';
import { useAuth } from '@/context/authContext/useAuth';
import { Icon } from '@iconify/react';
import { useSideMenuStore } from '@/store/sideMenuStore';

export const Header = () => {
  const { logOut, signIn, session } = useAuth();
  const isOpen = useSideMenuStore((s) => s.isOpen);
  const setIsOpen = useSideMenuStore((s) => s.setIsOpen);

  return (
    <S.Header>
      <S.Logo to='/'>Stream Chat Overlay</S.Logo>

      { session ?
        <S.MenuButton title='open menu' onClick={() => setIsOpen(!isOpen)}>
          <Icon fontSize='1.5em' aria-hidden icon={'mingcute:menu-fill'} />
        </S.MenuButton>
        : (
          <button onClick={signIn}>
            Log in
          </button>
        )
      }

      {session && (
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
