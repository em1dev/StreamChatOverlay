import z from 'zod';
import { Router } from 'express';
import { getUserIdFromToken } from '../../getUserFromToken';
import { HandlerApiResult } from '../../HandlerApiResult';
import { getSettingsHandler } from './handlers/getSettingsHandler';
import { createSettingsHandler } from './handlers/createSettingsHandler';
import { deleteSettingsHandler } from './handlers/deleteSettingsHandler';
import { updateSettingsHandler } from './handlers/updateSettingsHandler';
import { getSettingsSecretHandler } from './handlers/getSettingsSecretHandler';
import { revokeSettingsSecretHandler } from './handlers/revokeSettingsSecretHandler';

export const router = Router();


router.get('/settings', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const result = await getSettingsHandler(userId);
  result.sendResult(res);
});

router.post('/settings', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const { name } = z.object({
    name: z.string(),
  }).parse(req.body);

  const result = await createSettingsHandler(userId, name);
  result.sendResult(res);
});

router.delete('/settings/:id', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return HandlerApiResult.Error(400, 'Invalid id').sendResult(res);
  }

  const result = await deleteSettingsHandler(userId, id);
  result.sendResult(res);
});

router.patch('/settings/:id', async (req, res) => {
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

  const result = await updateSettingsHandler(userId, id, settingsJson, name);
  result.sendResult(res);
});

router.get('/settings/:id/secret', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return HandlerApiResult.Error(400, 'Invalid id').sendResult(res);
  }

  const result = await getSettingsSecretHandler(userId, id);
  result.sendResult(res);
});

router.delete('/settings/:id/secret/revoke', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return HandlerApiResult.Error(400, 'Invalid id').sendResult(res);
  }

  const result = await revokeSettingsSecretHandler(userId, id);
  result.sendResult(res);
});
