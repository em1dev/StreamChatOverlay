import { ChatMessageData } from '../../../types';
import * as S from './styles';

const ChatMsgHeader = ({ badges, displayPronoun, color, userDisplayName }: ChatMessageData) => (
  <S.Container $userColor={color || 'black'}>
    { badges.map((badge) => (
      <S.Badge height={18} width={18} src={badge.url} key={badge.id} alt={badge.id} />
    ))}

    { displayPronoun && (
      <S.Pronouns>({ displayPronoun })</S.Pronouns>
    )}

    <S.UserName>{ userDisplayName }</S.UserName>
  </S.Container>
);

export default ChatMsgHeader;