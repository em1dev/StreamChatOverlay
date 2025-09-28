import { TTSConfiguration, TTSReplacement } from '@/types/userConfigurationTypes';
import { TTSMessage } from '../../types';


const ignoreCommands = { id: crypto.randomUUID(), isEnabled: true, ordinal: 0, regex: '^!.*', replaceFullMessage: true, replaceWith: '', regexFlags: '', description: 'Don\'t read messages starting with !'  };
const ignoreUnderscores =  { id: crypto.randomUUID(), isEnabled: true, ordinal: 5, regex: '_', regexFlags: 'g', replaceWith: ' ', description: 'Read undescores as spaces' };
const linkReplacement = { id: crypto.randomUUID(), isEnabled: true, ordinal: 8, regex: '[0-9a-zA-z]\\.[a-zA-Z][a-zA-Z]', replaceFullMessage: true, replaceWith: '$who a enviado un link.',  regexFlags: '', description: 'Replace links' };
const roleplay = { id: crypto.randomUUID(), isEnabled: true, ordinal: 9, regex: '^\\*.+\\*$', replaceWith: '$who $msg', replaceFullMessage: true, description: 'Allows roleplay by sending messages surrounded by asterisks', regexFlags: '',
  replacement: {
    id: crypto.randomUUID(), isEnabled: true, ordinal: 0, regex: '\\*', regexFlags: 'gi', replaceWith: '', description: 'Don\'t read *'
  }
};

const buildInternalReplacementRules = (configuration: TTSConfiguration) => {
  const replacementRules: Array<TTSReplacement> = [];

  if (!configuration.readCommands) {
    replacementRules.push(ignoreCommands);
  }

  if (configuration.readUnderscoresAsSpaces)
  {
    replacementRules.push(ignoreUnderscores);
  }

  replacementRules.push(linkReplacement);

  if (configuration.allowRoleplay)
  {
    replacementRules.push(roleplay);
  }

  return replacementRules;
};

export const applyTTSMessageTransformations = (message: TTSMessage, configuration: TTSConfiguration) => {
  const emotesToRead = configuration.emotesToRead;
  let emotesCount = 0;

  let messageToRead = message.parts
    .filter(msg => {
      if (msg.type === 'emote') {
        if (emotesCount >= emotesToRead) {
          return false;
        }
        emotesCount += 1;
        return true;
      }
      return true;
    })
    .map(msg => msg.originalContent)
    .join(' ');

  let sentBy = message.sentBy;

  // replace sent by by their pronunciation
  configuration.userReplacement.forEach(replacement => {
    sentBy = applyReplacements(sentBy ?? '', {
      ...replacement,
      regex: `^${replacement.regex}$`,
      regexFlags: 'i'
    });
  });

  // replace user mentions by their pronunciation
  configuration.userReplacement.forEach(replacement => {
    messageToRead = applyReplacements(messageToRead, {
      ...replacement,
      regex: `\\b@?${replacement.regex}\\b`,
      regexFlags: 'gi',
    });
  });

  // apply customized replacements
  configuration.replacements.forEach(replacement => {
    messageToRead = applyReplacements(messageToRead, replacement, sentBy);
  });

  // apply internal replacements rules
  const internalReplacements = buildInternalReplacementRules(configuration);
  internalReplacements.forEach(replacement => {
    messageToRead = applyReplacements(messageToRead, replacement, sentBy);
  });

  return messageToRead;
};

const applyReplacements = (msg: string, replacement: TTSReplacement, sentBy?: string): string => {
  let messageToRead = msg;

  const exp = new RegExp(replacement.regex, replacement.regexFlags);

  if (replacement.replaceFullMessage) {
    if (!exp.test(messageToRead)) return messageToRead;
    messageToRead = applyTokenReplacements(replacement.replaceWith, messageToRead, sentBy);
    if (replacement.replacement) {
      // do recurvie
      return applyReplacements(messageToRead, replacement.replacement, sentBy);
    }
    return messageToRead;
  }

  // TODO - weird cycle check at what point we want to replace
  const replaceWith = applyTokenReplacements(replacement.replaceWith, messageToRead, sentBy);
  const hasSomethingToReplace = exp.test(messageToRead);
  if (!hasSomethingToReplace) return messageToRead;

  messageToRead = messageToRead.replace(exp, replaceWith);
  if (!replacement.replacement) return messageToRead;
  // do recursive
  return applyReplacements(messageToRead, replacement.replacement, sentBy);
};

const applyTokenReplacements = (message: string, originalMsg: string, sentBy?: string) => {
  const whoExp = new RegExp('\\$who', 'gi');
  let parsedMessage = message.replace(whoExp, sentBy ?? '');

  const msgExp = new RegExp('\\$msg', 'gi');
  parsedMessage = parsedMessage.replace(msgExp, originalMsg);

  return parsedMessage;
};