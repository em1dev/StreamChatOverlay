import z from 'zod';
import { getUserIdFromToken } from '../../util/getUserFromToken';
import { getConnectionsHandler } from './handlers/getConnectionsHandler';
import { deleteConnectionHandler } from './handlers/deleteConnectionHandler';
import { ConnectionProvider } from '../../types';
import { getConnectionUrlHandler } from './handlers/getConnectionUrlHandler';
import { postNewConnectionHandler } from './handlers/postNewConnectionHandler';
import { Router } from 'express';
import { getClientIdFromHeader } from '../../util/getClientIdFromHeader';


export const router = Router();

router.get('/connection', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const result = await getConnectionsHandler(userId);
  result.sendResult(res);
});

const validProviders = [
  'twitch',
  'youtube'
] satisfies Array<ConnectionProvider>;

router.get('/connection/:provider/url', async (req, res) => {
  const provider = z
    .enum(validProviders)
    .parse(req.params.provider);

  const { redirectUrl } = z.object({
    redirectUrl: z.string()
  }).parse(req.query);

  const url = await getConnectionUrlHandler(redirectUrl, provider);
  if (!url)
    return res.status(500).send();

  res.redirect(url);
});

router.post('/connection/:provider', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  // optional for now
  const clientId = await getClientIdFromHeader(req.headers) ?? '';

  const provider = z
    .enum(validProviders)
    .parse(req.params.provider);

  const { redirectUrl, code } = z.object({
    redirectUrl: z.string(),
    code: z.string()
  }).parse(req.body);

  const result = await postNewConnectionHandler(userId, clientId, provider, code, redirectUrl);
  result.sendResult(res);
});

router.delete('/connection/:provider', async (req, res) => {
  const provider = z
    .enum(validProviders)
    .parse(req.params.provider);

  // optional for now
  const clientId = await getClientIdFromHeader(req.headers) ?? '';

  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const result = await deleteConnectionHandler(userId, clientId, provider);
  result.sendResult(res);
});
