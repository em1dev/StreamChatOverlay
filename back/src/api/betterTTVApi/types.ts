export interface BetterTTVEmote {
  id:string,
  /**
   * emote code
   */
  code:string,
  imageType: 'png' | 'webp' | 'gif',
  animated: boolean
  user: {
    id: string,
    name: string,
    displayName: string,
    /**
     * twitch / yotube user id
     */
    providerId: string
  }
}

export interface BetterTTVUserEmoteResponse {
  id: string
  bots: Array<string>,
  avatar: string,
  channelEmotes: Array<BetterTTVEmote>,
  sharedEmotes: Array<BetterTTVEmote>
}