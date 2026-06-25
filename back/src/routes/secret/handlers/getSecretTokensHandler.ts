import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { logger } from '../../../logger';
import { db } from '../../../repository/prismaDb';
import { TokenStore } from '../../../TwitchTokenStore';

export interface UserTwitchConnection
{
  clientId: string,
  username: string,
  userId: string,
  accessToken: string
}

export interface UserYoutubeConnection
{
  clientId: string,
  accessToken: string,
  channelId: string
}

export interface SecretResult
{
  settingName: string,
  settingsJsonString: string,
  twitchConnection?: UserTwitchConnection,
  youtubeConnection?: UserYoutubeConnection
}

export const getSecretTokensHandler = async (userId: number, secret: string): Promise<HandlerApiResult<SecretResult>> => {
  const userSettings = await db.setting.findFirst({
    where: {
      userId: userId,
      secretKey: secret
    }
  });

  if (!userSettings) return HandlerApiResult.Error(404, 'No settings found');

  const secretResult:SecretResult = {
    settingsJsonString: userSettings.settingsJson,
    settingName: userSettings.name
  };

  const connections = await AuthApi.getConnections(userId);
  if (connections)
  {
    const twitchConnection = connections.find(c => c.type == 'twitch');
    if (twitchConnection) {
      const twitchCredentials = await TokenStore.getInstance().getTwitchCredentials();
      secretResult.twitchConnection = {
        accessToken: twitchConnection.token,
        clientId: twitchCredentials.clientId,
        userId: twitchConnection.userId,
        username: twitchConnection.displayName.toLowerCase(),
      };
    }

    const youtubeConnection = connections.find(c => c.type == 'youtube');
    if (youtubeConnection) {
      const youtubeCredentials = await TokenStore.getInstance().getYoutubeCredentials();
      secretResult.youtubeConnection = {
        accessToken: youtubeConnection.token,
        channelId: youtubeConnection.userId,
        clientId: youtubeCredentials.clientId,
      };
    }
  }

  return HandlerApiResult.Success(200, secretResult);
};
