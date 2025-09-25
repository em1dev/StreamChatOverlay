import styled, { css } from 'styled-components';
import { THEME_USER_COLOR } from '../../../themes/mainTheme';

export const ContentExtras = styled.span<{ $userColor: string }>`
  color: ${(props) => props.theme.chat.content.mention.text};
  background-color: ${(props) => props.theme.chat.content.mention.bg};
  border-radius: ${(props) => props.theme.chat.content.mention.borderRadius};
  border: ${(props) => props.theme.chat.content.mention.border};
  padding: ${(props) => props.theme.chat.content.mention.padding};

  ${(props) => props.theme.chat.content.mention.textShadow && css`
    text-shadow: ${props.theme.chat.content.mention.textShadow.replace(THEME_USER_COLOR, props.$userColor)};
  `}

  ${(props) => props.theme.chat.content.mention.boxShadow && css`
    box-shadow: ${props.theme.chat.content.mention.boxShadow};
  `}

  display: inline-block;
  + * {
    margin-left: 0.3em;
  }
`;

export const Reply = styled(ContentExtras)`
  color: ${(props) => props.theme.chat.content.reply.text};
  background-color: ${(props) => props.theme.chat.content.reply.bg};
  border-radius: ${(props) => props.theme.chat.content.reply.borderRadius};
  border: ${(props) => props.theme.chat.content.reply.border};
  padding: ${(props) => props.theme.chat.content.reply.padding};

  ${(props) => props.theme.chat.content.reply.textShadow && css`
    text-shadow: ${props.theme.chat.content.reply.textShadow.replace(THEME_USER_COLOR, props.$userColor)};
  `}

  ${(props) => props.theme.chat.content.reply.boxShadow && css`
    box-shadow: ${props.theme.chat.content.reply.boxShadow};
  `}
`;

export const Redemption = styled(ContentExtras)`
  display: block;

  color: ${(props) => props.theme.chat.content.reward.text};
  background-color: ${(props) => props.theme.chat.content.reward.bg};
  border-radius: ${(props) => props.theme.chat.content.reward.borderRadius};
  border: ${(props) => props.theme.chat.content.reward.border};
  padding: ${(props) => props.theme.chat.content.reward.padding};

  ${(props) => props.theme.chat.content.reward.textShadow && css`
    text-shadow: ${props.theme.chat.content.reward.textShadow.replace(THEME_USER_COLOR, props.$userColor)};
  `}

  ${(props) => props.theme.chat.content.reward.boxShadow && css`
    box-shadow: ${props.theme.chat.content.reward.boxShadow};
  `}
`;