import { AuthApi } from '../../../api/authApi';

const twitchScopes = [
  'bits:read',
  'moderator:read:followers',
  'channel:read:ads',
  'channel:read:redemptions',
  'user:read:chat',
  'channel:read:subscriptions',
  'bits:read',
  'channel:moderate',
  'channel:read:guest_star',
  'channel:read:polls',
  'channel:read:predictions',
  'channel:read:hype_train',
  'moderator:read:shoutouts'
];

export const getAuthUrl = async (redirectUrl: string) => {
  const resp = await AuthApi.getAuthUrl('twitch', redirectUrl, twitchScopes);
  if (!resp)
    return null;
  return resp.authUrl;
};
