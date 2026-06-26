import { create } from 'zustand';


interface SideMenuStore {
  isOpen: boolean
}

export const setIsSideMenuOpen = (
  newValue: boolean | ((prevValue: boolean) => boolean)
) => {
  useSideMenuStore.setState({
    isOpen: typeof newValue === 'function' ? newValue(useSideMenuStore.getState().isOpen) : newValue
  });
};

export const useSideMenuStore = create<SideMenuStore>()(() => ({
  isOpen: false
}));
