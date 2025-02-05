import { CustomEmote } from '../../api/elpatoApi/types';
import { SpecialMsgId, TwitchAnimationId, TwitchMsgTags, TwurpleChatMessage } from './types';
import { ChatMessageData, MessagePart } from '../../types';

const UNDEFINED_UNICODE_CHARACTER = '󠀀';

const parseMessage = (content: string, emoteOffsets: Map<string, Array<string>>, customEmotes: Array<CustomEmote>, twurpleMsg: TwurpleChatMessage):Array<MessagePart> => {
  const contentWithoutHiddenCharacter = content.replace(UNDEFINED_UNICODE_CHARACTER, '');

  let messageParts = parseTwitchEmotes(contentWithoutHiddenCharacter, emoteOffsets);
  messageParts = parseCustomEmotes(messageParts, customEmotes);
  messageParts = parseExtras(messageParts, twurpleMsg);

  return messageParts;
};

const parseExtras = (messageParts: Array<MessagePart>, twurpleMsg: TwurpleChatMessage) => {
  // mentions
  let newParts = [...messageParts].flatMap((part) => {
    if (part.type !== 'text') return [part];

    return part.content.split(' ')
      .map((txt) => (
        /@.*?(?=\s|@|$)/g.test(txt) 
          ? { content: txt, type: 'mention', originalContent: txt } satisfies MessagePart
          : { content: txt + ' ', type: 'text', originalContent: txt } satisfies MessagePart
      ));
  });

  if (twurpleMsg.isReply) {
    const firstMention = newParts
      .find((item) => item.type === 'mention');
    if (firstMention) {
      let parentMsg = twurpleMsg.parentMessageText?.replace(/@.*?(?=\s|@|$)/, '') ?? '';
      parentMsg = parentMsg.length > 5 ? parentMsg.slice(0, 5) + '...' : parentMsg;

      firstMention.type = 'reply';
      firstMention.content = `
          Replying to: ${firstMention.content} ${parentMsg}
        `;
    }
  }

  if (twurpleMsg.isRedemption) {
    newParts = [...newParts, {
      content: 'Channel Point Redemption',
      type: 'redeption',
      originalContent: '',
    } satisfies MessagePart];
  }

  return newParts;
};

const parseCustomEmotes = (messageParts: Array<MessagePart>, customEmotes: Array<CustomEmote>) => {
  let newMessageParts = [...messageParts];
  for (const emote of customEmotes) {
    // if we don't have any more text return early;
    if (!newMessageParts.find((item => item.type === 'text'))) {
      return newMessageParts;
    }

    newMessageParts = newMessageParts.flatMap((part) => {
      if (part.type === 'emote') return part;
      const parts: Array<MessagePart> = part.content
        .split(new RegExp(`\\b${emote.code}\\b`, 'g'))
        .flatMap((txt) => ([
          { content: txt, type: 'text', originalContent: txt } satisfies MessagePart,
          { content: emote.code, type: 'emote', customEmote: emote, originalContent: emote.code } satisfies MessagePart
        ]))
        .filter(part => part.content)
        .slice(0, -1);
      return parts;
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
      originalContent: content.substring(i, start).trim()
    };
    if (textContent.content.length) {
      parsedMessage.push(textContent);
    }
    parsedMessage.push({
      content: emoteId,
      type: 'emote',
      originalContent: content.substring(start, end + 1),
    });
    i = end + 1;
  });

  const textContent: MessagePart = {
    type: 'text',
    content: content.substring(i).trim(),
    originalContent: content.substring(i).trim()
  };

  if (textContent.content.length) {
    parsedMessage.push(textContent);
  }

  return parsedMessage;
};


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
};


const parseMessageEffect = (msg: TwurpleChatMessage): ChatMessageData['effect'] => {
  const msgId = msg.tags.get(TwitchMsgTags.MsgId);

  if (msgId === SpecialMsgId.BigEmote) {
    return 'big-emote';
  }

  const animationId = msg.tags.get(TwitchMsgTags.AnimationId);
  if (msgId === SpecialMsgId.AnimatedMsg && animationId) {
    switch (animationId) {
    case TwitchAnimationId.Rainbow:
      return 'rainbow';
    case TwitchAnimationId.Simmer:
      return 'simmer';
    default:
      console.log(`received a unhandled msg animation id : ${animationId}`);
    }
  }

  return 'normal';
};

export const TwitchChatParser = {
  createEmoteArray,
  parseMessage,
  parseMessageEffect
};