import { createWebsocketClientWithSecret, createWebsocketClientWithToken } from '@/ws';
import { Session } from './authActions';
import { useStore } from '..';


const RECONNECTION_DELAY = 5000;

export const connectToWebsocket = (
  session: Session | null,
  secret: string | null
) => {
  if (!session && !secret) return;

  const onDisconnect = () => {
    console.log('Lost connection to backend ws');
    const { websocketReconnectionTimeout } = useStore.getState();
    if (websocketReconnectionTimeout) {
      clearTimeout(websocketReconnectionTimeout);
    }
    const timeout = setTimeout(() => {
      console.log('Reconnecting to backend ws...');
      connectToWebsocket(session, secret);
    }, RECONNECTION_DELAY);

    useStore.setState({ websocketReconnectionTimeout: timeout, backendWebsocket: null });
  };

  closeWebsocket();

  if (session)
  {
    const ws = createWebsocketClientWithToken(session.token, onDisconnect);
    useStore.setState({ backendWebsocket: ws });
  }

  if (secret)
  {
    const ws = createWebsocketClientWithSecret(secret, onDisconnect);
    useStore.setState({ backendWebsocket: ws });
  }
};

export const closeWebsocket = () => {

  const { websocketReconnectionTimeout, backendWebsocket } = useStore.getState();

  if (websocketReconnectionTimeout) {
    clearTimeout(websocketReconnectionTimeout);
  }

  if (backendWebsocket)
  {
    backendWebsocket.onclose = null;
    backendWebsocket.onmessage = null;
    backendWebsocket.onopen = null;
    backendWebsocket.close();
  }

  useStore.setState({
    backendWebsocket: null,
    websocketReconnectionTimeout: null
  });
};
