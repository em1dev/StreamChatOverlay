export interface SubscriptionEvent
{
  type: 'subscribe-v2',
  data: {
    token?: string,
    secret?: string
  }
}

type EventType = 'change' | 'chat:new' | 'chat:rename' | 'chat:settings_update' | 'chat:delete' | 'connection:change' | 'chat:secret_revoke';

export interface Event<K extends EventType, T>
{
  type: K,
  data: T
  from: string, // identifier of who emitted the event
}

export type ChatCreateEvent = Event<'chat:new', {
  id: number
  name: string,
  settingsJson: string
}>;

export type ChatRenameEvent = Event<'chat:rename', {
  id: number
  name: string,
}>;

export type ChatSettingsUpdateEvent = Event<'chat:settings_update', {
  id: number
  settingsJson: string
}>;

export type ChatDeleteEvent = Event<'chat:delete', {
  id: number
}>;

export type ChatSecretRevokeEvent = Event<'chat:secret_revoke', {
  id: number,
}>;

// expect client to re-fetch connection details
export type ConnectionChangeEvent = Event<'connection:change', null>;

export type BackendWebsocketEvent = ChatCreateEvent | ChatRenameEvent | ChatSettingsUpdateEvent | ChatDeleteEvent | ConnectionChangeEvent | ChatSecretRevokeEvent;
