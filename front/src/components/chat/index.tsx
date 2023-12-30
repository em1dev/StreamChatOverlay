import { ChatConfiguration, ChatConfigurationProvider, defaultChatConfiguration } from "../../hooks/useChatConfig";
import { ChatMessageData } from "../../types";
import ChatMsg from "../ChatBubble";
import * as S from './styles';

export interface ChatProps {
  msgs: Array<ChatMessageData>,
  config?: ChatConfiguration
}

const Chat = ({ msgs, config = defaultChatConfiguration }: ChatProps) => {
  return (
    <ChatConfigurationProvider config={config}>
      <S.Container direction={config.direction}>
        {msgs.map((msg) => (
          <ChatMsg key={ msg.id } {...msg}   />
        ))}
      </S.Container>
    </ChatConfigurationProvider>
  );
}

export default Chat;