import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export const revokeSettingsSecretHandler = async (
  userId: number,
  settingsId: number
): Promise<HandlerApiResult<{ secret: string }>> => {

  const settings = await db.setting.findUnique({
    where: {
      id: settingsId,
      userId: userId
    }
  });

  if (!settings)
    return HandlerApiResult.Error(404, 'Not found');

  const newSecret = crypto.randomUUID();

  await db.setting.update({
    data: {
      secretKey: newSecret
    },
    where: {
      id: settingsId,
      userId: userId
    }
  });

  // notify connection change to ws clients
  await AuthApi.revokeConnectionToken(userId);

  return HandlerApiResult.Success(200, { secret: newSecret });
};
