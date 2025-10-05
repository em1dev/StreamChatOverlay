import { decodeJwt } from 'jose';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { authContext, Session, User } from './authContext';
import { chatApi } from '@/api/chatApi';

const LOCAL_STORAGE_AUTH_KEY = 'CHAT_SESSION';

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const url = await chatApi.getAuthLoginUrl();
      if (url) {
        setAuthUrl(url);
      }
    })();
  }, []);

  const signIn = () => {
    if (!authUrl) return;
    window.open(authUrl, 'popup', 'toolbar=0,status=0,width=626,height=636');
  };

  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    setSession(null);
    navigate('/');
  };

  const setToken = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
  };

  useEffect(() => {
    if (session) return;

    const loadToken = async () => {
      setIsLoading(true);
      const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }

      const isValid = await chatApi.verifyToken(token);
      if (!isValid) {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        setIsLoading(false);
        return;
      }

      const user = decodeJwt<User>(token);
      setSession({ token, user });
      setIsLoading(false);
    };

    const onStorageChange = async (e: StorageEvent) => {
      if (e.key !== LOCAL_STORAGE_AUTH_KEY) return;
      await loadToken();
      navigate('/settings');
    };

    window.addEventListener('storage', onStorageChange);

    loadToken();

    return () => {
      window.addEventListener('storage', onStorageChange);
    };
  }, [navigate, session]);

  return (
    <authContext.Provider value={{
      setIsLoading,
      isLoading,
      authUrl,
      setSession,
      session,
      signIn,
      logOut,
      setToken
    }}>
      {children}
    </authContext.Provider>
  );
};