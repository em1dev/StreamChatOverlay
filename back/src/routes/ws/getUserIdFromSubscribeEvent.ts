import z from 'zod';
import { SubscriptionSchemaV2 } from './events';
import { db } from '../../repository/prismaDb';
import { AuthApi } from '../../api/authApi';
import { decodeJwt } from 'jose';

export const getUserIdFromSubscribeEvent = async (
  event: z.infer<typeof SubscriptionSchemaV2>
) => {
  if (event.data.secret)
  {
    const chat = await db.chat
      .findFirst({
        where: {
          secretKey: event.data.secret
        }
      });
    return chat?.userId;
  }

  if (event.data.token)
  {
    const isValid = await AuthApi.verifyToken(event.data.token);
    if (!isValid) return;
    const tokenPayload = decodeJwt(event.data.token);
    const userId = z.number().safeParse(tokenPayload['id']).data;
    return userId;
  }
};
