import { useConfiguration } from '../../../store/configuration';
import { ChatMessageData } from '@/types';
import ChatMsgHeader from './chatHeader';
import ChatMsgContent from './chatMsgContent';
import * as S from './styles';
import { FontMap } from '@/fonts/ChatFonts';

export interface ChatMsgProps extends ChatMessageData {
}

const ChatMsg = (props: ChatMsgProps) => {
  const chatDirection = useConfiguration(state => state.userConfiguration.chatDirection);
  const fontKey = useConfiguration(state => state.userConfiguration.chatFont) || 'poppins';
  const { overrideWeight } = FontMap[fontKey];

  return (
    <S.Message $direction={chatDirection}>
      <ChatMsgHeader direction={chatDirection} messageData={props} />
      <S.Content $overrideFontWeight={overrideWeight} $userColor={props.color ?? 'black'} $effect={props.effect} $direction={chatDirection}>
        <ChatMsgContent userColor={props.color} messageParts={props.messageParts} />
      </S.Content>
    </S.Message>
  );
};

export default ChatMsg;