import { create, useStore } from 'zustand';

interface SideMenuStore {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void
}

export const sideMenuStore = create<SideMenuStore>()((set) => {
  return {
    isOpen: false,
    setIsOpen: (value: boolean) => {
      set(() => ({ isOpen: value }));
    },
  };
});

export const useSideMenuStore = <T>(selector: (state: SideMenuStore) => T) => (
  useStore(sideMenuStore, selector)
);
