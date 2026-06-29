import { CONNECTIONS_STORAGE_KEY } from '@/store/connectionStorageKey';
import { chatApi } from '@/api/chatApi';
import { Connection } from '@/api/chatApi/types';
import { useCallback, useEffect, useState } from 'react';
import { ConnectionItem } from './ConnectionItem';
import { useChatSettings, useStore } from '@/store';
import { updateChatSettings } from '@/store/actions/chatActions';


type LoadingState = Record<Connection['type'], boolean>;

export const Connections = () => {
  const { session } = useStore();
  const allowedConnections = useChatSettings(state => state.allowedConnections);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState<LoadingState>({
    twitch: true,
    youtube: true,
  });

  useEffect(() => {
    let ignore = false;
    if (!session) return;
    chatApi.getConnections(session.token)
      .then((resp) => {
        if (!resp.data)
          return;
        if (ignore) return;
        setConnections(resp.data);
        setIsLoading({
          twitch: false,
          youtube: false
        });
      });

    return () => {
      ignore = true;
    };
  }, [session]);

  const getConnections = useCallback(async(token: string) => {
    const resp = await chatApi.getConnections(token);
    if (!resp.data) return;
    setConnections(resp.data);
  }, []);

  useEffect(() => {
    const onStorageEvent = (e:StorageEvent) => {
      if (e.key != CONNECTIONS_STORAGE_KEY)
        return;
      if (!session)
        return;
      getConnections(session.token);
    };
    window.addEventListener('storage', onStorageEvent);

    return () => {
      window.removeEventListener('storage', onStorageEvent);
    };
  }, [session, getConnections]);

  const onEnableService = useCallback(async (type: Connection['type'], isEnabled: boolean) => {
    updateChatSettings({
      allowedConnections: {
        ...allowedConnections,
        [type]: isEnabled
      }
    });
  }, [allowedConnections]);

  const onDeleteConnection = useCallback(async (type: Connection['type']) => {
    setIsLoading(v => ({ ...v, [type]: true }));
    if (!session) return;

    window.umami?.track('removed service connection');
    await chatApi.deleteConnection(session.token, type);
    localStorage.setItem(CONNECTIONS_STORAGE_KEY, crypto.randomUUID());
    await getConnections(session.token);
    setIsLoading(v => ({ ...v, [type]: false }));
  }, [session, getConnections]);

  const onNewConnection = useCallback((type: Connection['type']) => {
    if (!session) return;
    window.umami?.track('new service connection initiated');
    const url = chatApi.connectionUrl(type);
    window.open(url, 'popup', 'toolbar=0,status=0,width=626,height=636');
  }, [session]);

  const twitchConnection = connections.filter(c => c.type == 'twitch').at(0);
  //const youtubeConnection = connections.filter(c => c.type == 'youtube').at(0);

  if (!session)
    return null;

  return (
    <>
      <h1>Connections</h1>
      <p>Connections are shared between configurations but can be disable individually.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
        <ConnectionItem
          enabled={allowedConnections.twitch}
          onEnabledChanged={onEnableService}
          isLoading={isLoading.twitch}
          type='twitch'
          existingConnection={twitchConnection}
          onDeleteConnection={onDeleteConnection}
          onNewConnection={onNewConnection}
        />

        {/*
        <ConnectionItem
          enabled={allowedConnections.youtube}
          onEnabledChanged={onEnableService}
          isLoading={isLoading.youtube}
          type='youtube'
          existingConnection={youtubeConnection}
          onDeleteConnection={onDeleteConnection}
          onNewConnection={onNewConnection}
        />
      */}
      </div>
    </>
  );
};
