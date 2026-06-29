import { useStore } from '..';


export const setIsSideMenuOpen = (
  newValue: boolean | ((prevValue: boolean) => boolean)
) => {
  useStore.setState({
    isSideMenuOpen:
      typeof newValue === 'function'
        ? newValue(useStore.getState().isSideMenuOpen)
        : newValue
  });
};


// modals
export const setChatToDelete = (id: number | null) => {
  if (id == null) {
    useStore.setState({
      chatToDelete: null
    });
    return;
  }

  const { chats } = useStore.getState();
  const itemToDelete = chats.find(s => s.id == id);
  if (!itemToDelete) return;

  useStore.setState({
    chatToDelete: {
      chatId: itemToDelete.id,
      name: itemToDelete.name
    }
  });
};

export const setChatToRename = (id: number | null) => {
  if (id == null) {
    useStore.setState({
      chatToRename: null
    });
    return;
  }

  const { chats } = useStore.getState();
  const itemToRename = chats.find(s => s.id == id);
  if (!itemToRename) return;

  useStore.setState({
    chatToRename: {
      name: itemToRename.name,
      chatId: itemToRename.id
    }
  });
};
