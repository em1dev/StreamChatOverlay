import { AuthApi } from '../../../api/authApi';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { logger } from '../../../logger';
import { SettingsRepository } from '../../../repository/settingsRepository';
import { TwitchTokenStore } from '../../../TwitchTokenStore';


export interface SecretResult
{
  accessToken: string,
  clientId: string,
  twitchUsername: string,
  twitchUserId: string,
  settingsJsonString: string
}

export const getSecretTokensHandler = async (userId: number, secret: string): Promise<HandlerApiResult<SecretResult>> => {
  const settings = await SettingsRepository.getSettingsForUser(userId);
  const userSettings = settings.at(0);

  if (!userSettings)
    return HandlerApiResult.Error(404, 'No user settings');

  if (userSettings.secretKey != secret)
    return HandlerApiResult.Error(404, 'No user secret');

  // secret valid at this stage
  const connections = await AuthApi.getConnections(userId);
  if (!connections) {
    logger.info(`User ${userId} with valid secret is missing a connection`);
    return HandlerApiResult.Error(404, 'No user connection');
  };

  const twitchConnection = connections.find(c => c.type == 'twitch');
  if (!twitchConnection) {
    logger.info(`User ${userId} with valid secret is missing a connection`);
    return HandlerApiResult.Error(404, 'No twitch connection');
  };

  const twitchCredentials = await TwitchTokenStore.getInstance().getCredentials();

  const resultDetails:SecretResult = {
    accessToken: twitchConnection.token,
    clientId: twitchCredentials.clientId,
    twitchUserId: twitchConnection.userId,
    twitchUsername: twitchConnection.displayName.toLowerCase(),
    settingsJsonString: userSettings.settingsJson
  };

  return HandlerApiResult.Success(200, resultDetails);
};
