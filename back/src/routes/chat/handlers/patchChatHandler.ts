import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


interface PatchChatResult
{
  id: number,
  name: string,
  settingsJson: string
}

export const patchChatHandler = async (
  userId: number,
  chatId: number,
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

  return HandlerApiResult.Success(200, {
    id: result.id,
    name: result.name,
    settingsJson: result.settingsJson
  });
};
