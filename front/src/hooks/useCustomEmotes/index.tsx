import { useCallback, useEffect, useState } from 'react';
import { CustomEmote } from '../../api/chatApi/types';
import { useConfiguration } from '../../store/configuration';
import { chatApi } from '@/api/chatApi';
import { escapeRegex } from '@/utils/regexUtils';
import { BetterTTVEvent, BetterTTVJoinChannelEvent } from './types';

export const useCustomEmotes = (channelId: string) => {
  const [customEmotes, setCustomEmotes] = useState<Array<CustomEmote>>([]);
  const emoteConfig = useConfiguration(state => state.userConfiguration.emotes);

  const updateEmoteStore = useCallback(async () => {
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

    console.log(`Got ${emotes.length} custom emotes emotes`);
    setCustomEmotes(emotes);
  }, [channelId, emoteConfig]);

  useEffect(() => {
    const betterTTVws = new WebSocket('wss://sockets.betterttv.net/ws');
    betterTTVws.addEventListener('open', () => {
      console.log(`Connecting to betterTTV WS twitch:${channelId}`);
      betterTTVws.send(JSON.stringify({
        name: 'join_channel',
        data: {
          name: `twitch:${channelId}`
        }
      } satisfies BetterTTVJoinChannelEvent));
    });

    betterTTVws.addEventListener('message', (e) => {
      try {
        const msg = JSON.parse(e.data) as BetterTTVEvent;
        if (
          msg.name == 'emote_create' ||
          msg.name == 'emote_update' ||
          msg.name == 'emote_delete'
        ) {
          // it takes a couple of seconds from receiving the event to the api showing
          //    the emote changes, so we wait 5 seconds
          //    alternatively we could parse the changes and apply them client side if this approach is not consistent
          console.log('Detected betterTTV changes');
          setTimeout(updateEmoteStore, 5000);
        }
      } catch (e) {
        console.log('weird message from betterttv ws', e);
      }
    });

    updateEmoteStore();

    return () => {
      betterTTVws.close();
    };
  }, [channelId, updateEmoteStore]);

  return customEmotes;
};