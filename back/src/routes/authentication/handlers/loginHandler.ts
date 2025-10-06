import { AuthApi } from '../../../api/authApi';

export const loginHandler = async (code: string, redirectUrl: string) => {
  return await AuthApi.authenticate(code, redirectUrl);
};