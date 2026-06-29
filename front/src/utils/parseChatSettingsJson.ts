import { Chat } from '@/api/chatApi/types';
import { defaultChatSettings } from '@/store/defaultChatSettings';
import { ChatSettings } from '@/types/settingsTypes';

export const parseChatSettingsJson = (chat: Chat) => {
  const jsonString = chat.settingsJson;
  if (jsonString.length == 0) return defaultChatSettings;
  return JSON.parse(jsonString) as ChatSettings;
};
