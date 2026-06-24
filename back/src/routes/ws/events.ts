import z from 'zod';

export const SubscribeSchema = z.object({
  type: z.string('subscribe'),
  data: z.object({
    type: z.string('change'),
    userId: z.number()
  })
});

type EventType = 'change';

export interface Event<K extends EventType, T>
{
  type: K,
  data: T
}

export type ChangeEvent = Event<'change', {
  userId: number,
  changeId: string // id of the change to avoid updating the client which emits the event
}>;
