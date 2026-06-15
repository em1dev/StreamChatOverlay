import z from 'zod';

export const SubscribeWithSecretEvent = z.object({
  type: z.string('subscribe-with-secret'),
  data: z.object({
    secret: z.string(),
    userId: z.number()
  })
});
