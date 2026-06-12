import { api } from '..';
import { SubscribeSchema } from './events';
import { WsConnectionManager } from './wsConnectionManager';

const HEARTBEAT_INTERVAL = 20 * 1000;

api.ws('/', (ws) => {
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
      const subscribeEvent = SubscribeSchema.parse(msgJson);
      const userId = subscribeEvent.data.userId;
      WsConnectionManager.GetInstance().AddConnection(userId, ws);
    } catch(e) {
      console.log(e);
    }
  });
});
