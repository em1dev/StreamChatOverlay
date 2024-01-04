import { ApiResponse, BetterTTVEmote, BetterTTVUserEmoteResponse } from "../types";

const BASE_URL = 'https://api.betterttv.net/3/';
const PROVIDER = 'twitch';

const getGlobalEmotes = async () => {
  const url = BASE_URL + 'cached/emotes/global';
  return fetchApi<Array<BetterTTVEmote>>(url);
}

const getUserEmotes = async (userId: string) => {
  const url = BASE_URL + `/cached/users/${PROVIDER}/${userId}`;
  return fetchApi<BetterTTVUserEmoteResponse>(url);
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

export const betterTTVApi = {
  getGlobalEmotes,
  getUserEmotes
};