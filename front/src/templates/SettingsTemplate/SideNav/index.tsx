import { Icon } from '@iconify/react';
import * as S from './styles';
import { NavLink } from 'react-router';

export const SideNav = () =>
  (
    <S.NavContainer>
      <NavLink end to='/add-to-stream' >
        <Icon aria-hidden icon="mingcute:live-line" />
        Add to stream 
      </NavLink>
      <NavLink end to='/settings' >
        <Icon aria-hidden icon="mingcute:settings-3-line" />
        Basic Settings
      </NavLink>
      <NavLink end to='/settings/tts' >
        <Icon aria-hidden icon="mingcute:announcement-line" />
        Text to speech
      </NavLink>
      <NavLink end to='/settings/advance' >
        <Icon aria-hidden icon="mingcute:tool-line" />
        Advance settings
      </NavLink>
      <NavLink end to='/settings/custom-theme' >
        <Icon aria-hidden icon="mingcute:palette-line" />
        Custom theme
      </NavLink>
    </S.NavContainer>
  );