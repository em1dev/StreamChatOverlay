import { twitchApi } from '../../../api/twitchApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { logger } from '../../../logger';
import { TwitchTokenStore } from '../../../TwitchTokenStore';
import { TwitchBadgeResponse } from '../../../types';

export const getChannelBadgesHandler = async (channelId: string)
: Promise<HandlerApiResult<TwitchBadgeResponse['data']>> => {
  const twitchTokenStore = TwitchTokenStore.getInstance();
  const twitchCredentials = await twitchTokenStore.getCredentials();

  const [globalBadgesResp, channelBadges] = await Promise.all([
    twitchApi.getGlobalBadges(twitchCredentials),
    twitchApi.getChannelBadges(channelId, twitchCredentials)]
  );

  if (globalBadgesResp.error || channelBadges.error) {
    logger.error(`Error fetching badges for channelId: ${channelId}, resp: ${channelBadges.data}`);
    const status = globalBadgesResp.error?.status ?? channelBadges.error!.status;
    return HandlerApiResult.Error(status, 'Unable to fetch badges');
  }

  const allBadges = [
    ...globalBadgesResp.data!.data,
    ...channelBadges.data!.data
  ];

  return HandlerApiResult.Success(200, allBadges);
};
