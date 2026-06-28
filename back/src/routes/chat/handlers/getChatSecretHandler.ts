import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export const getChatSecretHandler = async (
  userId: number,
  chatId: number
): Promise<HandlerApiResult<{ secret: string }>> => {

  const result = await db.chat.findUnique({
    where: {
      id: chatId,
      userId
    },
    select: {
      secretKey: true
    }
  });

  if (!result) return HandlerApiResult.Error(404, 'Not found');

  return HandlerApiResult.Success(200, { secret: result.secretKey });
};
