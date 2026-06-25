import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';

interface UpdateSettingsResult
{
  id: number,
  name: string,
  settingsJson: string
}

export const updateSettingsHandler = async (
  userId: number,
  settingsId: number,
  settingsJson?: string,
  name?: string
):Promise<HandlerApiResult<UpdateSettingsResult>> => {

  const settings = await db.setting.findUnique({
    where: {
      id: settingsId,
      userId: userId
    }
  });

  if (!settings) return HandlerApiResult.Error(404, 'Not found');

  const result = await db.setting.update({
    where: {
      id: settingsId,
      userId: userId
    },
    data: {
      name,
      settingsJson
    }
  });

  return HandlerApiResult.Success(200, {
    id: result.id,
    name: result.name,
    settingsJson: result.settingsJson
  });
};
