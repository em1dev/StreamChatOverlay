import { signIn, useAuth } from '@/store/authStore';
import { useNavigate } from 'react-router';

export const CTAButton = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();

  if (session) return (
    <button onClick={() => { navigate('settings'); }}>
      Go to settings
    </button>
  );

  return (
    <button disabled={isLoading} onClick={signIn}>
      Log in
    </button>
  );
};
