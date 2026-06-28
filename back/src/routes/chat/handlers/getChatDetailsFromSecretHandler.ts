import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { db } from '../../../repository/prismaDb';
import { TokenStore } from '../../../TwitchTokenStore';

export interface TwitchConnection
{
  clientId: string,
  username: string,
  userId: string,
  accessToken: string
}

export interface YoutubeConnection
{
  clientId: string,
  accessToken: string,
  channelId: string
}

export interface ChatResult
{
  id: number,
  name: string,
  settingsJsonString: string,
  twitchConnection?: TwitchConnection,
  youtubeConnection?: YoutubeConnection
}

export const getChatDetailsFromSecretHandler = async (userId: number, secret: string): Promise<HandlerApiResult<ChatResult>> => {
  const chat = await db.chat.findFirst({
    where: {
      userId: userId,
      secretKey: secret
    }
  });

  if (!chat) return HandlerApiResult.Error(404, 'Not found');

  const chatResult:ChatResult = {
    settingsJsonString: chat.settingsJson,
    name: chat.name,
    id: chat.id,
  };

  const connections = await AuthApi.getConnections(userId);
  if (connections)
  {
    const twitchConnection = connections.find(c => c.type == 'twitch');
    if (twitchConnection) {
      const twitchCredentials = await TokenStore.getInstance().getTwitchCredentials();
      chatResult.twitchConnection = {
        accessToken: twitchConnection.token,
        clientId: twitchCredentials.clientId,
        userId: twitchConnection.userId,
        username: twitchConnection.displayName.toLowerCase(),
      };
    }

    const youtubeConnection = connections.find(c => c.type == 'youtube');
    if (youtubeConnection) {
      const youtubeCredentials = await TokenStore.getInstance().getYoutubeCredentials();
      chatResult.youtubeConnection = {
        accessToken: youtubeConnection.token,
        channelId: youtubeConnection.userId,
        clientId: youtubeCredentials.clientId,
      };
    }
  }

  return HandlerApiResult.Success(200, chatResult);
};
