import { ChatMessage } from '@twurple/chat';

export interface TwurpleChatMessage extends ChatMessage {
  id: string,
  text: string,
  bits: number,
}

export enum TwitchMsgTags {
  AnimationId = 'animation-id',
  MsgId = 'msg-id',
}

export enum TwitchAnimationId {
  Rainbow = 'rainbow-eclipse',
  Simmer = 'simmer'
}

export enum SpecialMsgId {
  AnimatedMsg = 'animated-message',
  BigEmote = 'gigantified-emote-message',
}