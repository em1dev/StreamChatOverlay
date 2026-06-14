import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { ConnectionProvider } from '../../../types';

export const deleteConnectionHandler = async (userId: number, provider: ConnectionProvider)
: Promise<HandlerApiResult<null>> => {

  const isOk = await AuthApi.deleteConnection(userId, provider);
  if (isOk)
    return HandlerApiResult.Success(200, null);
  return HandlerApiResult.Error(500, 'Unable to delete connection');
};
