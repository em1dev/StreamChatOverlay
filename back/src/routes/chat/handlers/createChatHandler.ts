import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


interface CreatedResult {
  id: number,
  name: string,
  settingsJson: string
}

export const createChatHandler = async (
  userId: number, name: string
): Promise<HandlerApiResult<CreatedResult>> => {
  const created = await db.chat.create({
    data: {
      name,
      userId,
      secretKey: crypto.randomUUID(),
      settingsJson: '',
    }
  });

  return HandlerApiResult.Success(201, {
    id: created.id,
    name: created.name,
    settingsJson: created.settingsJson
  });
};
