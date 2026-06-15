import { AuthApi } from '../../../api/authApi';
import { youtubeApi } from '../../../api/youtubeApi';
import { YoutubeBroadcastSimple } from '../../../api/youtubeApi/types';
import { HandlerApiResult } from '../../../HandlerApiResult';
import { logger } from '../../../logger';
import { SettingsRepository } from '../../../repository/settingsRepository';

export const getYoutubeBroadcastHandler = async (userId: number, secret: string)
: Promise<HandlerApiResult<YoutubeBroadcastSimple>> => {

  const settings = await SettingsRepository.getSettingsForUser(userId);
  const userSettings = settings.at(0);

  if (!userSettings)
    return HandlerApiResult.Error(404, 'No user settings');

  if (userSettings.secretKey != secret)
    return HandlerApiResult.Error(404, 'No user secret');

  const connections = await AuthApi.getConnections(userId);

  const youtubeConnection = (connections || []).find(c => c.type == 'youtube');
  if (!youtubeConnection)
    return HandlerApiResult.Error(404, 'No youtube connection found');

  const channelId = youtubeConnection.userId;
  const broadcast = await youtubeApi.getLiveBroadcast(channelId, youtubeConnection.token);
  logger.info(broadcast, 'broad');

  if (!broadcast)
    return HandlerApiResult.Error(404, 'No active broadcast found');

  return HandlerApiResult.Success(200, broadcast);
};
