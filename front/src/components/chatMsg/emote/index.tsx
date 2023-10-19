import styled from 'styled-components';

export interface EmoteProps {
  id: string
}

const getEmoteUrl = (id:string, format = "default", theme: "dark" | 'light' = "dark", scale: '1.0' | '2.0' | '3.0' = "3.0") => {
  return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`;
};

const EmoteContainer = styled.img`
  width: 28px;
  height: 28px;
  margin: 0 0.1em;
  vertical-align: middle;
  position: relative;
  top: -5px;
`;

const Emote = ({ id } : EmoteProps) => {
  return <EmoteContainer src={`${getEmoteUrl(id)}`} />
};

export default Emote;