import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';
import { WsConnectionManager } from '../../ws/wsConnectionManager';

export const updateUserSettingsHandler = async (
  userId: number,
  changeId: string,
  settingsAsJson: string
): Promise<HandlerApiResult<boolean>> => {
  const settings = await db.chat
    .findFirst({
      where: {
        userId
      },
      orderBy: {
        id: 'asc'
      }
    });

  if (!settings)
    return HandlerApiResult.Success(404, false);

  await db.chat
    .update({
      data: {
        settingsJson: settingsAsJson
      },
      where: {
        id: settings.id
      }
    });

  WsConnectionManager.GetInstance().SendChangeEvent(userId, changeId);

  return HandlerApiResult.Success(200, true);
};
