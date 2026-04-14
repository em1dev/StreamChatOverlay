export type BetterTTVEventType = 'join_channel' | 'emote_create' | 'emote_update' | 'emote_delete';

export interface BetterTTVEvent<K = BetterTTVEventType, T = unknown>
{
  name: K,
  data: T
}

export type BetterTTVJoinChannelEvent = BetterTTVEvent<'join_channel', {
  // {provider}:{providerId}
  name: string
}>;

// there seems to be other values being sent that are not documented on their api like the emoteurl
export type BetterTTVEmoteCreateEvent = BetterTTVEvent<'emote_create', {
  emote: {
    id: string,
    code: string,
    imageType: string,
    animated: boolean,
    user: {
      id: string,
      name: string,
      displayName: string,
      providerId: string
    }
  },
  // channel as in the websocket channel id {providerId}:{userId}
  channel: string
}>;

export type BetterTTVEmoteUpdateEvent = BetterTTVEvent<'emote_update', {
  emote: {
    id: string,
    code: string
  },
  // channel as in the websocket channel id {providerId}:{userId}
  channel: string
}>;

export type BetterTTVEmoteDeleteEvent = BetterTTVEvent<'emote_delete', {
  emoteId: string,
  // channel as in the websocket channel id {providerId}:{userId}
  channel: string
}>;