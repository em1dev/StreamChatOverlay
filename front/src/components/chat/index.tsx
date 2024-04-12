import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ChatConfiguration, ChatConfigurationProvider, defaultChatConfiguration } from '../../hooks/useChatConfig';
import { ChatMessageData } from '../../types';
import ChatMsg from '../ChatBubble';
import * as S from './styles';

export interface ChatProps {
  msgs: Array<ChatMessageData>,
  config?: ChatConfiguration
}

const Chat = ({ msgs, config = defaultChatConfiguration }: ChatProps) => (
  <ChatConfigurationProvider config={config}>
    <S.Container $direction={config.direction}>
      <LayoutGroup>
        <AnimatePresence mode="popLayout" >
          {msgs.map((msg) => (
            <motion.div
              layout
              key={msg.id}
              initial={{ opacity: 0, x: 100, }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <ChatMsg key={msg.id} {...msg}   />
            </motion.div>
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </S.Container>
  </ChatConfigurationProvider>
);

export default Chat;