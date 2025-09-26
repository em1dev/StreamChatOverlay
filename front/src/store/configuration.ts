import { create, useStore } from 'zustand';
import { defaultUserConfiguration } from './defaultConfiguration';
import { UserConfiguration } from '@/types/userConfigurationTypes';


interface UserConfigurationStore extends UserConfiguration {
  updateUserConfiguration: (values: Partial<UserConfiguration>) => void,
}

export const userConfigurationStore = create<UserConfigurationStore>()((set, get) => {
  const config = defaultUserConfiguration;

  return {
    ...config,
    updateUserConfiguration: (values) => {
      const prev = get();
      const newConfig = { ...prev, ...values};

      set(() => ({ ...newConfig }));
    },
  };
});

export const useConfiguration = <T>(selector: (state: UserConfigurationStore) => T) => (
  useStore(userConfigurationStore, selector)
);