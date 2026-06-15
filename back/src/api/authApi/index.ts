import { config } from '../../config';
import { ConnectionProvider } from '../../types';

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
    type: 'twitch' | 'youtube',
    clientSecret: string,
    clientId: string
  }>;
  return credentials;
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
      shouldUpsertConnection: false
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
  type: ConnectionProvider,
  displayName: string,
  profileImageUrl: string,
  expiresIn: number
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

export const deleteConnection = async (userId: number, provider: ConnectionProvider) => {
  const resp = await fetch(config.AUTH_API_URL + `/${config.APP_ID}/user/${userId}/connection/${provider}`, {
    method: 'DELETE'
  });
  return resp.ok;
};

export const addNewConnection = async (userId: number, provider: ConnectionProvider, code: string, redirectUrl: string) => {
  const resp = await fetch(config.AUTH_API_URL + `/${config.APP_ID}/user/${userId}/connection/${provider}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirectUrl
    })
  });
  return resp.ok;
};

export const getAuthUrl = async (provider: ConnectionProvider, redirectUrl: string, scopes: Array<string>) =>
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
  deleteConnection,
  addNewConnection,
  getAuthUrl
};
