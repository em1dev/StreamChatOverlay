import Chat from '..';
import { UserInformation } from '../../../api/elpatoApi/types';
import { useTwitchChat } from '../../../hooks/useTwitchChat/useTwitchChat';

export interface ChatWithTwitchProps {
  channelDetails: UserInformation
}

export const ChatWithTwitch = ({ channelDetails }: ChatWithTwitchProps) => {
  const { chatMessages } = useTwitchChat(channelDetails);

  return (
    <Chat msgs={chatMessages} />
  );
};