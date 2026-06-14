import { config } from '../../config';

export enum LoginServices {
  twitch = 'twitch'
}

export enum ConnectionServices {
  twitch = 'twitch',
  youtube = 'youtube'
}

const getAppCredentials = async () => {
  const url = `${config.AUTH_API_URL}/app/${config.APP_ID}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(
      `Unable to get app authentication information from auth server. Status: ${resp.status}.
Make sure an app with '${config.APP_ID}' exists within the auth server.`
    );
  }

  const credentials = await resp.json() as Array<{
    type: string,
    clientSecret: string,
    clientId: string
  }>;
  const twitchCredentials = credentials.find(item => item.type == LoginServices.twitch);
  if (!twitchCredentials) {
    throw new Error(`Missing twitch credentials on auth server for app '${config.APP_ID}'`);
  }

  return twitchCredentials;
};

export const authenticate = async (code: string, redirectUrl: string) => {
  const resp = await fetch(config.AUTH_API_URL + `/${config.APP_ID}/authenticate/${LoginServices.twitch}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirectUrl,
      shouldUpsertConnection: true
    })
  });

  if (!resp.ok)
    return;

  return await resp.json() as { token : string };
};

export const verifyToken = async (token: string) => {
  const resp = await fetch(config.AUTH_API_URL + '/token/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  });
  return resp.ok;
};

export interface UserConnection {
  token: string,
  refreshToken: string,
  userId: string,
  type: 'tiktok' | 'twitch' | 'youtube',
  displayName: string,
  profileImageUrl: string
}

export const getConnections = async (userId: number) => {
  const resp = await fetch(config.AUTH_API_URL + `/${config.APP_ID}/user/${userId}/connections`);
  if (!resp.ok) return;

  return await resp.json() as Array<UserConnection>;
};

export const revokeConnectionToken = async (userId: number) => {
  const resp = await fetch(config.AUTH_API_URL + `/${config.APP_ID}/user/${userId}/connection/twitch/revoke`, {
    method: 'DELETE'
  });
  return resp.ok;
};

export const getAuthUrl = async (provider: 'twitch' | 'youtube', redirectUrl: string, scopes: Array<string>) =>
{
  const url = config.AUTH_API_URL + `/${config.APP_ID}/authenticate/${provider}/authUrl`;
  const body = {
    redirectUrl,
    scopes
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok)
    return;

  return await resp.json() as {
    authUrl: string
  };
};

export const AuthApi = {
  getAppCredentials,
  authenticate,
  verifyToken,
  getConnections,
  revokeConnectionToken,
  getAuthUrl
};
