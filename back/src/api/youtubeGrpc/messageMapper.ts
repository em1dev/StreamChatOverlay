import { LiveChatMessage } from '../../proto/streamList_pb';

export interface YoutubeChatMessage {
  id: string,
  userDisplayName: string,
  sentAt: string,
  messageContent: string,
  isModerator: boolean,
  isOwner: boolean,
  isSponsor: boolean,
  isVerified: boolean
}

export const mapMessage = (message: LiveChatMessage): YoutubeChatMessage | null => {
  const snippet = message.getSnippet();
  const authorDetails = message.getAuthorDetails();

  if (!snippet || !authorDetails) return null;
  if (!snippet.hasDisplayMessage()) return null;

  const id = message.getId()!;
  const messageContent = snippet.getDisplayMessage()!;
  const isModerator = authorDetails.getIsChatModerator() ?? false;
  const isSponsor = authorDetails.getIsChatSponsor() ?? false;
  const isVerified = authorDetails.getIsVerified() ?? false;
  const isOwner = authorDetails.getIsChatOwner() ?? false;
  const sentAt = snippet.getPublishedAt()!;
  const userDisplayName = authorDetails.getDisplayName()!;

  return {
    id,
    messageContent,
    isModerator,
    isOwner,
    isSponsor,
    isVerified,
    sentAt,
    userDisplayName,
  };
};
