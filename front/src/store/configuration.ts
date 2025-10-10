import { create, useStore } from 'zustand';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { defaultUserConfiguration } from './defaultConfiguration';


interface UserConfigurationStore {
  hasLoaded: boolean,
  secretKey: string | null,
  userConfiguration: UserConfiguration,
  updateUserConfiguration: (values: Partial<UserConfiguration>) => void,
  setSecret: (value: string | null) => void,
  setInitialState: (userConfiguration: UserConfiguration, secret: string) => void,
  resetState: () => void,
}

export const userConfigurationStore = create<UserConfigurationStore>()((set, get) => {
  return {
    hasLoaded: false,
    secretKey: null,
    userConfiguration: defaultUserConfiguration,

    setSecret: (value) => {
      set(() => ({ secretKey: value }));
    },
    updateUserConfiguration: (values) => {
      const prev = get().userConfiguration!;
      const newConfig: UserConfiguration = { ...prev, ...values};

      set(() => ({
        userConfiguration: newConfig
      }));
    },
    setInitialState: (userConfiguration, secret) => {
      set({
        secretKey: secret,
        userConfiguration: { ...defaultUserConfiguration, ...userConfiguration },
        hasLoaded: true
      });
    },
    resetState: () => {
      set({
        secretKey: null,
        userConfiguration: defaultUserConfiguration,
        hasLoaded: false
      });
    }
  };
});

export const useConfiguration = <T>(selector: (state: UserConfigurationStore) => T) => (
  useStore(userConfigurationStore, selector)
);