import { api } from '..';
import { logger } from '../logger';
import { SettingsRepository } from '../repository/settingsRepository';
import { ChatWsManager } from './chatWsManager';
import { SubscribeWithSecretEvent } from './events';

const HEARTBEAT_INTERVAL = 20 * 1000;

api.ws('/youtube/chat', (ws) => {
  let isAlive = true;

  const interval = setInterval(() => {
    if (!isAlive) {
      clearInterval(interval);
      return ws.terminate();
    }

    isAlive = false;
    ws.ping();
  }, HEARTBEAT_INTERVAL);

  ws.on('close', () => {
    clearInterval(interval);
  });

  ws.on('pong', () => {
    isAlive = true;
  });

  ws.on('message', (msgRaw) => {
    try {
      const msg = msgRaw.toString();
      const msgJson = JSON.parse(msg);
      const subscribeEvent = SubscribeWithSecretEvent.parse(msgJson);
      const secret = subscribeEvent.data.secret;
      const userId = subscribeEvent.data.userId;

      SettingsRepository
        .getSettingsForUser(userId)
        .then(settingList => {
          const settings = settingList.at(0);
          if (!settings) return ws.close();
          if (settings.secretKey !== secret) return ws.close();

          ChatWsManager.getInstance().addNewConnection(userId, ws);
        })
        .catch(() => {
          ws.close();
        });
    } catch(e) {
      logger.info(e);
      ws.close();
    }
  });
});
