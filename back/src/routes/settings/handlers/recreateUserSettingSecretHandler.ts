import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';

export const recreateUserSettingSecretHandler = async (userId: number): Promise<HandlerApiResult<{ secret: string }>> => {
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
    return HandlerApiResult.Error(404, 'Settings not found');

  const newSecret = crypto.randomUUID();

  await db.chat.update({
    data: {
      secretKey: newSecret
    },
    where: {
      id: settings.id
    }
  });

  await AuthApi.revokeConnectionToken(userId);

  return HandlerApiResult.Success(200, { secret: newSecret });
};
