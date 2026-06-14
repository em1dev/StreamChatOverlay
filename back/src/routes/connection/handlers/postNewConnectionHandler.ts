import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { ConnectionProvider } from '../../../types';

export const postNewConnectionHandler = async (
  userId: number, provider: ConnectionProvider, code: string, redirectUrl: string
): Promise<HandlerApiResult<null>> => {
  const isOk = await AuthApi.addNewConnection(userId, provider, code, redirectUrl);
  if (isOk)
    return HandlerApiResult.Success(201, null);

  return HandlerApiResult.Error(500, 'Unable to add connection');
};
