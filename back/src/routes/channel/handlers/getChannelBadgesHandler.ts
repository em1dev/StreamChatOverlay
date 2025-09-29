import { twitchApi } from '../../../api/twitchApi';
import { TwitchTokenStore } from '../../../TwitchTokenStore';
import { ChatApiResponse, TwitchBadgeResponse } from '../../../types';

export const getChannelBadgesHandler = async (channelId: string)
: Promise<ChatApiResponse<TwitchBadgeResponse['data']>> => {
  const twitchTokenStore = TwitchTokenStore.getInstance();
  const twitchCredentials = await twitchTokenStore.getCredentials();

  const globalBadgesResp = await twitchApi.getGlobalBadges(twitchCredentials);
  const channelBadges = await twitchApi.getChannelBadges(channelId, twitchCredentials);

  if (globalBadgesResp.error || channelBadges.error) {
    console.error(`Error fetching badges for id ${channelId}, resp1: ${channelBadges.data}`);
    return {
      status: globalBadgesResp.error?.status ?? channelBadges.error!.status,
    };
  }

  const allBadges = [
    ...globalBadgesResp.data!.data,
    ...channelBadges.data!.data
  ];

  return {
    status: 200,
    body: allBadges
  };
};