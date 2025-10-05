import { chatApi } from '@/api/chatApi';
import { useAuth } from '@/context/authContext/useAuth';
import { userConfigurationStore } from '@/store/configuration';
import { defaultUserConfiguration } from '@/store/defaultConfiguration';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { useEffect } from 'react';
import { useDebounce } from './useDebounce';

export const SettingsSynchronizer = () => {
  const { session, logOut } = useAuth();
  const hasLoaded = userConfigurationStore(c => c.hasLoaded);
  const resetState = userConfigurationStore(c => c.resetState);
  const setInitialState = userConfigurationStore(c => c.setInitialState);
  const userConfiguration = userConfigurationStore(c => c.userConfiguration);
  const debouncedUserConfiguration = useDebounce(userConfiguration, 1000);

  // reload state if session changes
  useEffect(() => {
    if (!session) {
      resetState();
      return;
    };

    (async () => {
      const userSettings = await chatApi.getUserSettings(session.token);
      if (userSettings.hasError) throw new Error('Unable to connect to server');
      const { settingsJson, secretKey } = userSettings.data!;

      let parsedConfig = defaultUserConfiguration;
      if (settingsJson.length > 0) {
        parsedConfig = JSON.parse(settingsJson) as UserConfiguration;
      }

      setInitialState(parsedConfig, secretKey);
    })();
  }, [session, setInitialState, resetState]);

  // save state to server
  useEffect(() => {
    if (!debouncedUserConfiguration) return;
    if (!session) return;
    if (!hasLoaded) return;

    console.log('Saving configuration...');
    (async () => {
      const settingsJson = JSON.stringify(debouncedUserConfiguration);
      const resp = await chatApi.updateUserSettings(settingsJson, session.token);
      if (resp.status == 403)
      {
        logOut();
      }
    })();
  }, [debouncedUserConfiguration, session, hasLoaded, logOut]);

  return null;
};