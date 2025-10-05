import 'dotenv/config';

export enum LoginServices {
  twitch = 'twitch'
}

export enum ConnectionServices {
  twitch = 'twitch'
}

const AUTH_API_URL = process.env['AUTH_API_URL'];
const APP_ID = process.env['APP_ID'];

const getAppCredentials = async () => {
  const url = `${AUTH_API_URL}/app/${APP_ID}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(
      `Unable to get app authentication information from auth server. Status: ${resp.status}.
Make sure an app with '${APP_ID}' exists within the auth server.`
    );
  }

  const credentials = await resp.json() as Array<{
    type: string,
    clientSecret: string,
    clientId: string
  }>;
  const twitchCredentials = credentials.find(item => item.type == LoginServices.twitch);
  if (!twitchCredentials) {
    throw new Error(`Missing twitch credentials on auth server for app '${APP_ID}'`);
  }

  return twitchCredentials;
};

export const authenticate = async (code: string, redirectUrl: string) => {
  const resp = await fetch(AUTH_API_URL + `/${APP_ID}/authenticate/${LoginServices.twitch}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirectUrl,
      //shouldUpsertConnection: true
    })
  });

  if (resp.ok) {
    return await resp.json();
  }
};

export const verifyToken = async (token: string) => {
  const resp = await fetch(AUTH_API_URL + '/token/verify', {
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
  const resp = await fetch(AUTH_API_URL + `/${APP_ID}/user/${userId}/connections`);
  if (!resp.ok) return;

  return await resp.json() as Array<UserConnection>;
};

export const revokeConnectionToken = async (userId: number) => {
  const resp = await fetch(AUTH_API_URL + `/${APP_ID}/user/${userId}/connection/twitch/revoke`, {
    method: 'DELETE'
  });
  return resp.ok;
};

export const AuthApi = {
  getAppCredentials,
  authenticate,
  verifyToken,
  getConnections,
  revokeConnectionToken
};