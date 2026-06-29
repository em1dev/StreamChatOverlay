import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';
import { WsConnectionManager } from '../../ws/wsConnectionManager';


interface PatchChatResult
{
  id: number,
  name: string,
  settingsJson: string
}

export const patchChatHandler = async (
  userId: number,
  chatId: number,
  clientId: string,
  settingsJson?: string,
  name?: string
):Promise<HandlerApiResult<PatchChatResult>> => {

  const chat = await db.chat.findUnique({
    where: {
      id: chatId,
      userId: userId
    }
  });

  if (!chat) return HandlerApiResult.Error(404, 'Not found');

  if (settingsJson == undefined && name == undefined)
    return HandlerApiResult.Success(200, chat); // nothing to patch

  const result = await db.chat.update({
    where: {
      id: chatId,
      userId: userId
    },
    data: {
      name,
      settingsJson
    }
  });

  if (name != undefined) {
    WsConnectionManager.GetInstance().sendEvent({
      type: 'chat:rename',
      from: clientId,
      data: {
        id: chatId,
        name
      }
    }, userId);
  }

  if (settingsJson != undefined) {
    WsConnectionManager.GetInstance().sendEvent({
      type: 'chat:settings_update',
      from: clientId,
      data: {
        id: chatId,
        settingsJson: result.settingsJson
      }
    }, userId);
  }

  return HandlerApiResult.Success(200, {
    id: result.id,
    name: result.name,
    settingsJson: result.settingsJson
  });
};
