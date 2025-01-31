export interface EmoteConfiguration {
  betterTTV: boolean,
  frankerFace: boolean,
  sevenTV: boolean
}



export interface TwitchPaginatedResponse<T> {
  data: Array<T>
}

export type TwitchBadgeResponse = TwitchPaginatedResponse<{
  set_id: string,
  versions: Array<{
    id: string,
    image_url_1x: string,
    image_url_2x: string,
    image_url_4x: string,
    title: string,
    description: string,
    click_action: string,
    click_url: string
  }>
}>;

export type ChannelInformation = {
  broadcaster_id: string,
  broadcaster_login: string,
  broadcaster_name: string,
  broadcaster_language: string,
  game_name: string,
  game_id: string,
  title: string,
  delay: number,
  tags: Array<string>,
  content_classification_labels: Array<string>,
  is_branded_content: boolean,
};

export type UserInformation = {
  id: string,
  login: string,
  display_name: string,
  type: string,
  broadcaster_type: 'affiliate' | 'partner' | '',
  description: string,
  profile_image_url: string,
  offline_image_url: string,
  email: string,
  /**
   * The UTC date and time that the user’s account was created. The timestamp is in RFC3339 format.
   */
  created_at: string
};

export type UserInformationResponse = TwitchPaginatedResponse<UserInformation>;

export interface TwitchAuthResponse {
  access_token: string,
  expires_in: number,
  token_type: 'bearer'
}

export interface ApiParams<T> {
  url: string;
  params?: Record<string, string | number>;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: T;
  token?: string;
  headers?: Record<string, string>,
}

export interface ElPatoEmote {
  id: string,
  code: string,
  type: 'BetterTTV' | '7TV' | 'FFZ'
  animated: boolean,
  url1x: string,
  url2x: string,
  url3x: string
}

export interface ApiResponse<T> {
  data?: T,
  error?: {
    status: number,
    description: any
  }
}

export interface ElPatoApiResponse<T> {
  status: number,
  body?: T
}