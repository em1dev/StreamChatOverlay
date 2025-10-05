import { Icon } from '@iconify/react';
import * as S from './styles';
import { useConfiguration } from '@/store/configuration';
import { useCallback, useRef, useState } from 'react';
import { useAuth } from '@/context/authContext/useAuth';
import { chatApi } from '@/api/chatApi';

export const AddToStream = () => 
{
  const { session, logOut } = useAuth();
  const secretKey = useConfiguration(s => s.secretKey);
  const setSecret = useConfiguration(s => s.setSecret);

  const [isLoadingSecret, setIsLoadingSecret] = useState(false);
  const [hasErrorLoadingSecret, setHasErrorLoadingSecret] = useState(false);

  // changes text to copied for a couple of seconds
  const [copiedAnimationDelay, setCopiedAnimationDelay] = useState(false);
  const copiedAnimationRef = useRef<number | null>(null);

  const onResetSecretKey = useCallback(() => {
    (async () => {
      if (!session) return;
      setIsLoadingSecret(true);
      const resp = await chatApi.revokeSecret(session.token);
      if (resp.status == 403) {
        logOut();
        return;
      }

      if (!resp.hasError && resp.data) {
        setSecret(resp.data.secret);
        setIsLoadingSecret(false);
        return;
      }
      setHasErrorLoadingSecret(true);
    })();
  }, [session, logOut, setSecret]);

  const onCopySecretUrlClick = useCallback(() => {
    if (!session) return;
    if (!secretKey) return;
    if (isLoadingSecret) return;
    if (hasErrorLoadingSecret) return;

    const url = `${location.origin}/o/${session.user.id}/?s=${secretKey}`;
    navigator.clipboard.writeText(url);

    setCopiedAnimationDelay(true);
    if (copiedAnimationRef.current) {
      window.clearTimeout(copiedAnimationRef.current);
    }
    copiedAnimationRef.current = window.setTimeout(() => {
      setCopiedAnimationDelay(false);
    }, 1 * 1000);
  }, [session, secretKey, hasErrorLoadingSecret, isLoadingSecret]);

  const clickToCopyText = () => {
    if (copiedAnimationDelay) return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <Icon icon="mingcute:check-2-fill" />
        Copied to clipboard
      </div>
    );

    if (isLoadingSecret) return (
      'Recreating secret url...'
    );

    if (hasErrorLoadingSecret) return (
      'Unable to recreate secret url. Try again later'
    );

    return 'Click to copy the secret url';
  };

  return (
    <>
      <h1>Add chat overlay to stream</h1>

      <S.ClickToCopyBtn 
        disabled={isLoadingSecret || hasErrorLoadingSecret} 
        onClick={onCopySecretUrlClick} 
        type='button'
      >
        {clickToCopyText()}
      </S.ClickToCopyBtn>

      <S.WarningContainer>
        <div>
          <Icon aria-hidden icon="mingcute:alert-fill" />
        </div>
        <div>
          <p>The secret url contains your credential information</p>
          <p>This url should not be shared with anyone or exposed to your stream</p>
          <p>In the case of leaking the secret url. Generate a new secret url to destroy the old one.</p>
          <button
            disabled={isLoadingSecret}
            type='button'
            onClick={onResetSecretKey}
          >
            {isLoadingSecret ? 'Generating secret url...' : 'Generate new secret url'}
          </button>
        </div>
      </S.WarningContainer>

      <S.StepContainer>
        <p>Step 1</p>
        <p>Copy the secret url by clicking the box above</p>
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 2</p>
        <p>Create a browser source in OBS</p>
        <img width={500} src="/img/step2.png" />
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 3</p>
        <p>Paste the secret url on the url box.</p>
        <p>Set the width and height to what size you want the chat to be.</p>
        <p>For example I use 400x900</p>
        <img width={500} src="/img/step3.png" />
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 4</p>
        <p>All done, your chat should be working now</p>
        <p>Remember to refresh your browser source after changing any settings</p>
      </S.StepContainer>
    </>
  );

};