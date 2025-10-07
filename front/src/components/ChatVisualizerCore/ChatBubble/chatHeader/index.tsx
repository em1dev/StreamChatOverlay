import { ChatMessageData } from '@/types';
import * as S from './styles';
import { useConfiguration } from '@/store/configuration';
import { ChatMessageHeaderType } from '@/types/userConfigurationTypes';

export interface ChatMsgHeaderProps
{
  messageData: ChatMessageData,
  direction: 'left' | 'right'
}

const ChatMsgHeader = ({ 
  direction,
  messageData
}: ChatMsgHeaderProps) => {
  const headerOrdering = useConfiguration(c => c.userConfiguration.headerOrdering);

  return (
    <S.Container $direction={direction} $userColor={messageData.color || 'black'}>
      {headerOrdering.map(type => (
        <ChatMsgHeaderPart key={type} type={type} messageData={messageData} />
      ))}
    </S.Container>
  );
};

const ChatMsgHeaderPart = ({ 
  messageData,
  type
}: {
  type: ChatMessageHeaderType
  messageData: ChatMessageData
}) => {
  const showBadges = useConfiguration(c => c.userConfiguration.showChatterBadges);

  switch(type)
  {
    case 'badges':
      return showBadges ? messageData.badges.map((badge) => (
        <img height={18} width={18} src={badge.url} key={badge.id} alt={badge.id} />
      )) : null;
    case 'name':
      return <div>{ messageData.userDisplayName }</div>;
    case 'pronouns':
      return messageData.displayPronoun ? (
        <div>({ messageData.displayPronoun })</div>
      ) : null;
  }
};

export default ChatMsgHeader;