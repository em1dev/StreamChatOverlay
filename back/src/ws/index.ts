import { api } from '..';
import { SubscribeSchema } from './events';
import { WsConnectionManager } from './wsConnectionManager';

api.ws('/', (ws) => {
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