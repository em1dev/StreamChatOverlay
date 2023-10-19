import { useCallback, useEffect, useState } from "react";
import { Badge } from "../api/elpatoApi/types";
import { elPatoApi } from "../api/elpatoApi";
import { ChatMessageData } from "../types";

export const useBadges = (channelId?: string | null) => {
  const [badges, setBadges] = useState<Array<Badge>>([]);

  useEffect(() => {
    if (!channelId) return;

    (async () => {
      const respChannelBadges = await elPatoApi.getChannelBadges(channelId);
      const respGlobalBadges = await elPatoApi.getGlobalBadges();

      if (!respChannelBadges.data || !respGlobalBadges.data) return;
      setBadges([
        ...respChannelBadges.data,
        ...respGlobalBadges.data
      ]);
    })();
  }, [channelId])

  const parseBadges = useCallback((twitchBadges: Map<string, string>):ChatMessageData['badges']  => {
    if (!badges.length) return [];

    const parsedBadges: ChatMessageData['badges'] = [];
    for (const [key, value] of twitchBadges.entries()) {
      const foundVersionBadge = badges.find((badge) => badge.set_id === key);
      if (!foundVersionBadge) continue;

      const versionBadge = foundVersionBadge.versions.find((item) => item.id === value);
      if (!versionBadge) continue;

      parsedBadges.push({
        id: key,
        url: versionBadge.image_url_2x,
      });
    }

    return parsedBadges;
  }, [badges]);

  return {
    parseBadges,
    badges
  };
};