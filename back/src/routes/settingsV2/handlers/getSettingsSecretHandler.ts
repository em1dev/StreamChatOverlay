import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export const getSettingsSecretHandler = async (
  userId: number,
  settingsId: number
): Promise<HandlerApiResult<{ secret: string }>> => {

  const result = await db.setting.findUnique({
    where: {
      id: settingsId,
      userId
    },
    select: {
      secretKey: true
    }
  });

  if (!result) return HandlerApiResult.Error(404, 'Not found');

  return HandlerApiResult.Success(200, { secret: result.secretKey });
};
