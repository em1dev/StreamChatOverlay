import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ChatMessageData } from '../../types';
import ChatMsg from '../ChatBubble';
import * as S from './styles';
import { useConfiguration } from '../../store/configuration';

export interface ChatProps {
  msgs: Array<ChatMessageData>,
}

const Chat = ({ msgs }: ChatProps) => {
  const chatDirection = useConfiguration(state => state.chatDirection);

  return (
    <S.Container $direction={chatDirection}>
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
  );
};

export default Chat;