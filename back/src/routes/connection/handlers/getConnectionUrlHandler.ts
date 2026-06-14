import { AuthApi } from '../../../api/authApi';
import { ConnectionProvider } from '../../../types';

const YOUTUBE_SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly'
];

const TWITCH_SCOPES = [
  'bits:read',
  'moderator:read:followers',
  'channel:read:ads',
  'channel:read:redemptions',
  'user:read:chat',
  'channel:read:subscriptions',
  'channel:moderate',
  'channel:read:guest_star',
  'channel:read:polls',
  'channel:read:predictions',
  'channel:read:hype_train',
  'moderator:read:shoutouts'
];

export const getConnectionUrlHandler = async (redirectUrl: string, provider: ConnectionProvider) => {
  const scopes = provider == 'twitch' ? TWITCH_SCOPES : YOUTUBE_SCOPES;

  const url = await AuthApi.getAuthUrl(provider, redirectUrl, scopes);
  return url?.authUrl;
};
