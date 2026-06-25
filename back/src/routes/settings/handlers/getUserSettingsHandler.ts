import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export interface SettingItem {
  id: number,
  userId: number,
  settingsJson: string,
  secretKey: string
}

export const getUserSettingsHandler = async (userId: number):Promise<HandlerApiResult<SettingItem>> => {
  let settings = await db.setting
    .findFirst({
      where: {
        userId
      },
      orderBy: {
        id: 'asc'
      }
    });

  if (!settings) {
    settings = await db.setting.create({
      data: {
        userId,
        name: 'Settings 1',
        secretKey: crypto.randomUUID(),
        settingsJson: '',
      }
    });
  }

  return HandlerApiResult.Success(200, {
    id: settings.id,
    secretKey: settings.secretKey,
    settingsJson: settings.settingsJson,
    userId: settings.userId
  });
};
