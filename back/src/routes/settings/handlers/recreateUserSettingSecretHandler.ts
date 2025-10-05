import { AuthApi } from '../../../api/authApi';
import { SettingsRepository } from '../../../repository/settingsRepository';
import { ChatApiResponse } from '../../../types';

export const recreateUserSettingSecretHandler = async (userId: number): Promise<ChatApiResponse<{ secret: string }>> => {
  const existingSettings = await SettingsRepository.getSettingsForUser(userId);
  if (existingSettings.length == 0) return {
    status: 404
  };

  const newSecret = crypto.randomUUID();
  await SettingsRepository.updateSecretKeyForUser(userId, newSecret);

  await AuthApi.revokeConnectionToken(userId);

  return {
    status: 200,
    body: {
      secret: newSecret
    }
  };
};