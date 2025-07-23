import { ChatMessageData } from '../../../types';
import * as S from './styles';

export interface ChatMsgHeaderProps
{
  messageData: ChatMessageData,
  direction: 'left' | 'right'
}

const ChatMsgHeader = ({ 
  direction,
  messageData: {
    badges,
    color,
    displayPronoun,
    userDisplayName
  }
}: ChatMsgHeaderProps) => (
  <S.Container $direction={direction} $userColor={color || 'black'}>
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