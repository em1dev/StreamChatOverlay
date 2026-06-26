import { create } from 'zustand';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { defaultUserConfiguration } from './defaultConfiguration';

interface UserConfigurationStore {
  changeConfigurationId: string,
  hasLoaded: boolean,
  secretKey: string | null,
  userConfiguration: UserConfiguration,
  updateDebouncerTimeout: NodeJS.Timeout | null
}

export const useConfigurationStore = create<UserConfigurationStore>()(() => {
  return {
    updateDebouncerTimeout: null,
    changeConfigurationId: crypto.randomUUID(),
    hasLoaded: false,
    secretKey: null,
    userConfiguration: defaultUserConfiguration,
  };
});
