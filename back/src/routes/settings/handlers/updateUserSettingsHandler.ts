import { SettingsRepository } from '../../../repository/settingsRepository';
import { ChatApiResponse } from '../../../types';
import { WsConnectionManager } from '../../../ws/wsConnectionManager';

export const updateUserSettingsHandler = async (
  userId: number,
  changeId: string,
  settingsAsJson: string
): Promise<ChatApiResponse<boolean>> => {

  const existingSettings = await SettingsRepository.getSettingsForUser(userId);
  const userSettings = existingSettings.at(0);
  if (!userSettings) return {
    status: 404,
    body: false
  };

  await SettingsRepository.updateSettingJsonForUser(userId, settingsAsJson);

  WsConnectionManager.GetInstance().SendChangeEvent(userId, changeId);

  return {
    status: 200,
    body: true
  };
};