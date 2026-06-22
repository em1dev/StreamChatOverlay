export const textVariables = {
  who: '$who',
  msg: '$msg',
  replyTo: '$replyTo',
  shortParentMsg: '$shortParentMsg',
  parentMsg: '$parentMsg'
};

const whoExp = new RegExp(`\\${textVariables.who}`, 'gi');
const msgExp = new RegExp(`\\${textVariables.msg}`, 'gi');
const replyToExp = new RegExp(`\\${textVariables.replyTo}`, 'gi');
const shortMsgExp = new RegExp(`\\${textVariables.shortParentMsg}`, 'gi');
const parentMsgExp = new RegExp(`\\${textVariables.parentMsg}`, 'gi');

const applyVariables = (
  text: string,
  originalMessage: string,
  sentBy: string = '',
  replyTo: string = '',
  parentMsg: string = ''
) => {
  let parsedMessage = text.replace(whoExp, sentBy);
  parsedMessage = parsedMessage.replace(msgExp, originalMessage);

  parsedMessage = parsedMessage.replace(replyToExp, replyTo);

  const shortParentMsg = parentMsg.length > 5 ? parentMsg.slice(0, 5) + '...' : parentMsg;
  parsedMessage = parsedMessage.replace(shortMsgExp, shortParentMsg);

  parsedMessage = parsedMessage.replace(parentMsgExp, parentMsg);

  return parsedMessage;
};

export const variableReplacementEngine = {
  applyVariables
};
