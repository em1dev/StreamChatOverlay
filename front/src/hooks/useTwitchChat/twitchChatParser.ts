import { CustomEmote } from "../../api/elpatoApi/types";
import { MessagePart } from "../../types";

const parseMessage = (content: string, emoteOffsets: Map<string, Array<string>>, customEmotes: Array<CustomEmote>):Array<MessagePart> => {
  const messageParts = parseTwitchEmotes(content, emoteOffsets);
  return parseCustomEmotes(messageParts, customEmotes);
}

const parseCustomEmotes = (messageParts: Array<MessagePart>, customEmotes: Array<CustomEmote>) => {
  let newMessageParts = [...messageParts];
  for (const emote of customEmotes) {
    // if we don't have any more text return early;
    if (!newMessageParts.find((item => item.type === 'text'))) {
      return newMessageParts;
    }

    newMessageParts = newMessageParts.flatMap((part) => {
      if (part.type === 'emote') return part;
      return part.content
        .split(new RegExp(`\\b${emote.code}\\b`, 'g'))
        .flatMap((txt) => ([
          { content: txt, type: 'text' } satisfies MessagePart,
          { content: emote.code, type: 'emote', customEmote: emote } satisfies MessagePart
        ]))
        .filter(part => part.content)
        .slice(0, -1);
    });
  }

  return newMessageParts;
};

const parseTwitchEmotes = (content: string, emoteOffsets: Map<string, Array<string>>) => {
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