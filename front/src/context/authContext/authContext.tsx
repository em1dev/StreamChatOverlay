import { createContext } from 'react';

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

export interface AuthContext {
  isLoading: boolean,
  authUrl: string | null,
  session: Session | null,
  setIsLoading: (value: boolean) => void,
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
  signIn: () => void,
  logOut: () => void,
  setToken: (token: string) => void
}

export const authContext = createContext<AuthContext | null>(null);