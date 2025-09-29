import { ApiResponse } from '../ApiResponse';
import { Badge, CustomEmote } from './types';

const BASE_URL = import.meta.env.VITE_API_URL;
if (!BASE_URL) throw new Error('Missing VITE_API_URL in .env file');

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
  return resp.hasError == true;
};

const getAuthLoginUrl = async () => {
  const redirectTo = location.origin + '/auth';
  const resp = await fetchApi<{ url: string }>(`${BASE_URL}/auth/url?redirectUrl=${redirectTo}`, 'GET');
  if (resp.data){
    return resp.data.url;
  }
};

const fetchApi = async <T>(url:string, method: string, token?: string):Promise<ApiResponse<T>> => {
  const headers = new Headers({
    'content-type': 'application/json',
  }) ;

  if (token) {
    headers.append('Authorization', token);
  }

  const resp = await fetch(url, { headers, method });
  if (!resp.ok) {
    return {
      status: resp.status,
      hasError: true,
    };
  }

  const data = await resp.json() as T;
  return { data, status: resp.status };
};

export const chatApi = {
  getChannelBadges,
  getEmotes,
  authenticateWithCode,
  verifyToken,
  getAuthLoginUrl
};