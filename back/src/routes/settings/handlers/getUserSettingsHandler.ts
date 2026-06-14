import { HandlerApiResult } from '../../../HandlerApiResult';
import { SettingItem, SettingsRepository } from '../../../repository/settingsRepository';

export const getUserSettingsHandler = async (userId: number):Promise<HandlerApiResult<SettingItem>> => {
  const result = await SettingsRepository.getSettingsForUser(userId);
  if (result.length == 0) {
    // create setting
    await SettingsRepository.createSettingsForUser(userId, '', crypto.randomUUID());
    const result = await SettingsRepository.getSettingsForUser(userId);
    return HandlerApiResult.Success(201, result[0]!);
  }

  return HandlerApiResult.Success(200, result.at(0)!);
};
