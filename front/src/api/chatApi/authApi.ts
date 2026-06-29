import { BASE_URL, chatApiClient } from './chatApiClient';


const authLoginUrl = `${BASE_URL}/authenticate?redirectUrl=${location.origin}/auth`;

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
  const data = await resp.json() as { token: string };
  return data;
};

const verifyToken = async (token: string) => {
  const resp = await chatApiClient.fetch(
    'token/verify', 'POST', token
  );
  return resp.hasError != true;
};

export const authApi = {
  authenticateWithCode,
  verifyToken,
  authLoginUrl
};
