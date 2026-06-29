import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ChatMessageData } from '../../types';
import ChatMsg from './ChatBubble';
import { useFont } from '@/fonts/ChatFonts';
import { ChatSettings } from '@/types/settingsTypes';
import * as S from './styles';


export interface ChatProps {
  msgs: Array<ChatMessageData>,
  chatDirection: ChatSettings['chatDirection'],
  fontSize: ChatSettings['fontSize'],
  chatFont: ChatSettings['chatFont'],
  fontWeight: ChatSettings['chatFontWeight'],
  lowerOpacityOnTop: ChatSettings['lowerOpacityOnTop'],
  showBadges: ChatSettings['showChatterBadges'],
  headerOrdering: ChatSettings['headerOrdering'];
}

const Chat = ({
  msgs,
  chatDirection,
  chatFont,
  fontSize,
  fontWeight,
  lowerOpacityOnTop,
  headerOrdering,
  showBadges
}: ChatProps) => {
  const { font } = useFont(chatFont);

  return (
    <S.Container
      $fontFamily={font.fontFamily}
      $fontWeight={fontWeight}
      $showOpacityMask={lowerOpacityOnTop}
      $fontSize={fontSize}
      $direction={chatDirection}
    >
      <LayoutGroup>
        <AnimatePresence mode="popLayout" >
          {msgs.map((msg) => (
            <motion.div
              layout
              key={msg.id}
              initial={{ opacity: 0, x: chatDirection == 'left' ? -100 : 100, }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: chatDirection == 'left' ? -100 : 100 }}
            >
              <ChatMsg
                key={msg.id}
                chatDirection={chatDirection}
                headerOrdering={headerOrdering}
                showBadges={showBadges}
                message={msg}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </S.Container>
  );
};

export default Chat;
