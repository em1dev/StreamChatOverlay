import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';
import { WsConnectionManager } from '../../ws/wsConnectionManager';


export const revokeChatSecretHandler = async (
  userId: number,
  chatId: number,
  clientId: string
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

  await AuthApi.revokeConnectionToken(userId);

  WsConnectionManager.GetInstance().sendEvent({
    type: 'chat:secret_revoke',
    from: clientId,
    data: {
      id: chatId,
    }
  }, userId);

  return HandlerApiResult.Success(200, { secret: newSecret });
};
