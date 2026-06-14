import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { SettingsRepository } from '../../../repository/settingsRepository';

export const recreateUserSettingSecretHandler = async (userId: number): Promise<HandlerApiResult<{ secret: string }>> => {
  const existingSettings = await SettingsRepository.getSettingsForUser(userId);
  if (existingSettings.length == 0)
    return HandlerApiResult.Error(404, 'User has no settings');

  const newSecret = crypto.randomUUID();
  await SettingsRepository.updateSecretKeyForUser(userId, newSecret);

  await AuthApi.revokeConnectionToken(userId);

  return HandlerApiResult.Success(200, { secret: newSecret });
};
