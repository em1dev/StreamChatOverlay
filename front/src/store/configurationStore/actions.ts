import { chatApi } from '@/api/chatApi';
import { Session, useAuth } from '../authStore';
import { useConfigurationStore } from '.';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { defaultUserConfiguration } from './defaultConfiguration';


export const updateUserConfiguration = (values: Partial<UserConfiguration>) => {
  const { session } = useAuth.getState();
  const prev = useConfigurationStore.getState().userConfiguration;
  const newConfig: UserConfiguration = { ...prev, ...values};

  useConfigurationStore.setState({
    userConfiguration: newConfig
  });

  if (session) {
    pushUpdateWithDebounce(session);
  }
};

export const setSecret = (value: string | null) => {
  useConfigurationStore.setState({ secretKey: value });
};

export const setInitialState = (
  userConfiguration: UserConfiguration,
  secret: string
) => {
  const newConfig = {
    ...defaultUserConfiguration,
    ...userConfiguration,
    ttsConfiguration: {
      ...defaultUserConfiguration.ttsConfiguration,
      ...userConfiguration.ttsConfiguration
    }
  } satisfies UserConfiguration;
  useConfigurationStore.setState({
    secretKey: secret,
    userConfiguration: newConfig,
    hasLoaded: true
  });
  return newConfig;
};

export const resetConfiguration = () => {
  useConfigurationStore.setState({
    secretKey: null,
    userConfiguration: defaultUserConfiguration,
    hasLoaded: false
  });
};

export const pushUpdateWithDebounce = (session: Session) => {
  const existingTimeout = useConfigurationStore.getState().updateDebouncerTimeout;
  if (existingTimeout){
    clearTimeout(existingTimeout);
  }
  const newTimeout = setTimeout(() => {
    (async () => {
      const {
        userConfiguration,
        changeConfigurationId
      } = useConfigurationStore.getState();

      const settingsJson = JSON.stringify(userConfiguration);

      const changeId = changeConfigurationId;
      await chatApi.updateUserSettings(settingsJson, changeId, session.token);
    })();
  }, 1000);

  useConfigurationStore.setState({ updateDebouncerTimeout: newTimeout });
};
