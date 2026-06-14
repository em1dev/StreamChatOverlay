import { Icon } from '@iconify/react';
import * as S from './styles';
import { NavLink } from 'react-router';
import { Divider } from '@/components/Divider';

export const SideNav = () =>
(
  <S.NavContainer>
    <NavLink end to='/settings/add-to-stream' >
      <Icon aria-hidden icon="mingcute:live-line" />
      Add to stream
    </NavLink>
    <NavLink end to='/settings/connections' >
      <Icon aria-hidden icon="mingcute:link-2-line" />
      Connect to service
    </NavLink>
    <NavLink end to='/settings' >
      <Icon aria-hidden icon="mingcute:settings-3-line" />
      Basic Settings
    </NavLink>
    <NavLink end to='/settings/tts' >
      <Icon aria-hidden icon="mingcute:announcement-line" />
      Text to speech
    </NavLink>
    {/*
      <NavLink end to='/settings/advance-settings' >
        <Icon aria-hidden icon="mingcute:tool-line" />
        Advance settings
      </NavLink>
      */}
    <NavLink end to='/settings/custom-theme' >
      <Icon aria-hidden icon="mingcute:palette-line" />
      Custom theme
    </NavLink>

    <Divider />

    <NavLink end target='_blank' to='https://ko-fi.com/emydev' >
      <Icon aria-hidden icon="simple-icons:kofi" />
      Support Me :3
    </NavLink>

    <NavLink end target='_blank' to='https://github.com/em1dev/StreamChatOverlay' >
      <Icon aria-hidden icon="mingcute:github-line" />
      Github
    </NavLink>

  </S.NavContainer>
);
