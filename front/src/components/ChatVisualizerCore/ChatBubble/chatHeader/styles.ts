import { THEME_USER_COLOR } from '@/themes/chatThemeVariables';
import styled, { css } from 'styled-components';

export const Container = styled.div<{ $userColor: string, $direction: 'left' | 'right' }>`
  ${(props) => props.theme.chat.header.marginHorizontal && css`
    ${ props.$direction  === 'left' ? 'margin-left' : 'margin-right' } : ${props.theme.chat.header.marginHorizontal};
  `}

  ${(props) => props.theme.chat.headerOnTop && css`
    z-index: 1;
  `}


  ${(props) => props.theme.chat.header.rotation != undefined && css`
    rotate: ${props.$direction == 'left' ? '-' : ''}${props.theme.chat.header.rotation}deg;
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

  > img {
    height: 1.5em;
    width: auto;
  }

  ${({ theme }) => theme.chat.fillContainer && css` 
    width: 100%;
    justify-content: center;
  `}
`;
