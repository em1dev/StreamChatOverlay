import { MessagePart } from "../../../types";
import Emote from "../emote";

export type ChatMsgContentProps = {
  messageParts: Array<MessagePart>,
}

const ChatMsgContent = ({ messageParts }: ChatMsgContentProps) => (
  messageParts.map(({ content, type, customEmote }, index) => {
    if (type === 'emote') {
      return <Emote
        key={index}
        id={content}
        customEmote={customEmote} 
        scale={messageParts.length === 1 ? 3 : 1}
        alignCorrection={messageParts.length > 1}
      />
    }
    return <span key={index}>{content}</span>
  })
);

export default ChatMsgContent;