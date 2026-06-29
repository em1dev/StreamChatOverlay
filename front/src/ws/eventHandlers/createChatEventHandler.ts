import { ChatCreateEvent } from '../events';
import { Chat } from '@/api/chatApi/types';
import { addChat } from '@/store/actions/chatActions';

export const createChatEventHandler = (event: ChatCreateEvent) => {
  const newChat: Chat = {
    id: event.data.id,
    name: event.data.name,
    settingsJson: event.data.settingsJson
  };

  addChat(newChat);
};
