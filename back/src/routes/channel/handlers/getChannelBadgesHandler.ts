import { twitchApi } from '../../../api/twitchApi';
import { TwitchTokenStore } from '../../../TwitchTokenStore';
import { ChatApiResponse, TwitchBadgeResponse } from '../../../types';

export const getChannelBadgesHandler = async (channelId: string)
: Promise<ChatApiResponse<TwitchBadgeResponse['data']>> => {
  const twitchTokenStore = TwitchTokenStore.getInstance();
  const appToken = await twitchTokenStore.getToken();

  let globalBadgesResp = await twitchApi.getGlobalBadges(appToken);
  let channelBadges = await twitchApi.getChannelBadges(channelId, appToken);

  if (globalBadgesResp.error?.status == 401 || channelBadges.error?.status == 401)
  {
    // app token has expired so refresh and try again
    await twitchTokenStore.updateToken();
    globalBadgesResp = await twitchApi.getGlobalBadges(appToken);
    channelBadges = await twitchApi.getChannelBadges(channelId, appToken);
  }

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