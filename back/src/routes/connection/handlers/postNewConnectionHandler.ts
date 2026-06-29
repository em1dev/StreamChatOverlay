import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { ConnectionProvider } from '../../../types';
import { WsConnectionManager } from '../../ws/wsConnectionManager';

export const postNewConnectionHandler = async (
  userId: number, clientId: string, provider: ConnectionProvider, code: string, redirectUrl: string
): Promise<HandlerApiResult<null>> => {
  const isOk = await AuthApi.addNewConnection(userId, provider, code, redirectUrl);

  if (!isOk)
    return HandlerApiResult.Error(500, 'Unable to add connection');

  WsConnectionManager.GetInstance().sendEvent({
    type: 'connection:change',
    from: clientId,
    data: null
  }, userId);

  return HandlerApiResult.Success(201, null);
};
