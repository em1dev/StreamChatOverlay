import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';

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

export const getAuthUrl = async (redirectUrl: string):Promise<HandlerApiResult<{ url: string; }>> => {
  const resp = await AuthApi.getAuthUrl('twitch', redirectUrl, twitchScopes);
  if (!resp)
    return HandlerApiResult.Error(400, 'Unable to generate auth url');
  return HandlerApiResult.Success(200, { url: resp.authUrl });
};
