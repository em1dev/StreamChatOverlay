import { chatApi } from '@/api/chatApi';
import { useSettingsChangeListener } from '@/hooks/useSettingsChangeListener';
import { useConfiguration } from '@/store/configuration';
import { defaultUserConfiguration } from '@/store/defaultConfiguration';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const setInitialConfiguration = useConfiguration(s => s.setInitialState);
  const [state, setState] = useState<ConnectionState>({
    hasError: false,
    isLoading: true,
  });

  useEffect(() => {
    if (!secret || userIdParsed == null) return;
    let ignoreResp = false;

    chatApi
      .getConnectionDetailsFromSecret(userIdParsed, secret)
      .then(resp => {
        if (ignoreResp) return;
        if (resp.hasError) {
          setState(prev => ({
            ...prev,
            hasError: true
          }));
          return;
        }

        let settingsParsed = defaultUserConfiguration;
        if (resp.data!.settingsJsonString.length > 0) {
          settingsParsed = JSON.parse(resp.data!.settingsJsonString) as UserConfiguration;
        }

        setInitialConfiguration(settingsParsed, secret);

        setState({
          hasError: false,
          isLoading: false,
          twitch: resp.data?.twitchConnection ? {
            channelId: resp.data.twitchConnection.userId,
            channelName: resp.data.twitchConnection.username
          } : undefined,
          youtube: resp.data?.youtubeConnection ? {
            youtubeToken: resp.data.youtubeConnection.accessToken
          } : undefined
        });

      })
      .catch((e) => {
        console.error(e);
        setState({ hasError: true, isLoading: false });
      });

    return () => {
      ignoreResp = true;
    };

  }, [secret, userIdParsed, setInitialConfiguration]);

  const onSettingsChanged = useCallback(() => {
    if (!secret || userIdParsed == null) return;
    chatApi
      .getConnectionDetailsFromSecret(userIdParsed, secret)
      .then(resp => {
        if (resp.hasError) {
          setState(prev => ({
            ...prev,
            hasError: true
          }));
          return;
        }

        let settingsParsed = defaultUserConfiguration;
        if (resp.data!.settingsJsonString.length > 0) {
          settingsParsed = JSON.parse(resp.data!.settingsJsonString) as UserConfiguration;
        }

        setInitialConfiguration(settingsParsed, secret);
      })
      .catch((e) => {
        console.error(e);
        setState({ hasError: true, isLoading: false });
      });
  }, [secret, setInitialConfiguration, userIdParsed]);

  useSettingsChangeListener(userIdParsed, onSettingsChanged);

  const result = useMemo(() => ({
    ...state,
    secret,
    userId: userIdParsed
  } satisfies SecretResult), [state, secret, userIdParsed]);

  if (!secret || userIdParsed == null)
    return { hasError: true, isLoading: false } satisfies SecretResult;

  return result;
};
