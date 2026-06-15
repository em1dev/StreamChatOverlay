import { ApiResponse } from '../ApiResponse';
import { Badge, Connection, CustomEmote, SecretResponse, YoutubeBroadcast } from './types';

const BASE_URL = import.meta.env.VITE_API_URL;
if (!BASE_URL) throw new Error('Missing VITE_API_URL in .env file');

const authLoginUrl = `${BASE_URL}/authenticate?redirectUrl=${location.origin}/auth`;
const connectionUrl = (type: Connection['type']) => `${BASE_URL}/connection/${type}/url?redirectUrl=${location.origin}/connect/${type}`;

const getEmotes = async (channelId: string,
  isBetterTTVEnabled: boolean,
  isFrankerTTEnabled: boolean,
  isSevenTVEnabled: boolean
):Promise<ApiResponse<Array<CustomEmote>>> => {
  return await fetchApi(`${BASE_URL}/${channelId}/emotes?betterTTV=${isBetterTTVEnabled}&frankerFace=${isFrankerTTEnabled}&sevenTV=${isSevenTVEnabled}`, 'GET');
};

const getChannelBadges = async (channelId: string):Promise<ApiResponse<Array<Badge>>> => (
  fetchApi(`${BASE_URL}/${channelId}/badges`, 'GET')
);

const authenticateWithCode = async (code: string) => {
  const redirectUrl = location.origin + '/auth';
  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      code,
      provider: 'twitch',
      redirectUrl: redirectUrl
    })
  });

  if (!resp.ok) return null;
  const data = await resp.json() as { token: string};
  return data;
};

const verifyToken = async (token: string) => {
  const resp = await fetchApi(`${BASE_URL}/token/verify`, 'POST', token);
  return resp.hasError != true;
};

const getUserSettings = (token: string) => {
  const resp = fetchApi<{
    id: number,
    userId: string,
    settingsJson: string,
    secretKey: string
  }>(`${BASE_URL}/settings`, 'GET', token);
  return resp;
};

const updateUserSettings = async (settings: string, changeId: string,  token:string) => {
  const body = {
    settingsJsonString: settings,
    changeId
  };
  return await fetchApi(`${BASE_URL}/settings`, 'POST', token, JSON.stringify(body));
};

const revokeSecret = async (token: string) => {
  return await fetchApi<{ secret: string }>(`${BASE_URL}/settings/secret`, 'DELETE', token);
};

const getConnectionDetailsFromSecret = async (userId: number, secret: string) =>
{
  const body = JSON.stringify({ userId, secret });
  return await fetchApi<SecretResponse>(`${BASE_URL}/secret`, 'POST', undefined, body);
};

const getConnections = async (token: string) => {
  return await fetchApi<Connection[]>(`${BASE_URL}/connection`, 'GET', token);
};

const deleteConnection = async (token: string, provider: 'twitch' | 'youtube') => {
  return await fetchApi(`${BASE_URL}/connection/${provider}`, 'DELETE', token);
};

const addNewConnection = async (token: string, provider: 'twitch' | 'youtube', code: string, redirectUrl: string) => {
  const body = JSON.stringify({
    code,
    redirectUrl
  });
  return await fetchApi(`${BASE_URL}/connection/${provider}`, 'POST', token, body);
};

const getYoutubeBroadcast = async (secret: string, userId: number) => {
  const body = JSON.stringify({ userId, secret });
  return await fetchApi<YoutubeBroadcast>(`${BASE_URL}/secret/youtubeBroadcast`, 'POST', undefined, body);
};

const fetchApi = async <T>(url:string, method: string, token?: string, body?: string):Promise<ApiResponse<T>> => {
  const headers = new Headers({
    'content-type': 'application/json',
  }) ;

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const resp = await fetch(url, { headers, method, body });
  if (!resp.ok) {
    return {
      status: resp.status,
      hasError: true,
    };
  }

  try {
    return {
      data: await resp.json(),
      status: resp.status
    };
  } catch {
    return {
      data: null as T,
      status: resp.status
    };
  }
};

export const chatApi = {
  getChannelBadges,
  getEmotes,
  authenticateWithCode,
  verifyToken,
  authLoginUrl,
  connectionUrl,
  getUserSettings,
  updateUserSettings,
  revokeSecret,
  getConnectionDetailsFromSecret,
  getConnections,
  deleteConnection,
  addNewConnection,
  getYoutubeBroadcast
};
