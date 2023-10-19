export interface ChatMessageData {
  id: string,
  content: string,
  emoteOffsets: Map<string, Array<string>>,
  userDisplayName: string,
  displayPronoun?: string | null,
  color?: string | undefined,
  badges: Array<{
    id: string,
    url: string
  }>,
}