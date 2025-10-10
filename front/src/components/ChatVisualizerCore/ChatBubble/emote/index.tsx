import styled, { css } from 'styled-components';
import { CustomEmote } from '@/api/chatApi/types';

export interface EmoteProps {
  id: string,
  customEmote?: CustomEmote,
  // sm - font size
  // md - bigger than font size
  // lg - big emote
  size: 'sm' | 'md' | 'lg',
  alignCorrection?: boolean
}

const getEmoteUrl = (
  id:string,
  format = 'default',
  theme: 'dark' | 'light' = 'dark',
  resolution: '1.0' | '2.0' | '3.0' = '3.0'
) => {
  return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${resolution}`;
};

const EmoteContainer = styled.img<{ 
  $alignCorrection?: boolean,
  $size: 'sm' | 'md' | 'lg'
}>`
  display: inline-block;
  border-radius: 0.5em;
  margin: 0.1em;
  vertical-align: middle;
  position: relative;
  ${props => props.$alignCorrection && css`
    margin-top: 8px;
    top: -5px;
  `}

  ${({ $size }) => $size == 'sm' && css`
    height: 2.5em;
  `}

  ${({ $size }) => $size == 'md' && css`
    height: 5em;
  `}

  ${({ $size }) => $size == 'lg' && css`
    height: 10em;
  `}
`;

const Emote = ({ id, customEmote, alignCorrection, size } : EmoteProps) => (
  <EmoteContainer
    $size={size}
    $alignCorrection={alignCorrection}
    src={customEmote?.['url3x'] ?? getEmoteUrl(id, undefined, undefined, '3.0')}
  />
);

export default Emote;