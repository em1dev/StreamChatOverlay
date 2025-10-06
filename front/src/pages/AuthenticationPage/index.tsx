import { chatApi } from '@/api/chatApi';
import { useAuth } from '@/context/authContext/useAuth';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const AuthenticationPage = () => {
  const { session, setToken, isLoading, setIsLoading } = useAuth();
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
      setIsLoading(true);
      const resp = await chatApi.authenticateWithCode(code);
      if (!resp)
      {
        return;
      }

      setToken(resp.token);
      window.close();
    })();
    return;
  }, [session, setToken, search, setSearch, isLoading, setIsLoading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontWeight: 'inherit' }}>Logging in</h2>
      <Icon fontSize={50} icon="eos-icons:loading" />
    </div>
  );
};