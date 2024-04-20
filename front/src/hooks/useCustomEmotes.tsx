import { useEffect, useState } from 'react';
import { CustomEmote } from '../api/elpatoApi/types';
import { elPatoApi } from '../api/elpatoApi';
import { useConfiguration } from '../store/configuration';

export const useCustomEmotes = (channelId: string) => {
  const [customEmotes, setCustomEmotes] = useState<Array<CustomEmote>>([]);
  const isBetterTTVEnabled = useConfiguration(state => state.betterTTVEnabled);
  const isSevenTVEnabled = useConfiguration(state => state.sevenTVEnabled);
  const isFrankerEnabled = useConfiguration(state => state.frankerFaceEnabled);

  useEffect(() => {
    (async () => {
      if (
        !isBetterTTVEnabled &&
        !isSevenTVEnabled &&
        !isFrankerEnabled
      ) return;

      const resp = await elPatoApi.getEmotes(channelId, isBetterTTVEnabled, isFrankerEnabled, isFrankerEnabled);
      if (!resp.data) return;
      setCustomEmotes(resp.data);
    })();
  }, [channelId, isBetterTTVEnabled, isSevenTVEnabled, isFrankerEnabled]);

  return customEmotes;
};