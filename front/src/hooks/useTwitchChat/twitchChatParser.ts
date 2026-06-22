import { CustomEmote } from '../../api/chatApi/types';
import { SpecialMsgId, TwitchAnimationId, TwitchMsgTags, TwurpleChatMessage } from './types';
import { ChatMessageData, MessagePart } from '../../types';
import { UserConfiguration } from '@/types/userConfigurationTypes';
import { variableReplacementEngine } from '@/utils/variableReplacementEngine';

// these characters are used by third party extension to by-pass the one message limit in twitch..breaking my regex :v
// there might be more weird characters used out there but these two are the ones I could find.
const NON_PRINTABLE_CHARACTER_1 = '͏';
const NON_PRINTABLE_CHARACTER_2 = '󠀀';

const parseMessage = (
  content: string,
  emoteOffsets: Map<string, Array<string>>,
  customEmotes: Array<CustomEmote>,
  twurpleMsg: TwurpleChatMessage,
  userConfiguration: UserConfiguration
): Array<MessagePart> => {
  const contentWithoutHiddenCharacter = content
    .replaceAll(NON_PRINTABLE_CHARACTER_1, '')
    .replaceAll(NON_PRINTABLE_CHARACTER_2, '');

  let messageParts = parseTwitchEmotes(contentWithoutHiddenCharacter, emoteOffsets);
  messageParts = parseCustomEmotes(messageParts, customEmotes);
  messageParts = parseExtras(messageParts, twurpleMsg, userConfiguration);

  return messageParts;
};

const parseExtras = (
  messageParts: Array<MessagePart>,
  twurpleMsg: TwurpleChatMessage,
  userConfiguration: UserConfiguration
) => {
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
      const parentMsg = twurpleMsg.parentMessageText?.replace(/@.*?(?=\s|@|$)/, '') ?? '';

      firstMention.type = 'reply';

      const content = variableReplacementEngine.applyVariables(userConfiguration.replyLabel,
        twurpleMsg.text,
        twurpleMsg.userInfo.displayName,
        firstMention.content,
        parentMsg
      );

      firstMention.content = content;
    }
  }

  if (twurpleMsg.isRedemption) {
    newParts = [...newParts, {
      content: userConfiguration.redemptionLabel,
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
        // code surrounded by either a space or start/end of msg
        .split(new RegExp(`(?:^| )${emote.code}(?:$| )`, 'g'))
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
