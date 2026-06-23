import { HandlerApiResult } from '../../../HandlerApiResult';
import { SettingItem, SettingsRepository } from '../../../repository/settingsRepository';

export const getUserSettingsHandler = async (userId: number):Promise<HandlerApiResult<SettingItem>> => {
  let result = await SettingsRepository.getSettingsForUser(userId);
  if (result.length == 0) {
    // create setting
    await SettingsRepository.createSettingsForUser(userId, '', crypto.randomUUID());
    result = await SettingsRepository.getSettingsForUser(userId);
  }

  const settings = result.at(0)!;

  return HandlerApiResult.Success(200, {
    id: settings.id,
    secretKey: settings.secretKey,
    settingsJson: settings.settingsJson,
    userId: settings.userId
  });
};
