import { chatApi } from '@/api/chatApi';
import { useStore } from '@/store';
import { setAuthIsLoading, setToken } from '@/store/actions/authActions';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';


export const AuthenticationPage = () => {
  const { session, isLoadingSession } = useStore();
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (isLoadingSession) return;

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
  }, [session, search, setSearch, isLoadingSession ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontWeight: 'inherit' }}>Logging in</h2>
      <Icon fontSize={50} icon="eos-icons:loading" />
    </div>
  );
};
