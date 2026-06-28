import { chatApiClient } from './chatApiClient';
import { Chat } from './types';

const getChat = (token: string) => (
  chatApiClient.fetch<Chat[]>('chat', 'GET', token)
);

const createChat = (token: string, name: string) => (
  chatApiClient.fetch<Chat>('chat', 'POST', token, JSON.stringify({
    name
  }))
);

const deleteChat = (token: string, id: number) => (
  chatApiClient.fetch<Chat>(`chat/${id}`, 'DELETE', token)
);

const updateChatName = async (
  id: number, name: string, token: string
) => {
  const body = {
    name
  };
  return await chatApiClient.fetch(
    `chat/${id}`, 'PATCH', token, JSON.stringify(body)
  );
};

const updateChatSettings = async (
  id: number, settings: string, changeId: string, token: string
) => {
  const body = {
    settingsJson: settings,
    changeId
  };
  return await chatApiClient.fetch(
    `chat/${id}`, 'PATCH', token, JSON.stringify(body)
  );
};

export const internalChatApi = {
  getChat,
  createChat,
  deleteChat,
  updateChatName,
  updateChatSettings
};
