import styled, { css } from 'styled-components';
import { THEME_USER_COLOR } from '../../../themes/mainTheme';

export const Container = styled.div<{ $userColor: string, $direction: 'left' | 'right' }>`
  ${(props) => props.theme.chat.header.marginHorizontal && css`
    ${ props.$direction  === 'left' ? 'margin-left' : 'margin-right' } : ${props.theme.chat.header.marginHorizontal};
  `}

  margin-bottom: -8px;

  display: flex;
  align-items: center;
  justify-content: end;
  min-height: 40px;

  gap: 0.5em;

  background-color: ${(props) => props.theme.chat.header.bg.replace(THEME_USER_COLOR, props.$userColor)};
  color: ${(props) => props.theme.chat.header.text.replace(THEME_USER_COLOR, props.$userColor)};

  ${(props) => props.theme.chat.header.textShadow && css`
    text-shadow: ${props.theme.chat.header.textShadow.replace(THEME_USER_COLOR, props.$userColor)};
  `}

  ${(props) => props.theme.chat.header.boxShadow && css`
    box-shadow: ${props.theme.chat.header.boxShadow};
  `}

  border: ${(props) => props.theme.chat.header.border.replace(THEME_USER_COLOR, props.$userColor)};

  border-radius: ${(props) => props.theme.chat.header.borderRadius};
  padding: ${(props) => props.theme.chat.header.padding};

  font-weight: ${(props) => props.theme.chat.header.fontWeight};
  font-size: ${(props) => props.theme.chat.header.fontSize};
`;

export const Badge = styled.img`
  //margin: 0 0.2em;
`;

export const Pronouns = styled.div`
  //margin: 0 0.5ch;
`;

export const UserName = styled.div`
`;