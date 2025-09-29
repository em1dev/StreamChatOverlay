import { get7TVEmotes } from '../../../api/7tvApi';
import { betterTTVApi } from '../../../api/betterTTVApi';
import { getFrankerEmotes } from '../../../api/frankerfacezApi';
import { ChatApiResponse, ChatEmote } from '../../../types';

export interface EmoteConfiguration {
  betterTTV: boolean,
  frankerFace: boolean,
  sevenTV: boolean
}

export const getChannelEmotesHandler = async (channelId: string, emoteConfig: EmoteConfiguration)
: Promise<ChatApiResponse<Array<ChatEmote>>> => {
  let chatEmotes:Array<ChatEmote> = [];

  if (emoteConfig.betterTTV) {
    chatEmotes = chatEmotes.concat(await getBetterTTVEmotes(channelId));
  }

  if (emoteConfig.sevenTV) {
    chatEmotes = chatEmotes.concat(await get7TVEmotes(channelId));
  }

  if (emoteConfig.frankerFace) {
    chatEmotes = chatEmotes.concat(await getFrankerEmotes(channelId));
  }

  return { status: 200, body: chatEmotes };
};

const getBetterTTVEmotes = async (channelId: string) => {
  try {
    const globalEmotes = await betterTTVApi.getGlobalEmotes();
    const userEmotes = await betterTTVApi.getUserEmotes(channelId);

    if (!globalEmotes.data) return [];
    let chatEmotes:Array<ChatEmote> = globalEmotes.data.map((emote) => ({
      id: emote.id,
      type: 'BetterTTV',
      code: emote.code,
      animated: emote.animated,
      url1x: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
      url2x: `https://cdn.betterttv.net/emote/${emote.id}/2x`,
      url3x: `https://cdn.betterttv.net/emote/${emote.id}/3x`
    }));

    if (userEmotes.data) {
      chatEmotes = chatEmotes.concat(userEmotes.data.sharedEmotes.map((emote) => ({
        id: emote.id,
        type: 'BetterTTV',
        animated: emote.animated,
        code: emote.code,
        url1x: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
        url2x: `https://cdn.betterttv.net/emote/${emote.id}/2x`,
        url3x: `https://cdn.betterttv.net/emote/${emote.id}/3x`
      })));

      chatEmotes = chatEmotes.concat(userEmotes.data.channelEmotes.map((emote) => ({
        id: emote.id,
        type: 'BetterTTV',
        animated: emote.animated,
        code: emote.code,
        url1x: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
        url2x: `https://cdn.betterttv.net/emote/${emote.id}/2x`,
        url3x: `https://cdn.betterttv.net/emote/${emote.id}/3x`
      })));
    }
    return chatEmotes;
  } catch {
    // this might throw if the user does not have a better ttv account so we can return an empty list
    return [];
  }
};