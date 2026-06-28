import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export const revokeChatSecretHandler = async (
  userId: number,
  chatId: number
): Promise<HandlerApiResult<{ secret: string }>> => {

  const chat = await db.chat.findUnique({
    where: {
      id: chatId,
      userId: userId
    }
  });

  if (!chat)
    return HandlerApiResult.Error(404, 'Not found');

  const newSecret = crypto.randomUUID();

  await db.chat.update({
    data: {
      secretKey: newSecret
    },
    where: {
      id: chatId,
      userId: userId
    }
  });

  // TODO - notify connection change to ws clients
  await AuthApi.revokeConnectionToken(userId);

  return HandlerApiResult.Success(200, { secret: newSecret });
};
