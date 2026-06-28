import { useStore } from '@/store';
import { useEffect, useRef } from 'react';

const WS_URL = import.meta.env.VITE_WS_URL;
if (!WS_URL) throw new Error('Missing VITE_WS_URL in .env file');

export const useSettingsChangeListener = (
  userId: number | null,
  onChange: () => void
) => {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (userId == null) return;

    const connection: {
      instance: null | WebSocket,
      reconnectCallback: NodeJS.Timeout | null
    } = {
      instance: null,
      reconnectCallback: null
    };

    const createConnection = () => {
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('Connected to ws change listener');
        ws.send(JSON.stringify({
          type: 'subscribe',
          data: {
            type: 'change',
            userId: userId
          }
        }));
      };

      ws.onmessage = (ev) => {
        const data = ev.data;
        if (typeof data != 'string') return;
        const evParsed = JSON.parse(data);
        if (evParsed['type'] != 'change') return;
        const { changeId } = evParsed['data'] as {
          changeId: string
        };

        // ignore events emitted by this client
        if (changeId == useStore.getState().clientIdentifier) return;
        console.log('Received change event');
        onChangeRef.current();
      };

      ws.onclose = (ev) => {
        if (ev.wasClean) return;
        console.log('lost connection update server, reconnecting...');
        connection.reconnectCallback = setTimeout(createConnection, 5000);
      };

      connection.instance = ws;
    };

    createConnection();

    return () => {
      if (connection.reconnectCallback) {
        clearTimeout(connection.reconnectCallback);
      }
      if (connection.instance) {
        connection.instance.onmessage = null;
        connection.instance.onclose = null;
        connection.instance.close();
      }
    };
  }, [userId]);
};
