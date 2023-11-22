import { ApiParams, ApiResponse, TwitchAuthResponse, TwitchBadgeResponse, UserInformationResponse } from "../types";
import 'dotenv/config';

const TWITCH_AUTH_URL = 'https://id.twitch.tv/oauth2/token';
const HELIX_BASE_URL = 'https://api.twitch.tv/helix/';
const CLIENT_ID = process.env['CLIENT_ID'];
const CLIENT_SECRET = process.env['CLIENT_SECRET'];

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('Missing env variables');
}

const getAppToken = async () => (
  await callApi<TwitchAuthResponse>({ 
    url: TWITCH_AUTH_URL,
    method: 'POST',
    body: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
      claims: '',
    }
  })
);

const getChannelBadges = async (channelId:string, appToken: string) => {
  const url = HELIX_BASE_URL + 'chat/badges'; 
  return await callApi<TwitchBadgeResponse>({
    url,
    params: {
      broadcaster_id: channelId
    },
    token: appToken
  });
};

const getGlobalBadges = async (appToken: string) => {
  const url = HELIX_BASE_URL + 'chat/badges/global'; 
  return await callApi<TwitchBadgeResponse>({
    url,
    token: appToken
  }); 
}

const getUserInformation = async (channelName: string, appToken: string) => {
  const url = HELIX_BASE_URL + 'users';
  return await callApi<UserInformationResponse>({
    url,
    params: {
      login: channelName.toLowerCase()
    },
    token: appToken
  });
};

const callApi = async <R, T = unknown>({
  url,
  body,
  method = 'GET',
  params = {},
  token,
}: ApiParams<T>): Promise<ApiResponse<R>> => {
  const paramsParsed = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  const urlParsed = url + '?' + paramsParsed;
  console.log(`request to twitch api ${urlParsed}`);
  try {
    const resp = await fetch(urlParsed, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: createAuthHeaders(token ?? ''),
    });
    const data = await resp.json() as R;

    if (!resp.ok) {
      console.error(data, resp.status);
      return {
        error: {
          status: resp.status,
          description: data as any
        }
    }
  }

    return { data };
  } catch (err) {
    console.log(err);
    return {
      error: {
        status: 500,
        description: 'Internal error'
      }
    }
  }
}

const createAuthHeaders = (token: string, type: 'Bearer' | 'OAuth' = 'Bearer', additionalHeaders: Record<string, string> = {}) => (
  new Headers({
    'Client-Id': CLIENT_ID,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...additionalHeaders
  })
);

export const twitchApi = {
  getChannelBadges,
  getGlobalBadges,
  getAppToken,
  getUserInformation
};