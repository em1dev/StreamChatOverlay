import { chatApi } from '@/api/chatApi';
import { Session } from './authActions';
import { useStore } from '..';
import { Chat } from '@/api/chatApi/types';
import { defaultChatSettings } from '../defaultChatSettings';
import { ChatSettings } from '@/types/settingsTypes';


export const renameChat = async (chatId: number, newName: string) => {
  const state = useStore.getState();

  if (!state.session) return;

  const result = await chatApi.updateChatName(chatId, newName, state.session.token);
  if (result.hasError) return;

  const { chats } = state;
  const itemToRename = chats.find(s => s.id == chatId);
  if (!itemToRename) return;

  let { activeChat } = state;
  if (activeChat) {
    activeChat = {
      ...activeChat,
      metadata: {
        ...activeChat.metadata,
        name: newName
      }
    };
  }

  useStore.setState({
    chatToRename: null,
    chats: [
      ...chats.filter(s => s.id != chatId),
      { ...itemToRename, name: newName }
    ],
    activeChat
  });
};

const parseChatSettings = (chat: Chat) => {
  const jsonString = chat.settingsJson;
  if (jsonString.length == 0) return defaultChatSettings;
  return JSON.parse(jsonString) as ChatSettings;
};

export const createChat = async () => {
  const { chats, session } = useStore.getState();
  if (!session) return;

  const count = chats.length;
  const name = count == 0 ? 'Main chat' : `Chat ${count + 1}`;
  const resp = await chatApi.createChat(session.token, name);

  const created = resp.data;
  if (!created) return;

  useStore.setState((prev) => ({
    activeChat: {
      metadata: created,
      settings: defaultChatSettings
    },
    chats: [...prev.chats, created]
  }));
};

export const deleteChat = async (id: number) => {
  const { session } = useStore.getState();
  if (!session) return;

  const result = await chatApi.deleteChat(session.token, id);
  if (result.hasError) return;

  let { chats, activeChat } = useStore.getState();

  chats = chats.filter((m) => m.id != id);
  if (activeChat?.metadata.id == id) {
    const firstChat = chats.at(0) ?? null;
    if (!firstChat) {
      activeChat = null;
    } else {
      activeChat = {
        metadata: firstChat,
        settings: parseChatSettings(firstChat)
      };
    }
  }

  useStore.setState({
    chats,
    activeChat
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
      settings: parseChatSettings(chat)
    }
  });
};

export const setChats = (
  chats: Array<Chat>
) => {
  const firstChat = chats.at(0);
  const activeChatSettings: ChatSettings | null = firstChat
    ? parseChatSettings(firstChat)
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
