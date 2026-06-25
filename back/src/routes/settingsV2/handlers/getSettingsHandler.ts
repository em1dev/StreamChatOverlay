import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export interface SettingItem {
  id: number,
  name: string,
  settingsJson: string,
}

export const getSettingsHandler = async (userId: number): Promise<HandlerApiResult<SettingItem[]>> => {
  const settings = await db.setting.findMany({
    where: {
      userId: {
        equals: userId
      },
    },
    orderBy: {
      id: 'asc'
    }
  });

  return HandlerApiResult.Success(200, settings.map((s) => ({
    id: s.id,
    name: s.name,
    settingsJson: s.settingsJson
  })));
};
