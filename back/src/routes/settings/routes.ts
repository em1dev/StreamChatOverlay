import z from 'zod';
import { api } from '../..';
import { getUserIdFromToken } from '../../getUserFromToken';
import { getUserSettingsHandler } from './handlers/getUserSettingsHandler';
import { updateUserSettingsHandler } from './handlers/updateUserSettingsHandler';
import { recreateUserSettingSecretHandler } from './handlers/recreateUserSettingSecretHandler';

api.get('/settings', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();
  const result = await getUserSettingsHandler(userId);
  result.sendResult(res);
});

api.post('/settings', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const { changeId, settingsJsonString } = z.object({
    changeId: z.string(),
    settingsJsonString: z.string(),
  })
    .parse(req.body);

  const result = await updateUserSettingsHandler(
    userId,
    changeId,
    settingsJsonString
  );

  result.sendResult(res);
});

api.delete('/settings/secret', async (req, res) => {
  const userId = await getUserIdFromToken(req.headers);
  if (!userId) return res.status(403).send();

  const result = await recreateUserSettingSecretHandler(userId);
  result.sendResult(res);
});
