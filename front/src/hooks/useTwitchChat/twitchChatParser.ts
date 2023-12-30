import { MessagePart } from "../../types";

const parseMessage = (content: string, emoteOffsets: Map<string, Array<string>>):Array<MessagePart> => {
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

const createEmoteArray = (emoteOffsets: Map<string, Array<string>>) => {
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

export const TwitchChatParser = {
  createEmoteArray,
  parseMessage
}