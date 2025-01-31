import { ApiResponse, ElPatoEmote } from "../../types";

export interface FrankerEmote {
  id:string,
  /**
   * emote code
   */
  code:string,
  imageType: 'png' | 'webp' | 'gif',
  animated: boolean,
  images: {
    '1x': string,
    '2x': string,
    '4x': string,
  }
}

export interface FrankerEmoteResponse {
  id: string
  bots: Array<string>,
  avatar: string,
  channelEmotes: Array<FrankerEmote>,
  sharedEmotes: Array<FrankerEmote>
}

const getFrankerEmotes = async (userId: string) => {
  const globalEmotes = (await fetchApi<Array<FrankerEmote>>("https://api.betterttv.net/3/cached/frankerfacez/emotes/global")).data ?? [];
  const userEmotes = (await fetchApi<Array<FrankerEmote>>(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${userId}`)).data ?? [];

  const allEmotes = [...globalEmotes, ...userEmotes];

  return allEmotes.map(e => ({
    id: e.id,
    type: 'FFZ',
    code: e.code,
    animated: e.animated,
    url1x: e.images["1x"],
    url2x: e.images["2x"],
    url3x: e.images["4x"]
  } satisfies ElPatoEmote))
}

const fetchApi = async <T>(url:string):Promise<ApiResponse<T>> => {
  const resp = await fetch(url, {
    headers: new Headers({
      'content-type': 'application/json',
    })
  });
  if (!resp.ok) {
    return {
      error: { status: resp.status, description: 'Better ttv error' }
    }
  }

  const data = await resp.json() as T;
  return { data };
}

export { getFrankerEmotes }