import { MessagePart } from '../../../types';
import Emote from '../emote';
import * as S from './styles';

export type ChatMsgContentProps = {
  messageParts: Array<MessagePart>,
  userColor: string | undefined
}

const ChatMsgContent = ({ messageParts, userColor = 'black' }: ChatMsgContentProps) => (
  messageParts.map(({ content, type, customEmote }, index) => {
    switch (type) {
    case 'emote':
      return <Emote
        key={index}
        id={content}
        customEmote={customEmote} 
        scale={messageParts.length === 1 ? 3 : 1}
        alignCorrection={
          messageParts.filter(p => p.type === 'reply').length > 1
        }
      />;
    case 'redeption':
      return <S.Redemption $userColor={userColor} key={index}>{ content }</S.Redemption>;
    case 'reply':
      return <S.Reply $userColor={userColor} key={index}>{ content }</S.Reply>;
    case 'mention':
      return <S.ContentExtras $userColor={userColor} key={index}>{ content }</S.ContentExtras>;
    default:
      return <span key={index}>{content}</span>;
    }
  })
);

export default ChatMsgContent;