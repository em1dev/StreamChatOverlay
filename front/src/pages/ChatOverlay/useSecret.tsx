import { chatApi } from '@/api/chatApi';
import { setActiveChat, setChats } from '@/store/actions/chatActions';
import { connectToWebsocket } from '@/store/actions/websocketActions';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useParams } from 'react-router';

export interface ConnectionState
{
  hasError: boolean
  isLoading: boolean,
  twitch?: {
    channelId: string,
    channelName: string,
  },
  youtube?: {
    youtubeToken: string
  }
}

export interface SecretResult extends ConnectionState
{
  userId?: number | null,
  secret?: string | null
}

export const useSecret = (): SecretResult => {
  const [search] = useSearchParams();
  const { userId } = useParams<{ userId: string }>();
  const userIdParsed = useMemo(() => {
    if (!userId) return null;
    return parseInt(userId);
  }, [userId]);

  const secret = search.get('s');

  const [state, setState] = useState<ConnectionState>({
    hasError: false,
    isLoading: true,
  });

  useEffect(() => {
    if (!secret || userIdParsed == null) return;
    let ignoreResp = false;

    (async () => {
      const resp = await chatApi
        .getConnectionDetailsFromSecret(userIdParsed, secret);

      if (ignoreResp) return;
      if (resp.hasError) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          hasError: true
        }));
        return;
      }

      const data = resp.data!;
      setChats([{
        id: data.id,
        name: data.name,
        settingsJson: data.settingsJsonString
      }]);
      setActiveChat(data.id);
      connectToWebsocket(null, secret);

      window.umami?.identify(userIdParsed.toString());

      setState({
        hasError: false,
        isLoading: false,
        twitch: data.twitchConnection ? {
          channelId: data.twitchConnection.userId,
          channelName: data.twitchConnection.username
        } : undefined,
        youtube: data.youtubeConnection ? {
          youtubeToken: data.youtubeConnection.accessToken
        } : undefined
      });
    })();

    return () => {
      ignoreResp = true;
    };

  }, [secret, userIdParsed]);

  const result = useMemo(() => ({
    ...state,
    secret,
    userId: userIdParsed
  } satisfies SecretResult), [state, secret, userIdParsed]);

  if (!secret || userIdParsed == null)
    return { hasError: true, isLoading: false } satisfies SecretResult;

  return result;
};
