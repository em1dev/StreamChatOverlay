import { SettingsRepository } from '../../../repository/settingsRepository';

export const getUserSettingsHandler = async (userId: number) => {
  const result = await SettingsRepository.getSettingsForUser(userId);
  if (result.length == 0) {
    // create setting
    await SettingsRepository.createSettingsForUser(userId, '', crypto.randomUUID());
    const result = await SettingsRepository.getSettingsForUser(userId);
    return result[0]!;
  }

  return result.at(0)!;
};