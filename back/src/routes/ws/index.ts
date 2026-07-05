import { subscribeEventType, SubscribeSchema, subscribeV2EventType, SubscriptionSchemaV2 } from './events';
import { WsConnectionManager } from './wsConnectionManager';
import { logger } from '../../logger';
import { WebSocket, RawData } from 'ws';
import { getUserIdFromSubscribeEvent } from './getUserIdFromSubscribeEvent';


// time until we disconnect wtihout a proper subscription event
const AUTH_TIMEOUT = 10 * 1000;
const HEARTBEAT_INTERVAL = 20 * 1000;

const parseReceivedMsg = (msgRaw: RawData) => {
  const msg = msgRaw.toString();
  const msgJson = JSON.parse(msg);
  const msgType = msgJson['type'];
  if (typeof msgType != 'string') return;

  if (msgType == subscribeEventType)
  {
    return SubscribeSchema.safeParse(msgJson).data;
  }

  if (msgType == subscribeV2EventType)
  {
    return SubscriptionSchemaV2.safeParse(msgJson).data;
  }
};

export const wsHandler = (ws: WebSocket) => {
  let isAlive = true;

  const authTimeout = setTimeout(() => {
    clearInterval(aliveInterval);
    ws.terminate();
  }, AUTH_TIMEOUT);

  const aliveInterval = setInterval(() => {
    if (!isAlive) {
      clearInterval(aliveInterval);
      return ws.terminate();
    }

    isAlive = false;
    ws.ping();
  }, HEARTBEAT_INTERVAL);

  ws.on('close', () => {
    clearInterval(aliveInterval);
  });

  ws.on('pong', () => {
    isAlive = true;
  });

  ws.on('message', async (msgRaw) => {
    try {
      const event = parseReceivedMsg(msgRaw);
      if (!event) return;

      if (event.type == 'subscribe-v2')
      {
        const userId = await getUserIdFromSubscribeEvent(event);
        if (userId == undefined) return;
        WsConnectionManager.GetInstance().AddConnection(userId, ws, 'v2');
        clearTimeout(authTimeout);
        return;
      }
    } catch (e) {
      logger.info(e);
    }
  });
};
