export interface GooglePaginationResult<T> {
  kind: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  nextPageToken?: string,
  items: Array<T>
}

export type YoutubeBroadcastPagination = GooglePaginationResult<YoutubeLiveBroadcastItem>;
export type BroadcastLifeCycleStatus = 'ready' | 'complete' | 'created' | 'live' | 'liveStarting' | 'revoked' | 'testStarting' | 'testing';
export interface YoutubeLiveBroadcastItem
{
  kind: string,
  etag: string,
  id: string,
  snippet: {
    channelId: string,
    title: string,
    description: string,
    liveChatId: string
  },
  status: {
    lifeCycleStatus: BroadcastLifeCycleStatus,
    privacyStatus: 'private',
  }
}

export interface YoutubeBroadcastSimple
{
  broadcastId: string,
  channelId: string,
  title: string,
  description: string,
  liveChatId: string,
}
