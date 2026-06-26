import { CONNECTIONS_STORAGE_KEY } from '@/store/connectionStorageKey';
import { chatApi } from '@/api/chatApi';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router';
import { setAuthIsLoading, useAuth } from '@/store/authStore';


export const ConnectionPage = () => {
  const { session, isLoading } = useAuth();
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
    setAuthIsLoading(true);

    chatApi
      .addNewConnection(session.token, provider, code, location.href)
      .then((resp) => {
        if (resp.hasError)
          return;
        localStorage.setItem(CONNECTIONS_STORAGE_KEY, crypto.randomUUID());
        window.umami?.track('service connection completed');
        window.close();
      });
  }, [session, search, setSearch, params, isLoading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontWeight: 'inherit' }}>Connecting</h2>
      <Icon fontSize={50} icon="eos-icons:loading" />
    </div>
  );
};
