import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export const deleteSettingsHandler = async (userId: number, settingsId: number):Promise<HandlerApiResult<null>> => {

  const settings = await db.setting.findUnique({
    where: {
      id: settingsId,
      userId: userId
    }
  });

  if (!settings) return HandlerApiResult.Error(404, 'Not found');

  await db.setting.delete({
    where: {
      id: settingsId
    }
  });

  return HandlerApiResult.Success(200, null);
};
