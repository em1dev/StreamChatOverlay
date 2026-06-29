import { setChatName } from '@/store/actions/chatActions';
import { ChatRenameEvent } from '../events';

export const renameChatEventHandler = (event: ChatRenameEvent) => {
  setChatName(event.data.id, event.data.name);
};
