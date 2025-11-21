import { create, useStore } from 'zustand';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { defaultUserConfiguration } from './defaultConfiguration';
import { chatApi } from '@/api/chatApi';
import { Session } from '@/context/authContext/authContext';


interface UserConfigurationStore {
  changeConfigurationId: string,
  hasLoaded: boolean,
  secretKey: string | null,
  userConfiguration: UserConfiguration,
  updateUserConfiguration: (values: Partial<UserConfiguration>, session: Session | null) => void,
  setSecret: (value: string | null) => void,
  setInitialState: (userConfiguration: UserConfiguration, secret: string) => void,
  resetState: () => void,

  pushUpdateWithDebounce: (session: Session) => void,
  updateDebouncerTimeout: NodeJS.Timeout | null
}

export const userConfigurationStore = create<UserConfigurationStore>()((set, get) => {
  return {
    updateDebouncerTimeout: null,
    changeConfigurationId: crypto.randomUUID(),
    hasLoaded: false,
    secretKey: null,
    userConfiguration: defaultUserConfiguration,

    setSecret: (value) => {
      set(() => ({ secretKey: value }));
    },
    updateUserConfiguration: (values, session) => {
      const prev = get().userConfiguration!;
      const newConfig: UserConfiguration = { ...prev, ...values};

      set(() => ({
        userConfiguration: newConfig
      }));

      if (session) {
        get().pushUpdateWithDebounce(session);
      }
    },
    setInitialState: (userConfiguration, secret) => {
      set({
        secretKey: secret,
        userConfiguration: { ...defaultUserConfiguration, ...userConfiguration },
        hasLoaded: true
      });
    },
    pushUpdateWithDebounce: (session: Session) => {
      const existingTimeout = get().updateDebouncerTimeout;
      if (existingTimeout){
        clearTimeout(existingTimeout);
      }
      const newTimeout = setTimeout(() => {
        (async () => {
          const settingsJson = JSON.stringify(get().userConfiguration);

          const changeId = get().changeConfigurationId;
          await chatApi.updateUserSettings(settingsJson, changeId, session.token);
        })();
      }, 1000);
      set({ updateDebouncerTimeout: newTimeout });
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