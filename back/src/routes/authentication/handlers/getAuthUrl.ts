import { TwitchTokenStore } from '../../../TwitchTokenStore';
import { ChatApiResponse } from '../../../types';

export const getAuthUrl = async (redirectUrl: string):Promise<ChatApiResponse<{ url: string; }>> => {
  const twitchTokenStore = TwitchTokenStore.getInstance();
  const credentials = await twitchTokenStore.getCredentials();

  const query = {
    response_type: 'code',
    client_id: credentials.clientId,
    redirect_uri: redirectUrl,
    scope: '',
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