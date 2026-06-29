import { create } from 'zustand';
import { Session } from './actions/authActions';
import { ChatSettings } from '@/types/settingsTypes';
import { Chat } from '@/api/chatApi/types';


interface Store {
  websocketReconnectionTimeout: NodeJS.Timeout | null,
  backendWebsocket: WebSocket | null,

  isLoadingSession: boolean,
  session: Session | null,

  isSideMenuOpen: boolean,
  voices: Array<SpeechSynthesisVoice>,

  // identifies the client to avoid refreshes on receiving websocket change events
  clientIdentifier: string,

  updateDebouncerTimeout: NodeJS.Timeout | null,

  chats: Array<Chat>,
  activeChat: {
    metadata: Chat,
    settings: ChatSettings
  } | null

  chatToDelete: {
    chatId: number,
    name: string
  } | null,

  chatToRename: {
    chatId: number,
    name: string
  } | null
}

export const useStore = create<Store>()(() => {
  return {
    websocketReconnectionTimeout: null,
    backendWebsocket: null,

    isLoadingSession: true,
    session: null,

    isSideMenuOpen: false,

    voices: [],

    updateDebouncerTimeout: null,
    clientIdentifier: crypto.randomUUID(),

    chats: [],
    activeChat: null,

    chatToDelete: null,
    chatToRename: null
  };
});

// throws if activeChat is null
export const useChatSettings = <U>(selector: (state: ChatSettings) => U) => {
  return useStore((s) => selector(s.activeChat!.settings));
};
