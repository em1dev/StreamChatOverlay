import { TwitchCredentials } from '../../TwitchTokenStore';
import { ApiResponse, TwitchAuthResponse, TwitchBadgeResponse } from '../../types';
import 'dotenv/config';

const TWITCH_AUTH_URL = 'https://id.twitch.tv/oauth2/token';
const HELIX_BASE_URL = 'https://api.twitch.tv/helix/';

const getAppToken = async (clientId: string, clientSecret: string) => (
  await callApi<TwitchAuthResponse>({ 
    url: TWITCH_AUTH_URL,
    method: 'POST',
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
      claims: '',
    }
  })
);

const getChannelBadges = async (channelId:string, twitchCredentials: TwitchCredentials) => {
  const url = HELIX_BASE_URL + 'chat/badges'; 
  return await callApi<TwitchBadgeResponse>({
    url,
    params: {
      broadcaster_id: channelId
    },
    twitchCredentials
  });
};

const getGlobalBadges = async (twitchCredentials: TwitchCredentials) => {
  const url = HELIX_BASE_URL + 'chat/badges/global'; 
  return await callApi<TwitchBadgeResponse>({
    url,
    twitchCredentials
  }); 
};

interface ApiParams<T> {
  url: string;
  params?: Record<string, string | number>;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: T;
  twitchCredentials?: TwitchCredentials;
  headers?: Record<string, string>,
}

const callApi = async <R, T = unknown>({
  url,
  body,
  method = 'GET',
  params = {},
  twitchCredentials
}: ApiParams<T>): Promise<ApiResponse<R>> => {
  const paramsParsed = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  const urlParsed = url + '?' + paramsParsed;
  console.log(`request to twitch api ${urlParsed}`);
  try {
    const resp = await fetch(urlParsed, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: twitchCredentials ? createAuthHeaders(twitchCredentials) : {
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json() as R;

    if (!resp.ok) {
      console.error(data, resp.status);
      return {
        error: {
          status: resp.status,
          description: data as unknown
        }
      };
    }

    return { data };
  } catch (err) {
    console.log(err);
    return {
      error: {
        status: 500,
        description: 'Internal error'
      }
    };
  }
};

const createAuthHeaders = (
  twitchCredentials: TwitchCredentials,
  type: 'Bearer' | 'OAuth' = 'Bearer',
  additionalHeaders: Record<string, string> = {}) => (
  new Headers({
    'Client-Id': twitchCredentials.clientId,
    'Authorization': `${type} ${twitchCredentials.appToken}`,
    'Content-Type': 'application/json',
    ...additionalHeaders
  })
);

export const twitchApi = {
  getChannelBadges,
  getGlobalBadges,
  getAppToken
};