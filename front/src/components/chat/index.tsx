import { ChatMessageData } from "../../types";
import ChatMsg from "../chatMsg";
import * as S from './styles';

export interface ChatProps {
  msgs: Array<ChatMessageData>,
}

const Chat = ({ msgs }: ChatProps) => {
  return (
    <S.Container>
      {msgs.map((msg) => (
        <ChatMsg key={ msg.id } {...msg}   />
      ))}
    </S.Container>
  );
}

export default Chat;