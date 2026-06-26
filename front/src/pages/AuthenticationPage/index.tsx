import { chatApi } from '@/api/chatApi';
import { setAuthIsLoading, setToken, useAuth } from '@/store/authStore';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const AuthenticationPage = () => {
  const { session, isLoading } = useAuth();
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (isLoading) return;

    if (session) {
      window.close();
    };

    const code = search.get('code');
    if (!code) return;

    setSearch('');

    (async () => {
      setAuthIsLoading(true);
      const resp = await chatApi.authenticateWithCode(code);
      if (!resp)
      {
        return;
      }

      setToken(resp.token);
      window.close();
    })();
    return;
  }, [session, search, setSearch, isLoading ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontWeight: 'inherit' }}>Logging in</h2>
      <Icon fontSize={50} icon="eos-icons:loading" />
    </div>
  );
};
