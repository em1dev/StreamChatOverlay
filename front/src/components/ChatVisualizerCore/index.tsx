import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ChatMessageData } from '../../types';
import ChatMsg from './ChatBubble';
import { useFont } from '@/fonts/ChatFonts';
import { UserConfiguration } from '@/types/userConfigurationTypes';

import * as S from './styles';


export interface ChatProps {
  msgs: Array<ChatMessageData>,
  chatDirection: UserConfiguration['chatDirection'],
  fontSize: UserConfiguration['fontSize'],
  chatFont: UserConfiguration['chatFont'],
  fontWeight: UserConfiguration['chatFontWeight'],
  lowerOpacityOnTop: UserConfiguration['lowerOpacityOnTop'],
  showBadges: UserConfiguration['showChatterBadges'],
  headerOrdering: UserConfiguration['headerOrdering'];
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
