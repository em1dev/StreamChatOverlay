import { setChatSettingsJson } from '@/store/actions/chatActions';
import { ChatSettingsUpdateEvent } from '../events';

export const updateChatSettingsEventHandler = (event: ChatSettingsUpdateEvent) => {
  setChatSettingsJson(event.data.id, event.data.settingsJson);
};
