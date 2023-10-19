import Chat from "../../components/chat";
import { useTwitchChat } from "../../hooks/useTwitchChat";

export interface ChatOverlay {
  channelId: string
}

const ChatOverlay = ({ channelId }: ChatOverlay) => {
  const { chatMessages } = useTwitchChat(channelId);

  return (
    <Chat msgs={chatMessages} />
  )
};

export default ChatOverlay;