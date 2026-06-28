import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';


export interface Chat {
  id: number,
  name: string,
  settingsJson: string,
}

export const getChatHandler = async (userId: number): Promise<HandlerApiResult<Chat[]>> => {
  const settings = await db.chat.findMany({
    where: {
      userId: {
        equals: userId
      },
    },
    orderBy: {
      id: 'asc'
    }
  });

  return HandlerApiResult.Success(200, settings.map((s) => ({
    id: s.id,
    name: s.name,
    settingsJson: s.settingsJson
  })));
};
