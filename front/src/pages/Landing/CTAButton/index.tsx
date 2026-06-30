import { Button } from '@/components/core/Button';
import { useStore } from '@/store';
import { signIn } from '@/store/actions/authActions';
import { useNavigate } from 'react-router';

export const CTAButton = () => {
  const navigate = useNavigate();
  const { session, isLoadingSession } = useStore();

  if (session) return (
    <Button
      $variant='primary'
      $size='big'
      onClick={() => {
        navigate('settings');
      }}
    >
      Go to settings
    </Button>
  );

  return (
    <Button
      $variant='primary'
      $size='big'
      disabled={isLoadingSession}
      onClick={signIn}
    >
      Log in
    </Button>
  );
};
