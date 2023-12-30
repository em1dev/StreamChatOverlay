import { MessagePart } from "../../../types";
import Emote from "../emote";

export type ChatMsgContentProps = {
  messageParts: Array<MessagePart>,
}

const ChatMsgContent = ({ messageParts }: ChatMsgContentProps) => (
  messageParts.map(({ content, type }, index) => {
    if (type === 'emote') {
      return <Emote key={index} id={content} />
    }
    return <span key={index}>{content}</span>
  })
);

export default ChatMsgContent;