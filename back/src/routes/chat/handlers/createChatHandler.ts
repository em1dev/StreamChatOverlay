import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';
import { WsConnectionManager } from '../../ws/wsConnectionManager';


interface CreatedResult {
  id: number,
  name: string,
  settingsJson: string
}

export const createChatHandler = async (
  userId: number, clientId: string, name: string
): Promise<HandlerApiResult<CreatedResult>> => {
  const created = await db.chat.create({
    data: {
      name,
      userId,
      secretKey: crypto.randomUUID(),
      settingsJson: '',
    }
  });

  WsConnectionManager.GetInstance().sendEvent({
    type: 'chat:new',
    from: clientId,
    data: {
      id: created.id,
      name: created.name,
      settingsJson: created.settingsJson
    }
  }, userId);

  return HandlerApiResult.Success(201, {
    id: created.id,
    name: created.name,
    settingsJson: created.settingsJson
  });
};
