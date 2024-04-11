import { MessagePart } from '../../../types';
import Emote from '../emote';
import * as S from './styles';

export type ChatMsgContentProps = {
  messageParts: Array<MessagePart>,
}

const ChatMsgContent = ({ messageParts }: ChatMsgContentProps) => (
  messageParts.map(({ content, type, customEmote }, index) => {
    switch (type) {
    case 'emote':
      return <Emote
        key={index}
        id={content}
        customEmote={customEmote} 
        scale={messageParts.length === 1 ? 3 : 1}
        alignCorrection={messageParts.length > 1}
      />;
    case 'redeption':
      return <S.Redemption>{ content }</S.Redemption>;
    case 'reply':
      return <S.Reply>{ content }</S.Reply>;
    case 'mention':
      return <S.ContentExtras>{ content }</S.ContentExtras>;
    default:
      return <span key={index}>{content}</span>;
    }

  })
);

export default ChatMsgContent;