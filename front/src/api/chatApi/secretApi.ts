import { chatApiClient } from './chatApiClient';

const getSecret = async (chatId: number, token: string) => (
  await chatApiClient.fetch<{ secret: string }>(
    `chat/${chatId}/secret`, 'GET', token
  )
);

const revokeSecret = async (chatId: number, token: string) => (
  await chatApiClient.fetch<{ secret: string }>(
    `chat/${chatId}/secret/revoke`, 'DELETE', token
  )
);

export const secretApi = {
  getSecret,
  revokeSecret
};
