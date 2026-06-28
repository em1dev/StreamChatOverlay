import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export const deleteChatHandler = async (
  userId: number, chatId: number
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

  return HandlerApiResult.Success(200, null);
};
