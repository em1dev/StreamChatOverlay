import { ChatMessage } from '@twurple/chat';

export interface TwurpleChatMessage extends ChatMessage {
  id: string,
  text: string,
  bits: number,
}