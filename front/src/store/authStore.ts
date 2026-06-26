import { chatApi } from '@/api/chatApi';
import router from '@/app/routes';
import { decodeJwt } from 'jose';
import { create } from 'zustand';


export const LOCAL_STORAGE_AUTH_KEY = 'CHAT_SESSION';

export interface Session {
  user: User,
  token: string
}

export interface User {
  app: string,
  id: number,
  provider: {
    type: string,
    userId: string,
    userLogin: string,
    displayName: string,
    profileImageUrl: string,
  }
}

interface AuthStore {
  isLoading: boolean,
  session: Session | null
}

// actions
export const signIn = () => {
  window.umami?.track('Sign in initiated');
  window.open(chatApi.authLoginUrl, 'popup', 'toolbar=0,status=0,width=626,height=636');
};

export const logOut = () => {
  window.umami?.track('Sign out');
  window.umami?.identify('');
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  useAuth.setState({ session: null });
  router.navigate('/');
};

export const setToken = (token: string) => {
  window.umami?.track('Sign in completed');
  localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
};

export const setSession = (session: Session | null) => {
  useAuth.setState({ session });
};

export const setAuthIsLoading = (isLoading: boolean) => {
  useAuth.setState({ isLoading });
};


// store
export const useAuth = create<AuthStore>()(() => ({
  isLoading: true,
  session: null
}));

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
