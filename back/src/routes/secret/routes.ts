import z from 'zod';
import { api } from '../..';
import { getSecretTokensHandler } from './handlers/getSecretTokensHandler';

api.post('/secret', async (req, res) => {
  const { secret, userId } = z.object({
    userId: z.number(),
    secret: z.string()
  }).parse(req.body);

  const result = await getSecretTokensHandler(userId, secret);
  result.sendResult(res);
});
