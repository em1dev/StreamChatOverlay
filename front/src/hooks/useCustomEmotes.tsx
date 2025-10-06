import { useEffect, useState } from 'react';
import { CustomEmote } from '../api/chatApi/types';
import { useConfiguration } from '../store/configuration';
import { chatApi } from '@/api/chatApi';
import { escapeRegex } from '@/utils/regexUtils';

export const useCustomEmotes = (channelId: string) => {
  const [customEmotes, setCustomEmotes] = useState<Array<CustomEmote>>([]);
  const isBetterTTVEnabled = useConfiguration(state => state.userConfiguration.emotes.isBetterTTVEnabled);
  const isSevenTVEnabled = useConfiguration(state => state.userConfiguration.emotes.isSevenTVEnabled);
  const isFrankerEnabled = useConfiguration(state => state.userConfiguration.emotes.isFrankerFaceEnabled);

  useEffect(() => {
    (async () => {
      if (
        !isBetterTTVEnabled &&
        !isSevenTVEnabled &&
        !isFrankerEnabled
      ) return;

      const resp = await chatApi.getEmotes(channelId, isBetterTTVEnabled, isFrankerEnabled, isFrankerEnabled);
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