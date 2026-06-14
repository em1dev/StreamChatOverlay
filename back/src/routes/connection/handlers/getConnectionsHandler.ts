import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';

export interface ConnectionDisplayData
{
  displayName: string,
  type: string,
  profilePictureUrl: string,
}

export const getConnectionsHandler = async (userId: number)
: Promise<HandlerApiResult<ConnectionDisplayData[]>> => {
  const resp = await AuthApi.getConnections(userId);
  if (!resp)
    return HandlerApiResult.Error(400, 'Unable to get connections');

  const connections = resp.map(c => ({
    displayName: c.displayName,
    profilePictureUrl: c.profileImageUrl,
    type: c.type
  } satisfies ConnectionDisplayData));

  return HandlerApiResult.Success(200, connections);
};
