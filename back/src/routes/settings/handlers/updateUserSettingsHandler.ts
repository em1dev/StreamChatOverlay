import { SettingsRepository } from '../../../repository/settingsRepository';
import { ChatApiResponse } from '../../../types';

export const updateUserSettingsHandler = async (
  userId: number,
  settingsAsJson: string
): Promise<ChatApiResponse<boolean>> => {

  const existingSettings = await SettingsRepository.getSettingsForUser(userId);
  const userSettings = existingSettings.at(0);
  if (!userSettings) return {
    status: 404,
    body: false
  };

  await SettingsRepository.updateSettingJsonForUser(userId, settingsAsJson);

  return {
    status: 200,
    body: true
  };
};