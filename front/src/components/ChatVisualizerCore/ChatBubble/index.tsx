import { ChatMessageData } from '@/types';
import ChatMsgHeader from './chatHeader';
import ChatMsgContent from './chatMsgContent';
import { ChatSettings } from '@/types/settingsTypes';

import * as S from './styles';


export interface ChatMsgProps {
  showBadges: boolean,
  headerOrdering: ChatSettings['headerOrdering'],
  chatDirection: ChatSettings['chatDirection'],
  message: ChatMessageData
}

const ChatMsg = ({
  showBadges, headerOrdering, chatDirection, message
}: ChatMsgProps) => (
  <S.Message $direction={chatDirection}>
    <ChatMsgHeader
      direction={chatDirection}
      messageData={message}
      headerOrdering={headerOrdering}
      showBadges={showBadges}
    />
    <S.Content $userColor={message.color ?? 'black'} $effect={message.effect} $direction={chatDirection}>
      <ChatMsgContent userColor={message.color} messageParts={message.messageParts} />
    </S.Content>
  </S.Message>
);

export default ChatMsg;
