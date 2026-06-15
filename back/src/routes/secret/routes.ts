import z from 'zod';
import { api } from '../..';
import { getYoutubeBroadcastHandler } from './handlers/getYoutubeBroadcastHandler';
import { getSecretTokensHandler } from './handlers/getSecretTokensHandler';

api.post('/secret/youtubeBroadcast', async (req, res) => {
  const { secret, userId } = z.object({
    userId: z.number(),
    secret: z.string()
  }).parse(req.body);

  const result = await getYoutubeBroadcastHandler(userId, secret);
  result.sendResult(res);
});

api.post('/secret', async (req, res) => {
  const { secret, userId } = z.object({
    userId: z.number(),
    secret: z.string()
  }).parse(req.body);

  const result = await getSecretTokensHandler(userId, secret);
  result.sendResult(res);
});
