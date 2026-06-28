import z from 'zod';
import { Router } from 'express';
import { getUserIdFromToken } from '../../getUserFromToken';
import { HandlerApiResult } from '../../HandlerApiResult';
import { getChatHandler } from './handlers/getChatHandler';
import { createChatHandler } from './handlers/createChatHandler';
import { deleteChatHandler } from './handlers/deleteChatHandler';
import { patchChatHandler } from './handlers/patchChatHandler';
import { getChatSecretHandler } from './handlers/getChatSecretHandler';
import { revokeChatSecretHandler } from './handlers/revokeChatSecretHandler';
import { getChatDetailsFromSecretHandler } from './handlers/getChatDetailsFromSecretHandler';


export const router = Router();

router.get('/chat', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const result = await getChatHandler(userId);
  result.sendResult(res);
});

router.post('/chat', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const { name } = z.object({
    name: z.string(),
  }).parse(req.body);

  const result = await createChatHandler(userId, name);
  result.sendResult(res);
});

router.delete('/chat/:id', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return HandlerApiResult.Error(400, 'Invalid id').sendResult(res);
  }

  const result = await deleteChatHandler(userId, id);
  result.sendResult(res);
});

router.patch('/chat/:id', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return HandlerApiResult.Error(400, 'Invalid id').sendResult(res);
  }

  const { name, settingsJson } = z.object({
    name: z.string().optional(),
    settingsJson: z.string().optional()
  }).parse(req.body);

  const result = await patchChatHandler(userId, id, settingsJson, name);
  result.sendResult(res);
});

router.get('/chat/:id/secret', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return HandlerApiResult.Error(400, 'Invalid id').sendResult(res);
  }

  const result = await getChatSecretHandler(userId, id);
  result.sendResult(res);
});

router.delete('/chat/:id/secret/revoke', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return HandlerApiResult.Error(400, 'Invalid id').sendResult(res);
  }

  const result = await revokeChatSecretHandler(userId, id);
  result.sendResult(res);
});

router.post('/chat/secret', async (req, res) => {
  const { secret, userId } = z.object({
    userId: z.number(),
    secret: z.string()
  }).parse(req.body);

  const result = await getChatDetailsFromSecretHandler(userId, secret);
  result.sendResult(res);
});
