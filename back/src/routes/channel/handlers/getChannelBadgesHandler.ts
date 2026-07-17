import { twitchApi } from '../../../api/twitchApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { logger } from '../../../logger';
import { TokenStore } from '../../../TwitchTokenStore';

interface BadgeVersion {
  id: string,
  url1x: string,
  url2x: string,
  url4x: string,
  title: string,
  description: string,
}

type BadgeResult = Record<string, BadgeVersion[]>

export const getChannelBadgesHandler = async (channelId: string)
: Promise<HandlerApiResult<BadgeResult>> => {
  const twitchCredentials = await TokenStore.getInstance().getTwitchCredentials();

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

  const badges: Record<string, BadgeVersion[]> = {};

  allBadges.forEach((badge) => {
    badges[badge.set_id] = [
      ...badges[badge.set_id] ?? [],
      ...badge.versions.map(version => ({
        id: version.id,
        description: version.description,
        title: version.title,
        url1x: version.image_url_1x,
        url2x: version.image_url_2x,
        url4x: version.image_url_4x,
      }))
    ];
  });

  return HandlerApiResult.Success(200, badges);
};
