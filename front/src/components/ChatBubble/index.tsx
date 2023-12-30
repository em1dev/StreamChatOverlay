import { useChatConfig } from "../../hooks/useChatConfig";
import { ChatMessageData } from "../../types";
import ChatMsgHeader from "./chatHeader";
import ChatMsgContent from "./chatMsgContent";
import * as S from './styles';

export interface ChatMsgProps extends ChatMessageData {
}

const ChatMsg = (props: ChatMsgProps) => {
  const config = useChatConfig();

  return (
    <S.Message direction={config.direction}>
      <ChatMsgHeader {...props} />
      <S.Content direction={config.direction}>
        <ChatMsgContent messageParts={props.contentParts} />
      </S.Content>
    </S.Message>
  )
};

export default ChatMsg;