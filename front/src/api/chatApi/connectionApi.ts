import { BASE_URL, chatApiClient } from './chatApiClient';
import { Connection, SecretResponse } from './types';


const connectionUrl = (type: Connection['type']) =>
  `${BASE_URL}/connection/${type}/url?redirectUrl=${location.origin}/connect/${type}`;

const getConnectionDetailsFromSecret = async (userId: number, secret: string) =>
{
  const body = JSON.stringify({ userId, secret });
  return await chatApiClient.fetch<SecretResponse>(
    'secret', 'POST', undefined, body
  );
};

const getConnections = async (token: string) => (
  await chatApiClient.fetch<Connection[]>(
    'connection', 'GET', token
  )
);

const deleteConnection = async (token: string, provider: 'twitch' | 'youtube') => (
  await chatApiClient.fetch(
    `connection/${provider}`, 'DELETE', token
  )
);

const addNewConnection = async (token: string, provider: 'twitch' | 'youtube', code: string, redirectUrl: string) => {
  const body = JSON.stringify({
    code,
    redirectUrl
  });
  return await chatApiClient.fetch(
    `connection/${provider}`, 'POST', token, body
  );
};

export const connectionApi = {
  addNewConnection,
  deleteConnection,
  getConnections,
  getConnectionDetailsFromSecret,
  connectionUrl
};
