import { useEffect, useState } from "react";
import { UserInformation } from "../../api/elpatoApi/types";
import Chat from "../../components/chat";
import { useTwitchChat } from "../../hooks/useTwitchChat";
import { BaseCSS } from "./styles";
import { ChatConfiguration } from "../../hooks/useChatConfig";

export interface ChatOverlay {
  userInformation: UserInformation
}

const ChatOverlay = ({ userInformation }: ChatOverlay) => {
  const { chatMessages } = useTwitchChat(userInformation);
  const [config, setConfig] = useState<ChatConfiguration | undefined>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search.replace('?', ''));
    const dir = searchParams.get('direction');
    setConfig({
      direction: dir === 'left' ? 'left' : 'right',
    } satisfies ChatConfiguration);
  }, []);

  return (
    <>
      <BaseCSS />
      <Chat msgs={chatMessages} config={config} />
    </>
  )
};

export default ChatOverlay;