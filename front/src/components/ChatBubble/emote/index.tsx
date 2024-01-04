import styled from 'styled-components';
import { CustomEmote } from '../../../api/elpatoApi/types';

export interface EmoteProps {
  id: string,
  customEmote?: CustomEmote,
  scale?: 1 | 2 | 3
}

const getEmoteUrl = (id:string, format = "default", theme: "dark" | 'light' = "dark", scale: '1.0' | '2.0' | '3.0' = "3.0") => {
  return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`;
};

const EmoteContainer = styled.img`
  //width: 28px;
  //height: 28px;
  border-radius: 0.5em;
  margin: 0.1em;
  vertical-align: middle;
  position: relative;
  top: -5px;
`;

const Emote = ({ id, customEmote, scale = 1 } : EmoteProps) => {
  return <EmoteContainer src={customEmote?.[`url${scale}x`] ?? getEmoteUrl(id, undefined, undefined, `${scale}.0`)} />
};

export default Emote;