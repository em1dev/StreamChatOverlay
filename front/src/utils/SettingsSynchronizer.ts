import { chatApi } from '@/api/chatApi';
import { useAuth } from '@/context/authContext/useAuth';
import { userConfigurationStore } from '@/store/configuration';
import { defaultUserConfiguration } from '@/store/defaultConfiguration';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { useCallback, useEffect } from 'react';
import { useSettingsChangeListener } from '@/hooks/useSettingsChangeListener';

export const SettingsSynchronizer = () => {
  const { session } = useAuth();
  const resetState = userConfigurationStore(c => c.resetState);
  const setInitialState = userConfigurationStore(c => c.setInitialState);

  const fetchSettings = useCallback(async () => {
    if (!session) return;
    const userSettings = await chatApi.getUserSettings(session.token);
    if (userSettings.hasError) throw new Error('Unable to connect to server');
    const { settingsJson, secretKey } = userSettings.data!;

    let parsedConfig = defaultUserConfiguration;
    if (settingsJson.length > 0) {
      parsedConfig = JSON.parse(settingsJson) as UserConfiguration;
    }

    setInitialState(parsedConfig, secretKey);
  }, [session, setInitialState]);

  useSettingsChangeListener(session?.user.id || null, fetchSettings);

  // reload state if session changes
  useEffect(() => {
    if (!session) {
      resetState();
      return;
    };

    fetchSettings();
  }, [session, setInitialState, resetState, fetchSettings]);

  return null;
};