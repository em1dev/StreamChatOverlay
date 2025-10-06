import { ChatMessageData } from '@/types';
import * as S from './styles';
import { useConfiguration } from '@/store/configuration';

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
}: ChatMsgHeaderProps) => {
  const showBadges = useConfiguration(c => c.userConfiguration.showChatterBadges);
  
  return (
    <S.Container $direction={direction} $userColor={color || 'black'}>
      { showBadges && badges.map((badge) => (
        <S.Badge height={18} width={18} src={badge.url} key={badge.id} alt={badge.id} />
      ))}

      { displayPronoun && (
        <S.Pronouns>({ displayPronoun })</S.Pronouns>
      )}

      <S.UserName>{ userDisplayName }</S.UserName>
    </S.Container>
  );
};

export default ChatMsgHeader;