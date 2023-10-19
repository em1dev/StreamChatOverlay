import { ChatMessageData } from "../../types";
import ChatMsgHeader from "./chatHeader";
import ChatMsgContent from "./chatMsgContent";
import * as S from './styles';

export interface ChatMsgProps extends ChatMessageData {
}

const ChatMsg = (props: ChatMsgProps) => {
  return (
    <S.Message>
      <ChatMsgHeader {...props} />
      <S.Content>
        <ChatMsgContent {...props} />
      </S.Content>
    </S.Message>
  )
};

export default ChatMsg;