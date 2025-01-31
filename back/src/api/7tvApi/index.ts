import { ApiResponse, ElPatoEmote } from "../../types";

interface SevenTVEmoteResponse {
  id: string,
  name: string,
  emotes: Array<SevenTVEmote>,
}

interface SevenTVUserEmoteResponse {
  id: string,
  username: string,
  emotes: Array<SevenTVEmote>
}

interface SevenTVEmote {
  id: string,
  name: string,
  data: {
    animated: boolean,
    listed: boolean,
    host: {
      url: string,
      files: Array<{
        name: string,
        static_name: string,
        width: number,
        height: number,
        frame_count: number,
        size: number,
        format: string
      }>
    }
  }
}

const get7TVEmotes = async (userId: string) => {
  const globalEmotes = (await fetchApi<SevenTVEmoteResponse>("https://7tv.io/v3/emote-sets/global"))?.data?.emotes ?? [];
  const userEmotes = (await fetchApi<SevenTVUserEmoteResponse>(`https://7tv.io/v3/users/twitch/${userId}`))?.data?.emotes ?? [];

  const allEmotes = [...globalEmotes, ...userEmotes];

  return allEmotes.map(e => ({
    id: e.id,
    type: '7TV',
    code: e.name,
    animated: e.data.animated,
    url1x: "http:" + e.data.host.url + "/" + e.data.host.files[0]?.name,
    url2x: "http:" + e.data.host.url + "/" + e.data.host.files[1]?.name,
    url3x: "http:" + e.data.host.url + "/" + e.data.host.files[2]?.name,
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
      error: { status: resp.status, description: '7TV error' }
    }
  }

  const data = await resp.json() as T;
  return { data };
}

export { get7TVEmotes }