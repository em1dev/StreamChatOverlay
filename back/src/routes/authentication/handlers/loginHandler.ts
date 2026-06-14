import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';

export const loginHandler = async (
  code: string, redirectUrl: string
): Promise<HandlerApiResult<{ token: string }>> => {

  const token = await AuthApi.authenticate(code, redirectUrl);
  if (token)
    return HandlerApiResult.Success(200, token);
  return HandlerApiResult.Error(401, 'Invalid auth');
};
