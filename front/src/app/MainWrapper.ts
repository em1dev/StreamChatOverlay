import { chatApi } from '@/api/chatApi';
import { LOCAL_STORAGE_AUTH_KEY, Session, setAuthIsLoading, setSession, User } from '@/store/actions/authActions';
import { decodeJwt } from 'jose';
import router from './routes';
import { useOutlet } from 'react-router';
import '@/fonts/SettingsFonts';


// Auth Listener
const loadTokenFromLocalStorage = async () => {
  setAuthIsLoading(true);
  const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (!token) {
    setSession(null);
    setAuthIsLoading(false);
    return;
  }

  const isValid = await chatApi.verifyToken(token);
  if (!isValid) {
    window.umami?.track('Auth session expired');
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    setSession(null);
    setAuthIsLoading(false);
    return;
  }

  const user = decodeJwt<User>(token);
  const session:Session = { token, user };
  setSession(session);
  setAuthIsLoading(false);
  window.umami?.identify(user.id.toString());
  return session;
};

const onStorageChange = async (e: StorageEvent) => {
  if (e.key !== LOCAL_STORAGE_AUTH_KEY) return;
  const newSession = await loadTokenFromLocalStorage();
  if (newSession) {
    router.navigate('/settings');
  } else {
    router.navigate('/');
  }
};

window.addEventListener('storage', onStorageChange);

loadTokenFromLocalStorage();

export const MainWrapper = () => {
  return useOutlet();
};
