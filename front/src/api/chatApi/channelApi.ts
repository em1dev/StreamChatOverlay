import { ApiResponse } from '../ApiResponse';
import { chatApiClient } from './chatApiClient';
import { BadgeVersion, CustomEmote } from './types';


const getEmotes = async (channelId: string,
  isBetterTTVEnabled: boolean,
  isFrankerTTEnabled: boolean,
  isSevenTVEnabled: boolean
): Promise<ApiResponse<Array<CustomEmote>>> => (
  await chatApiClient.fetch(
    `${channelId}/emotes?betterTTV=${isBetterTTVEnabled}&frankerFace=${isFrankerTTEnabled}&sevenTV=${isSevenTVEnabled}`,
    'GET'
  )
);

const getChannelBadges = async (channelId: string)
: Promise<ApiResponse<Record<string, BadgeVersion[]>>> =>
  (
    chatApiClient.fetch(`${channelId}/badges`, 'GET')
  );

export const channelApi = {
  getEmotes,
  getChannelBadges
};
