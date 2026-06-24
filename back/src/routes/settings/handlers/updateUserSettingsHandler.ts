import { HandlerApiResult } from '../../../HandlerApiResult';
import { SettingsRepository } from '../../../repository/settingsRepository';
import { WsConnectionManager } from '../../ws/wsConnectionManager';

export const updateUserSettingsHandler = async (
  userId: number,
  changeId: string,
  settingsAsJson: string
): Promise<HandlerApiResult<boolean>> => {

  const existingSettings = await SettingsRepository.getSettingsForUser(userId);
  const userSettings = existingSettings.at(0);
  if (!userSettings)
    return HandlerApiResult.Success(404, false);

  await SettingsRepository.updateSettingJsonForUser(userId, settingsAsJson);

  WsConnectionManager.GetInstance().SendChangeEvent(userId, changeId);

  return HandlerApiResult.Success(200, true);
};
