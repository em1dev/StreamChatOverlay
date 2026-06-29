import { useStore } from '@/store';
import { BackendWebsocketEvent, SubscriptionEvent } from './events';
import { createChatEventHandler } from './eventHandlers/createChatEventHandler';
import { deleteChatEventHandler } from './eventHandlers/deleteChatEventHandler';
import { renameChatEventHandler } from './eventHandlers/renameChatEventHandler';
import { updateChatSettingsEventHandler } from './eventHandlers/updateChatSettingsEventHandler';
import { chatSecretRevokedEventHandler } from './eventHandlers/chatSecretRevokedEventHandler';
import { connectionChangedEventHandler } from './eventHandlers/connectionChangedEventHandler';


const WS_URL = import.meta.env.VITE_WS_URL;
if (!WS_URL) throw new Error('Missing VITE_WS_URL in .env file');

export const createWebsocketClientWithToken = (token: string, onLostConnection: () => void) => {
  const ws = new WebSocket(WS_URL);
  ws.onopen = () => {
    console.log('Connecting to backend WS with token');
    ws.send(JSON.stringify({
      type: 'subscribe-v2',
      data: { token }
    } satisfies SubscriptionEvent));
  };

  attachHandlers(ws, onLostConnection);

  return ws;
};

export const createWebsocketClientWithSecret = (secret: string, onLostConnection: () => void) => {
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log('Connecting to backend WS with secret');
    ws.send(JSON.stringify({
      type: 'subscribe-v2',
      data: { secret }
    } satisfies SubscriptionEvent));
  };

  attachHandlers(ws, onLostConnection);

  return ws;
};

const handleEvent = (event: BackendWebsocketEvent) => {

  switch (event.type)
  {
    case 'chat:new':
      createChatEventHandler(event);
      break;
    case 'chat:delete':
      deleteChatEventHandler(event);
      break;
    case 'chat:rename':
      renameChatEventHandler(event);
      break;
    case 'chat:settings_update':
      updateChatSettingsEventHandler(event);
      break;
    case 'chat:secret_revoke':
      chatSecretRevokedEventHandler(event);
      break;
    case 'connection:change':
      connectionChangedEventHandler(event);
      break;
  }
};

const attachHandlers = (ws: WebSocket, onLostConnection: () => void) => {
  ws.onmessage = (ev) => {
    const data = ev.data;
    if (typeof data != 'string') return;
    const event = JSON.parse(data) as BackendWebsocketEvent;

    const clientId = useStore.getState().clientIdentifier;
    // ignore events emitted by this client
    if (event.from === clientId) return;
    handleEvent(event);
  };

  ws.onclose = (ev) => {
    if (ev.wasClean) return;
    onLostConnection();
  };
};
