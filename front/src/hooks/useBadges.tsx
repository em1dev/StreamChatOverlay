import { useCallback, useEffect, useState } from 'react';
import { ChatMessageData } from '../types';
import { chatApi } from '@/api/chatApi';
import { BadgeVersion } from '@/api/chatApi/types';

export const useBadges = (channelId?: string | null) => {
  const [badges, setBadges] = useState<Record<string, BadgeVersion[]>>({});

  useEffect(() => {
    if (!channelId) return;

    (async () => {
      const respChannelBadges = await chatApi.getChannelBadges(channelId);

      if (!respChannelBadges.data) return;
      setBadges(respChannelBadges.data);
    })();
  }, [channelId]);

  const parseBadges = useCallback((twitchBadges: Map<string, string>): ChatMessageData['badges'] => {
    const parsedBadges: ChatMessageData['badges'] = [];
    for (const [badgeId, badgeVersionId] of twitchBadges.entries()) {

      const versions = badges[badgeId];
      if (!versions) continue;

      const versionBadge = versions.find((item) => item.id === badgeVersionId);
      if (!versionBadge) continue;

      parsedBadges.push({
        id: badgeId,
        url: versionBadge.url2x,
      });
    }

    return parsedBadges;
  }, [badges]);

  return {
    parseBadges,
    badges
  };
};
