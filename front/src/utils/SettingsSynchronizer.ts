import { chatApi } from '@/api/chatApi';
import { resetConfiguration, setInitialState } from '@/store/configurationStore/actions';
import { defaultUserConfiguration } from '@/store/configurationStore/defaultConfiguration';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { useCallback, useEffect } from 'react';
import { useSettingsChangeListener } from '@/hooks/useSettingsChangeListener';
import { useAuth } from '@/store/authStore';

export const SettingsSynchronizer = () => {
  const { session } = useAuth();

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
  }, [session]);

  useSettingsChangeListener(session?.user.id || null, fetchSettings);

  // reload state if session changes
  useEffect(() => {
    if (!session) {
      resetConfiguration();
      return;
    };

    fetchSettings();
  }, [session, fetchSettings]);

  return null;
};
