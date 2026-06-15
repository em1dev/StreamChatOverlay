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

export type YoutubeLiveChatPagination = GooglePaginationResult<YoutubeLiveChatItem> &
{
    pollingIntervalMillis: number,
    nextPageToken: string,
}

export interface YoutubeLiveChatAuthor
{
  channelId: string,
  channelUrl: string,
  displayName: string, // contains @
  profileImageUrl: string,
  isVerified: boolean,
  isChatOwner: boolean,
  isChatSponsor: boolean,
  isChatModerator: boolean // owner is not moderator
}

export interface YoutubeLiveChatItem
{
  kind: string,
  etag: string,
  id: string,
  authorDetails: YoutubeLiveChatAuthor,
  snippet: {
    type: 'textMessageEvent' | 'chatEndedEvent' | 'messageDeletedEvent'
    | 'memberMilestoneChatEvent' | 'superChatEvent' | 'superStickerEvent'
    | 'userBannedEvent' | 'membershipGiftingEvent' | 'giftEvent',
    liveChatId: string,
    authorChannelId?: string,
    publishedAt: string,
    hasDisplayContent: boolean,
    displayMessage: string, // content
    textMessageDetails?: { // only if its a text message event
      messageText: string // content
    },
    messageDeletedDetails?: { // only if deleted message event
      deletedMessageId: string,

    }
  }
}

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
    lifeCycleStatus: 'ready' | 'complete' | 'created' | 'live' | 'liveStarting' | 'revoked' | 'testStarting' | 'testing',
    privacyStatus: 'private',
  }
}
