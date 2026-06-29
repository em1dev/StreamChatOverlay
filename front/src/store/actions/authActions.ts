import { chatApi } from '@/api/chatApi';
import router from '@/app/routes';
import { useStore } from '../';
import { closeWebsocket, connectToWebsocket } from './websocketActions';
import { resetState, setActiveChat, setChats } from './chatActions';


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

// actions
export const signIn = () => {
  window.umami?.track('Sign in initiated');
  window.open(chatApi.authLoginUrl, 'popup', 'toolbar=0,status=0,width=626,height=636');
};

export const logOut = () => {
  window.umami?.track('Sign out');
  window.umami?.identify('');
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  setSession(null);
  router.navigate('/');
};

export const setToken = (token: string) => {
  window.umami?.track('Sign in completed');
  localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
};

export const setSession = (session: Session | null) => {
  useStore.setState({ session });
  if (!session)
  {
    resetState();
    closeWebsocket();
    return;
  }

  (async () => {
    const result = await chatApi.getChat(session.token);
    if (!result.data) return;
    setChats(result.data);
    setActiveChat(result.data.at(0)?.id);
    connectToWebsocket(session, null);
  })();
};

export const setAuthIsLoading = (isLoading: boolean) => {
  useStore.setState({ isLoadingSession: isLoading });
};
