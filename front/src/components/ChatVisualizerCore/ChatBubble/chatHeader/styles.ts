import styled, { css } from 'styled-components';
import { THEME_USER_COLOR } from '@/themes/chatThemes';

export const Container = styled.div<{ $userColor: string, $direction: 'left' | 'right' }>`
  ${(props) => props.theme.chat.header.marginHorizontal && css`
    ${ props.$direction  === 'left' ? 'margin-left' : 'margin-right' } : ${props.theme.chat.header.marginHorizontal};
  `}

  ${(props) => props.theme.chat.headerOnTop && css`
    z-index: 1;
  `}

  margin-bottom: ${({ theme }) => theme.chat.header.marginBottom};

  display: flex;
  align-items: center;
  justify-content: end;

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
