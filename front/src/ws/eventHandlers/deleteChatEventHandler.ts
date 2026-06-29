import { ChatDeleteEvent } from '../events';
import { removeChat } from '@/store/actions/chatActions';

export const deleteChatEventHandler = (event: ChatDeleteEvent) => {
  removeChat(event.data.id);
};
