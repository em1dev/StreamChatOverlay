import { chatApi } from '@/api/chatApi';
import { Session } from './authActions';
import { useStore } from '..';
import { Chat } from '@/api/chatApi/types';
import { ChatSettings } from '@/types/settingsTypes';
import { parseChatSettingsJson } from '@/utils/parseChatSettingsJson';


export const setChatName = (chatId: number, newName: string) => {
  const state = useStore.getState();

  const { chats } = state;
  const itemToRename = chats.find(s => s.id == chatId);
  if (!itemToRename) return;

  let { activeChat } = state;
  if (activeChat?.metadata.id == chatId) {
    activeChat = {
      ...activeChat,
      metadata: {
        ...activeChat.metadata,
        name: newName
      }
    };
  }

  useStore.setState({
    chats: [
      ...chats.filter(s => s.id != chatId),
      { ...itemToRename, name: newName }
    ],
    activeChat
  });
};

export const addChat = (chat: Chat) => {
  const { activeChat } = useStore.getState();

  useStore.setState((prev) => ({
    activeChat: activeChat ?? {
      metadata: chat,
      settings: parseChatSettingsJson(chat)
    },
    chats: [...prev.chats, chat]
  }));
};

export const removeChat = (id: number) => {
  let { chats, activeChat, chatToDelete, chatToRename } = useStore.getState();

  chats = chats.filter((m) => m.id != id);
  if (activeChat?.metadata.id == id) {
    const firstChat = chats.at(0) ?? null;
    if (!firstChat) {
      activeChat = null;
    } else {
      activeChat = {
        metadata: firstChat,
        settings: parseChatSettingsJson(firstChat)
      };
    }
  }

  // keeps reference to avoid re-render if its not the one to delete
  chatToRename = chatToRename?.chatId == id ? null : chatToRename;
  chatToDelete = chatToDelete?.chatId == id ? null : chatToDelete;

  useStore.setState({
    chats,
    activeChat,
    chatToRename ,
    chatToDelete
  });
};

export const setActiveChat = (id: number | undefined) => {
  if (id === undefined) {
    useStore.setState({ activeChat: null });
    return;
  }

  const chat = useStore
    .getState()
    .chats
    .find(s => s.id == id);

  if (!chat) {
    useStore.setState({ activeChat: null });
    return;
  }

  useStore.setState({
    activeChat: {
      metadata: chat,
      settings: parseChatSettingsJson(chat)
    }
  });
};

export const setChats = (
  chats: Array<Chat>
) => {
  const firstChat = chats.at(0);
  const activeChatSettings: ChatSettings | null = firstChat
    ? parseChatSettingsJson(firstChat)
    : null;

  useStore.setState({
    chats,
    activeChat: (firstChat && activeChatSettings)
      ? {
        metadata: firstChat,
        settings: activeChatSettings
      }
      : null
  });
};

export const setChatSettingsJson = (chatId: number, settingsJson: string) => {
  let { activeChat, chats } = useStore.getState();

  const existingChat = chats.find(c => c.id === chatId);
  if (existingChat) {
    chats = [
      ...chats.filter(m => m.id !== chatId),
      {
        ...existingChat,
        settingsJson
      }
    ];
  }

  if (activeChat?.metadata.id === chatId)
  {
    const metadata:Chat = {
      ...activeChat.metadata,
      settingsJson: settingsJson
    };

    activeChat = {
      metadata,
      settings: parseChatSettingsJson(metadata)
    };
  }

  useStore.setState({
    activeChat,
    chats
  });
};

export const updateChatSettings = (values: Partial<ChatSettings>) => {
  const { session } = useStore.getState();
  const { activeChat, chats } = useStore.getState();

  if (!activeChat || !session) return;

  const updatedSettings: ChatSettings = { ...activeChat.settings, ...values };
  const updatedSettingsJson = JSON.stringify(updatedSettings);

  const updatedChat: Chat = {
    ...activeChat.metadata,
    settingsJson: updatedSettingsJson
  };

  const updatedChatList: Array<Chat> = [
    ...chats.filter(m => m.id !== activeChat.metadata.id),
    updatedChat
  ];

  useStore.setState({
    activeChat: {
      metadata: updatedChat,
      settings: updatedSettings
    },
    chats: updatedChatList
  });

  pushUpdateWithDebounce(session, activeChat.metadata.id, updatedSettings);
};

const pushUpdateWithDebounce = (
  session: Session,
  chatId: number,
  chatSettings: ChatSettings
) => {
  const existingTimeout = useStore.getState().updateDebouncerTimeout;
  if (existingTimeout){
    clearTimeout(existingTimeout);
  }
  const newTimeout = setTimeout(() => {
    (async () => {
      const { clientIdentifier } = useStore.getState();

      const settingsJson = JSON.stringify(chatSettings);

      await chatApi.updateChatSettings(
        chatId, settingsJson, clientIdentifier, session.token
      );
    })();
  }, 1000);

  useStore.setState({ updateDebouncerTimeout: newTimeout });
};

export const resetState = () => {
  useStore.setState({
    chatToDelete: null,
    chatToRename: null,
    chats: [],
    clientIdentifier: crypto.randomUUID(),
    session: null,
    activeChat: null,
  });
};
