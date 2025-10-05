import { AuthApi } from '../../../api/authApi';
import { SettingsRepository } from '../../../repository/settingsRepository';
import { TwitchTokenStore } from '../../../TwitchTokenStore';
import { ChatApiResponse } from '../../../types';

export interface SecretResult
{
  accessToken: string,
  clientId: string,
  twitchUsername: string,
  twitchUserId: string,
  settingsJsonString: string
}

export const getSecretTokensHandler = async (userId: number, secret: string): Promise<ChatApiResponse<SecretResult>> => {
  const settings = await SettingsRepository.getSettingsForUser(userId);
  const userSettings = settings.at(0);

  if (!userSettings) return {
    status: 404,
  };

  if (userSettings.secretKey != secret) return {
    status: 404
  };

  // secret valid at this stage
  const connections = await AuthApi.getConnections(userId);
  if (!connections) return {
    status: 404
  };

  const twitchConnection = connections.find(c => c.type == 'twitch');
  if (!twitchConnection) return {
    status: 404
  };

  const twitchCredentials = await TwitchTokenStore.getInstance().getCredentials();

  return {
    status: 200,
    body: {
      accessToken: twitchConnection.token,
      clientId: twitchCredentials.clientId,
      twitchUserId: twitchConnection.userId,
      twitchUsername: twitchConnection.displayName.toLowerCase(),
      settingsJsonString: userSettings.settingsJson
    }
  };
};