import { Icon } from '@iconify/react';
import * as S from './styles';
import { NavLink } from 'react-router';
import { Divider } from '@/components/Divider';
import { useSideMenuStore } from '@/store/sideMenuStore';
import { useCallback } from 'react';
import { useAuth } from '@/context/authContext/useAuth';

export const SideNav = () =>
{
  const { session, logOut } = useAuth();
  const isOpen = useSideMenuStore(s => s.isOpen);
  const setIsOpen = useSideMenuStore(s => s.setIsOpen);

  const onNavigation = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <S.NavContainer $isOpen={isOpen}>
      <S.NavHeader>
        { session && (
          <div>
            <img alt='profile' width={50} height={50} src={session.user.provider.profileImageUrl} />
            <div>{session.user.provider.displayName}</div>
          </div>
        )}

        <button title='close nav' onClick={() => setIsOpen(false)}>
          <Icon fontSize='2em' icon="mingcute:close-medium-fill" />
        </button>
      </S.NavHeader>

      <NavLink onClick={onNavigation} end to='/settings/add-to-stream' >
        <Icon aria-hidden icon="mingcute:live-line" />
        Add to stream
      </NavLink>
      <NavLink onClick={onNavigation} end to='/settings/connections' >
        <Icon aria-hidden icon="mingcute:link-2-line" />
        Connect to service
      </NavLink>
      <NavLink onClick={onNavigation} end to='/settings' >
        <Icon aria-hidden icon="mingcute:settings-3-line" />
        Basic Settings
      </NavLink>
      <NavLink onClick={onNavigation} end to='/settings/tts' >
        <Icon aria-hidden icon="mingcute:announcement-line" />
        Text to speech
      </NavLink>
      {/*
      <NavLink end to='/settings/advance-settings' >
        <Icon aria-hidden icon="mingcute:tool-line" />
        Advance settings
      </NavLink>
      */}
      <NavLink onClick={onNavigation} end to='/settings/custom-theme' >
        <Icon aria-hidden icon="mingcute:palette-line" />
        Custom theme
      </NavLink>

      <Divider />

      <NavLink
        data-umami-event='outbound link'
        data-umami-event-url='https://ko-fi.com/emydev'
        data-umami-event-from='side nav'
        onClick={onNavigation}
        end
        target='_blank'
        to='https://ko-fi.com/emydev'
      >
        <Icon aria-hidden icon="simple-icons:kofi" />
        Support Me :3
      </NavLink>

      <NavLink
        data-umami-event='outbound link'
        data-umami-event-url='https://github.com/em1dev/streamchatoverlay'
        data-umami-event-from='side nav'
        onClick={onNavigation}
        end
        target='_blank'
        to='https://github.com/em1dev/StreamChatOverlay'
      >
        <Icon aria-hidden icon="mingcute:github-line" />
        Github
      </NavLink>

      <S.BottomSection>

        <Divider />

        {session ? (
          <button onClick={logOut}>
            <Icon aria-hidden icon="mingcute:exit-line" />
            Log Out
          </button>
        ) : (
          <button>Log In</button>
        )}
      </S.BottomSection>

    </S.NavContainer>
  );
};
