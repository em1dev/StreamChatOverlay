import { Chat } from '@/api/chatApi/types';
import { defaultChatSettings } from '@/store/defaultChatSettings';
import { ChatSettings } from '@/types/settingsTypes';

export const parseChatSettingsJson = (chat: Chat):ChatSettings => {
  const jsonString = chat.settingsJson;
  if (jsonString.length == 0) return defaultChatSettings;
  const parsedSettings = JSON.parse(jsonString) as ChatSettings;

  // deconstruct in case we add more values later and the stored config is outdated
  return {
    ...defaultChatSettings,
    ...parsedSettings,
    ttsConfiguration: {
      ...defaultChatSettings.ttsConfiguration,
      ...parsedSettings.ttsConfiguration
    },
  };
};
