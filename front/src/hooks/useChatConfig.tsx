import { createContext, useContext } from "react";

export interface ChatConfiguration {
  direction: 'left' | 'right'
}

// eslint-disable-next-line react-refresh/only-export-components
export const defaultChatConfiguration:ChatConfiguration = {
  direction: 'right'
};

const ChatConfigurationContext = createContext<ChatConfiguration>(defaultChatConfiguration);

// eslint-disable-next-line react-refresh/only-export-components
export const useChatConfig = () => {
  const context = useContext(ChatConfigurationContext);
  if (!context) throw new Error('Missing chat context config');
  return context;
};

export const ChatConfigurationProvider = ({ children, config = defaultChatConfiguration }: { children: React.ReactNode, config?: ChatConfiguration }) => (
  <ChatConfigurationContext.Provider value={config}>
    {children}
  </ChatConfigurationContext.Provider>
);