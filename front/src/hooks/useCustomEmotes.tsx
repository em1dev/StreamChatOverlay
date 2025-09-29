import { useEffect, useState } from 'react';
import { CustomEmote } from '../api/chatApi/types';
import { elPatoApi } from '../api/chatApi';
import { useConfiguration } from '../store/configuration';

const escapeRegex = (text: string) => (
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
);

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

      const emotes = resp.data.map(e => ({
        ...e,
        code: escapeRegex(e.code)
      }));

      setCustomEmotes(emotes);
    })();
  }, [channelId, isBetterTTVEnabled, isSevenTVEnabled, isFrankerEnabled]);

  return customEmotes;
};