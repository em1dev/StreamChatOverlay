import z from 'zod';

export const subscribeEventType = 'subscribe';
export const SubscribeSchema = z.object({
  type: z.literal(subscribeEventType),
  data: z.object({
    type: z.string('change'),
    userId: z.number()
  })
});

export const subscribeV2EventType = 'subscribe-v2';
export const SubscriptionSchemaV2 = z.object({
  type: z.literal(subscribeV2EventType),
  data: z.object({
    token: z.string().optional(),
    secret: z.string().optional()
  })
});

type EventType = 'change' | 'chat:new' | 'chat:rename' | 'chat:settings_update' | 'chat:delete' | 'connection:change' | 'chat:secret_revoke';

export interface Event<K extends EventType, T>
{
  type: K,
  data: T
  from: string, // identifier of who emitted the event
}

// legacy event
export type ChangeEvent = Event<'change', {
  userId: number,
  changeId: string // id of the change to avoid updating the client which emits the event
}>;

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

export type WebsocketEvent = ChangeEvent | ChatCreateEvent | ChatRenameEvent | ChatSettingsUpdateEvent | ChatDeleteEvent | ConnectionChangeEvent | ChatSecretRevokeEvent;
