import { ChatMessageData } from '@/types';
import { ChatMessageHeaderType, UserConfiguration } from '@/types/userConfigurationTypes';

import * as S from './styles';


export interface ChatMsgHeaderProps
{
  messageData: ChatMessageData,
  direction: 'left' | 'right',
  showBadges: boolean,
  headerOrdering: UserConfiguration['headerOrdering']
}

const ChatMsgHeader = ({
  direction,
  messageData,
  headerOrdering,
  showBadges
}: ChatMsgHeaderProps) => (
  <S.Container $direction={direction} $userColor={messageData.color || 'black'}>
    {
      headerOrdering
        .filter(type => showBadges || type != 'badges')
        .map(type => (
          <ChatMsgHeaderPart
            key={type}
            type={type}
            messageData={messageData}
          />
        ))
    }
  </S.Container>
);

const ChatMsgHeaderPart = ({
  messageData,
  type,
}: {
  type: ChatMessageHeaderType
  messageData: ChatMessageData,
}) => {
  switch(type)
  {
    case 'badges':
      return messageData.badges.map((badge) => (
        <img src={badge.url} key={badge.id} alt={badge.id} />
      ));
    case 'name':
      return <div>{ messageData.userDisplayName }</div>;
    case 'pronouns':
      return messageData.displayPronoun ? (
        <div>({ messageData.displayPronoun })</div>
      ) : null;
  }
};

export default ChatMsgHeader;
