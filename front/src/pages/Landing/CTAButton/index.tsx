import { useStore } from '@/store';
import { signIn } from '@/store/actions/authActions';
import { useNavigate } from 'react-router';

export const CTAButton = () => {
  const navigate = useNavigate();
  const { session, isLoadingSession } = useStore();

  if (session) return (
    <button onClick={() => { navigate('settings'); }}>
      Go to settings
    </button>
  );

  return (
    <button disabled={isLoadingSession} onClick={signIn}>
      Log in
    </button>
  );
};
