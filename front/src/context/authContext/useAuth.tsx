import { useContext } from 'react';
import { authContext } from './authContext';

export const useAuth = () => {
  const ctx = useContext(authContext);
  if (ctx == null) throw new Error('Missing AuthContext provider');
  return ctx;
};