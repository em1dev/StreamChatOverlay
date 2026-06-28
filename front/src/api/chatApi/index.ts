import { connectionApi } from './connectionApi';
import { channelApi } from './channelApi';
import { secretApi } from './secretApi';
import { internalChatApi } from './internalChatApi';
import { authApi } from './authApi';


export const chatApi = {
  ...authApi,
  ...channelApi,
  ...connectionApi,
  ...secretApi,
  ...internalChatApi,
};
