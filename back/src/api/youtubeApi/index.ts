import { RedisCache } from '../../cache';
import { logger } from '../../logger';
import { BroadcastLifeCycleStatus, YoutubeBroadcastPagination, YoutubeBroadcastSimple } from './types';


const validBroadcastStatus: Array<BroadcastLifeCycleStatus> = [
  'created',
  'live',
  'liveStarting',
  'ready',
  'testStarting',
  'testing',
];

interface CacheItemWithEtag<T> {
  etag: string,
  data: T
}

const getLiveBroadcast = async (channelId: string, token: string): Promise<YoutubeBroadcastSimple | null> => {
  const cacheKey = `youtube-live-broadcast-${channelId}`;
  const cachedItem = await RedisCache.getInstance().getItem<CacheItemWithEtag<YoutubeBroadcastSimple>>(cacheKey);
  const etag: string | undefined = cachedItem?.etag;

  const url = 'https://www.googleapis.com/youtube/v3/liveBroadcasts';
  const params = new URLSearchParams({
    mine: 'true',
    part: 'id,snippet,status'
  });

  const headers:Record<string, string> = {
    'Authorization': `Bearer ${token}`
  };
  if (etag)
  {
    headers['If-None-Match'] = etag;
  }
  const resp = await fetch(url + '?' + params.toString(), { headers });

  logger.info(resp, 'response');
  if (!resp.ok) return null;

  if (resp.status == 304) // not modified
  {
    return cachedItem!.data;
  }

  const broadcasts = (await resp.json()) as YoutubeBroadcastPagination;

  // todo - need to check if you can create a live while already being live
  const latestLive = broadcasts
    .items
    .filter(b => validBroadcastStatus.includes(b.status.lifeCycleStatus))
    .at(0);

  if (!latestLive) return null;

  return {
    broadcastId: latestLive.id,
    channelId: latestLive.snippet.channelId,
    description: latestLive.snippet.description,
    liveChatId: latestLive.snippet.liveChatId,
    title: latestLive.snippet.title
  };
};

export const youtubeApi = {
  getLiveBroadcast
};
