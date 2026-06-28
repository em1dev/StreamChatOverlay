import { useEffect, useState } from 'react';
import { CustomEmote } from '../../api/chatApi/types';
import { chatApi } from '@/api/chatApi';
import { escapeRegex } from '@/utils/regexUtils';
import { BetterTTVSync } from './betterTTVSync';
import { SevenTVSync } from './sevenTVSync';
import { useChatSettings } from '@/store';

export const useCustomEmotes = (channelId: string) => {
  const [customEmotes, setCustomEmotes] = useState<Array<CustomEmote>>([]);
  const emoteConfig = useChatSettings(state => state.emotes);

  useEffect(() => {
    const updateEmoteStore = async () => {
      console.log('Fetching custom emotes...');
      if (
        !emoteConfig.isBetterTTVEnabled &&
        !emoteConfig.isSevenTVEnabled &&
        !emoteConfig.isFrankerFaceEnabled
      ) return;

      const resp = await chatApi.getEmotes(
        channelId,
        emoteConfig.isBetterTTVEnabled,
        emoteConfig.isFrankerFaceEnabled,
        emoteConfig.isSevenTVEnabled
      );
      if (!resp.data) return;

      const emotes = resp.data.map(e => ({
        ...e,
        code: escapeRegex(e.code)
      }));

      console.log(`Got ${emotes.length} custom emotes`);
      setCustomEmotes(emotes);
    };

    let betterTTVSync: BetterTTVSync | null = null;
    if (emoteConfig.isBetterTTVEnabled)
    {
      betterTTVSync = new BetterTTVSync(channelId, updateEmoteStore);
    }

    let sevenTVSync: SevenTVSync | null = null;
    if (emoteConfig.isSevenTVEnabled)
    {
      sevenTVSync = new SevenTVSync();
      sevenTVSync.connect(channelId, updateEmoteStore);
    }

    updateEmoteStore();

    return () => {
      betterTTVSync?.close();
      sevenTVSync?.close();
    };
  }, [channelId, emoteConfig]);

  return customEmotes;
};
