import { TTSConfiguration, TTSReplacement } from '@/types/userConfigurationTypes';
import { TTSMessage } from '../../types';
import { variableReplacementEngine } from '@/utils/variableReplacementEngine';


const ignoreUnderscores =  { id: crypto.randomUUID(), isEnabled: true, ordinal: 5, regex: '_', regexFlags: 'g', replaceWith: ' ', description: 'Read undescores as spaces' };
const linkReplacement = {
  id: crypto.randomUUID(),
  isEnabled: true,
  ordinal: 8,
  regex: '([0-9a-zA-z]\\.[a-zA-Z][a-zA-Z])|(http://|https://)',
  replaceFullMessage: true,
  replaceWith: '',
  regexFlags: '',
  description: 'Replace links'
};
const roleplay = { id: crypto.randomUUID(), isEnabled: true, ordinal: 9, regex: '^\\*.+\\*$', replaceWith: '$who $msg', replaceFullMessage: true, description: 'Allows roleplay by sending messages surrounded by asterisks', regexFlags: '',
  replacement: {
    id: crypto.randomUUID(), isEnabled: true, ordinal: 0, regex: '\\*', regexFlags: 'gi', replaceWith: '', description: 'Don\'t read *'
  }
};

const buildInternalReplacementRules = (configuration: TTSConfiguration) => {
  const replacementRules: Array<TTSReplacement> = [];

  if (configuration.readUnderscoresAsSpaces)
  {
    replacementRules.push(ignoreUnderscores);
  }

  if (configuration.replaceUrls) {
    linkReplacement.replaceWith = configuration.replaceUrlWith;
    replacementRules.push(linkReplacement);
  }

  if (configuration.allowRoleplay)
  {
    replacementRules.push(roleplay);
  }

  return replacementRules;
};

export const applyTTSMessageTransformations = (message: TTSMessage, configuration: TTSConfiguration): string | null => {
  if (configuration.ignoreBotMessages && message.isFromBot) return null;

  if (configuration.onlyReadMessagesThatStartWithTtsCommand && configuration.ttsCommand.length > 0) {
    const firstPart = message.parts.at(0);
    if (!firstPart || firstPart.type != 'text') return null;

    const startWithTTSCommand = firstPart.originalContent.startsWith(configuration.ttsCommand);
    if (!startWithTTSCommand) return null;
    message.isCommand = false;
    firstPart.originalContent = firstPart.originalContent.substring(configuration.ttsCommand.length);
  }

  if (configuration.ignoreCommandMessages && message.isCommand) return null;

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
    .join(' ')
    .trim();

  // replace sentBy their pronunciation
  let sentBy = message.sentBy;
  const matchedReplacement = configuration.userReplacement
    .find(r => sentBy && (new RegExp(`^${r.regex}$`, 'i')).test(sentBy));

  if (matchedReplacement){
    sentBy = sentBy?.replace(matchedReplacement.regex, matchedReplacement.replaceWith);
  };

  configuration.userReplacement.forEach(replacement => {
    // replace user mentions by their pronunciation
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
    messageToRead = variableReplacementEngine
      .applyVariables(replacement.replaceWith, messageToRead, sentBy);
    if (replacement.replacement) {
      // do recursive
      return applyReplacements(messageToRead, replacement.replacement, sentBy);
    }
    return messageToRead;
  }

  // TODO - weird cycle check at what point we want to replace
  const replaceWith = variableReplacementEngine
    .applyVariables(replacement.replaceWith, messageToRead, sentBy);
  const hasSomethingToReplace = exp.test(messageToRead);
  if (!hasSomethingToReplace) return messageToRead;

  messageToRead = messageToRead.replace(exp, replaceWith);
  if (!replacement.replacement) return messageToRead;
  // do recursive
  return applyReplacements(messageToRead, replacement.replacement, sentBy);
};
