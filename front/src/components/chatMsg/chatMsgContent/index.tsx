import { ChatMessageData } from "../../../types";
import Emote from "../emote";

export type ChatMsgContentProps = Pick<ChatMessageData,
  'content' | 'emoteOffsets'
>;

export type MessagePart = {
  type: 'text' | 'emote',
  content: string
}

const ChatMsgContent = (props: ChatMsgContentProps) => {
  const parsedContent = parseMessage(props);

  return (
      parsedContent.map(({ content, type }, index) => {
        if (type === 'emote') {
          return <Emote key={index} id={content} />
        }
        return <span key={index}>{content}</span>
      })
  );
};

const parseMessage = ({ content, emoteOffsets }: ChatMsgContentProps):Array<MessagePart> => {
  const parsedMessage: Array<MessagePart> = [];
  const emotes = createEmoteArray(emoteOffsets);

  let i = 0;
  emotes.forEach(({ emoteId, start, end }) => {
    const textContent: MessagePart = {
      type: 'text',
      content: content.substring(i, start).trim(),
    };
    if (textContent.content.length) {
      parsedMessage.push(textContent);
    }
    parsedMessage.push({
      content: emoteId,
      type: 'emote'
    });
    i = end + 1;
  });

  const textContent: MessagePart = {
    type: 'text',
    content: content.substring(i).trim(),
  };

  if (textContent.content.length) {
    parsedMessage.push(textContent);
  }

  return parsedMessage;
}

const createEmoteArray = (emoteOffsets: ChatMsgContentProps['emoteOffsets']) => {
  const data: Array<{
    start: number,
    end: number,
    emoteId: string,
  }> = [];

  for (const emoteId of emoteOffsets.keys()) {
      const offset = emoteOffsets.get(emoteId);
      if (!offset) continue;

      for (const emotePart of offset) {
        const [start, end] = emotePart.split('-');
        const startParsed = parseInt(start);
        const endParsed = parseInt(end);
        if (isNaN(startParsed) || isNaN(endParsed)) continue;
        data.push({
          emoteId,
          end: endParsed,
          start: startParsed,
        });
      }
  }

  const emotesSorted = data.sort((a,b) => a.start - b.start);
  return emotesSorted;
}

export default ChatMsgContent;