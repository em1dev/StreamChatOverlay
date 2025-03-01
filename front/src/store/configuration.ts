import { create, useStore } from 'zustand';
import { UserConfiguration } from '../types';
import { defaultUserConfiguration } from './defaultConfiguration';


interface UserConfigurationStore extends UserConfiguration {
  updateUserConfiguration: (values: Partial<UserConfiguration>) => void,
}

export const userConfigurationStore = create<UserConfigurationStore>()((set, get) => {
  const hash = location.hash.slice(1);
  let config = defaultUserConfiguration;
  if (hash) {
    const hashConfig = JSON.parse(decodeURIComponent(hash)) as UserConfiguration;
    config = {
      ...config,
      ...hashConfig,
      ttsConfiguration: {
        ...config.ttsConfiguration,
        ...hashConfig.ttsConfiguration
      }
    };
  }

  return {
    ...config,
    updateUserConfiguration: (values) => {
      const prev = get();
      const newConfig = { ...prev, ...values};

      set(() => ({ ...newConfig }));

      const queryString = encodeURIComponent(JSON.stringify(newConfig));
      location.hash = queryString;
    },
  };
});

export const useConfiguration = <T>(selector: (state: UserConfigurationStore) => T) => (
  useStore(userConfigurationStore, selector)
);