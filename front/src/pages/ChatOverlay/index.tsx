import { UserInformation } from '../../api/elpatoApi/types';
import Chat from '../../components/chat';
import { useTwitchChat } from '../../hooks/useTwitchChat/useTwitchChat';
import { BaseCSS } from './styles';

export interface ChatOverlay {
  userInformation: UserInformation
}

const ChatOverlay = ({ userInformation }: ChatOverlay) => {
  const { chatMessages } = useTwitchChat(userInformation);

  return (
    <>
      <BaseCSS />
      <Chat msgs={chatMessages} />
    </>
  );
};

export default ChatOverlay;