import { Icon } from '@iconify/react';
import { useStore } from '@/store';
import { setIsSideMenuOpen } from '@/store/actions/pageActions';
import { logOut, signIn } from '@/store/actions/authActions';
import * as S from './styles';

export const Header = () => {
  const { session, isLoadingSession } = useStore();

  return (
    <S.Header>
      <S.Logo to='/'>Stream Chat Overlay</S.Logo>

      { session ?
        <S.MenuButton title='open menu' onClick={() => setIsSideMenuOpen((isOpen) => !isOpen)}>
          <Icon fontSize='1.5em' aria-hidden icon={'mingcute:menu-fill'} />
        </S.MenuButton>
        : (
          <button disabled={isLoadingSession} onClick={signIn}>
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
