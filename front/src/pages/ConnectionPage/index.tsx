import { CONNECTIONS_STORAGE_KEY } from '@/store/connectionStorageKey';
import { chatApi } from '@/api/chatApi';
import { useAuth } from '@/context/authContext/useAuth';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router';

export const ConnectionPage = () => {
  const { session, setToken, isLoading, setIsLoading } = useAuth();
  const [search, setSearch] = useSearchParams();
  const params = useParams<{ provider: string }>();

  useEffect(() => {
    if (isLoading) return;
    if (!session) {
      window.close();
      return;
    };
    const provider = params.provider;
    if (provider != 'twitch' && provider != 'youtube')
    {
      window.close();
      return;
    }

    const code = search.get('code');
    if (!code) return;

    setSearch('');
    setIsLoading(true);

    chatApi
      .addNewConnection(session.token, provider, code, location.href)
      .then((resp) => {
        if (resp.hasError)
          return;
        localStorage.setItem(CONNECTIONS_STORAGE_KEY, crypto.randomUUID());
        window.umami?.track('service connection completed');
        window.close();
      });
  }, [session, setToken, search, setSearch, params, isLoading, setIsLoading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontWeight: 'inherit' }}>Connecting</h2>
      <Icon fontSize={50} icon="eos-icons:loading" />
    </div>
  );
};
