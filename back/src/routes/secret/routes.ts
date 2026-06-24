import z from 'zod';
import { getSecretTokensHandler } from './handlers/getSecretTokensHandler';
import { Router } from 'express';


export const router = Router();

router.post('/secret', async (req, res) => {
  const { secret, userId } = z.object({
    userId: z.number(),
    secret: z.string()
  }).parse(req.body);

  const result = await getSecretTokensHandler(userId, secret);
  result.sendResult(res);
});
