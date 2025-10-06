import { dbQuery, Table, UserSettingsColumnKey } from './db';

interface SettingItem {
  id: number,
  userId: string,
  settingsJson: string,
  secretKey: string
}

const getSettingsForUser = async (userId: number) => {
  const result = await dbQuery.all<SettingItem>(
    `SELECT * FROM ${Table.UserSettings} WHERE ${UserSettingsColumnKey.UserId} = $userId`,
    { $userId: userId },
  );
  return result;
};

const createSettingsForUser = async (userId: number, settings: string, secretKey: string) => {
  await dbQuery.run(`
    INSERT INTO ${Table.UserSettings} (${UserSettingsColumnKey.UserId}, ${UserSettingsColumnKey.SettingsJson}, ${UserSettingsColumnKey.SecretKey})
    VALUES ($userId, $settings, $secretKey)
  `, { $userId: userId, $settings: settings, $secretKey: secretKey });
};

const updateSettingJsonForUser = async (userId:number, settings: string) => {
  await dbQuery.run(`
      UPDATE ${Table.UserSettings}
      SET ${UserSettingsColumnKey.SettingsJson} = $settings
      WHERE userId = $userId
    `, {
    $userId: userId,
    $settings: settings
  });
};

const updateSecretKeyForUser = async (userId:number, secretKey: string) => {
  await dbQuery.run(`
      UPDATE ${Table.UserSettings}
      SET ${UserSettingsColumnKey.SecretKey} = $secretKey
      WHERE userId = $userId
    `, {
    $userId: userId,
    $secretKey: secretKey,
  });
};

export const SettingsRepository = {
  getSettingsForUser,
  createSettingsForUser,
  updateSecretKeyForUser,
  updateSettingJsonForUser
};