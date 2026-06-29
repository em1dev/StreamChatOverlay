import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';
import { WsConnectionManager } from '../../ws/wsConnectionManager';


export const deleteChatHandler = async (
  userId: number, clientId: string, chatId: number
): Promise<HandlerApiResult<null>> => {

  const chat = await db.chat.findUnique({
    where: {
      id: chatId,
      userId: userId
    }
  });

  if (!chat) return HandlerApiResult.Error(404, 'Not found');

  await db.chat.delete({
    where: {
      id: chatId
    }
  });

  WsConnectionManager.GetInstance().sendEvent({
    type: 'chat:delete',
    from: clientId,
    data: {
      id: chatId,
    }
  }, userId);

  return HandlerApiResult.Success(200, null);
};
