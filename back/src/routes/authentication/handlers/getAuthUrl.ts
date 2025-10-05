import { TwitchTokenStore } from '../../../TwitchTokenStore';
import { ChatApiResponse } from '../../../types';

const scopes = [
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

export const getAuthUrl = async (redirectUrl: string):Promise<ChatApiResponse<{ url: string; }>> => {
  const twitchTokenStore = TwitchTokenStore.getInstance();
  const credentials = await twitchTokenStore.getCredentials();

  const query = {
    response_type: 'code',
    client_id: credentials.clientId,
    redirect_uri: redirectUrl,
    scope: scopes.join(' '),
    state: crypto.randomUUID(),
  };

  const url = `https://id.twitch.tv/oauth2/authorize?${(new URLSearchParams(query)).toString()}`;

  return {
    status: 200,
    body: {
      url
    }
  };
};