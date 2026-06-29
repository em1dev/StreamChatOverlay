import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { ConnectionProvider } from '../../../types';
import { WsConnectionManager } from '../../ws/wsConnectionManager';

export const deleteConnectionHandler = async (userId: number, clientId: string, provider: ConnectionProvider)
: Promise<HandlerApiResult<null>> => {

  const isOk = await AuthApi.deleteConnection(userId, provider);

  if (!isOk)
    return HandlerApiResult.Error(500, 'Unable to delete connection');

  WsConnectionManager.GetInstance().sendEvent({
    type: 'connection:change',
    from: clientId,
    data: null
  }, userId);

  return HandlerApiResult.Success(200, null);
};
