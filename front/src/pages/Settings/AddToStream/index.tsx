import { Icon } from '@iconify/react';
import { useStore } from '@/store';
import { useCallback, useRef, useState } from 'react';
import { chatApi } from '@/api/chatApi';
import step2ImgUrl from './img/step2.png';
import step3ImgUrl from './img/step3.png';

import * as S from './styles';
import { logOut } from '@/store/actions/authActions';


export const AddToStream = () =>
{
  const session = useStore(s => s.session);
  const activeChat = useStore(s => s.activeChat);

  const [isRecreatingSecret, setIsRecreatingSecret] = useState(false);
  const [isLoadingSecret, setIsLoadingSecret] = useState(false);
  const [hasErrorLoadingSecret, setHasErrorLoadingSecret] = useState(false);

  // changes text to copied for a couple of seconds
  const [copiedAnimationDelay, setCopiedAnimationDelay] = useState(false);
  const copiedAnimationRef = useRef<number | null>(null);

  const onResetSecretKey = useCallback(() => {
    (async () => {
      if (!session) return;
      if (!activeChat) return;

      window.umami?.track('generated new secret url');
      setIsRecreatingSecret(true);
      const resp = await chatApi.revokeSecret(activeChat.metadata.id, session.token);
      if (resp.status == 403) {
        logOut();
        return;
      }

      if (!resp.hasError && resp.data) {
        setIsRecreatingSecret(false);
        return;
      }
      setHasErrorLoadingSecret(true);
    })();
  }, [session, activeChat]);

  const onCopySecretUrlClick = useCallback(async () => {
    if (!session) return;
    if (!activeChat) return;
    if (isLoadingSecret) return;
    if (hasErrorLoadingSecret) return;

    const chatId = activeChat.metadata.id;
    setIsLoadingSecret(true);
    const result = await chatApi.getSecret(chatId, session.token);
    if (!result.data) return;
    const secretKey = result.data.secret;

    const url = `${location.origin}/o/${session.user.id}/?s=${secretKey}`;
    navigator.clipboard.writeText(url);
    window.umami?.track('copied secret url');

    setIsLoadingSecret(false);
    setCopiedAnimationDelay(true);
    if (copiedAnimationRef.current) {
      window.clearTimeout(copiedAnimationRef.current);
    }
    copiedAnimationRef.current = window.setTimeout(() => {
      setCopiedAnimationDelay(false);
    }, 1 * 1000);
  }, [session, activeChat, hasErrorLoadingSecret, isLoadingSecret]);

  const clickToCopyText = () => {
    if (copiedAnimationDelay) return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <Icon icon="mingcute:check-2-fill" />
        Copied to clipboard
      </div>
    );

    if (isLoadingSecret) return (
      'Fetching url...'
    );

    if (isRecreatingSecret) return (
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
        disabled={isLoadingSecret || isRecreatingSecret || hasErrorLoadingSecret}
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
            disabled={isRecreatingSecret}
            type='button'
            onClick={onResetSecretKey}
          >
            {isRecreatingSecret ? 'Generating secret url...' : 'Generate new secret url'}
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
        <img width={500} src={step2ImgUrl} />
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 3</p>
        <p>Paste the secret url on the url box.</p>
        <p>Set the width and height to what size you want the chat to be.</p>
        <p>For example I use 400x900</p>
        <img width={500} src={step3ImgUrl} />
      </S.StepContainer>

      <S.StepContainer>
        <p>Step 4</p>
        <p>All done, your chat should be working now</p>
      </S.StepContainer>
    </>
  );
};
