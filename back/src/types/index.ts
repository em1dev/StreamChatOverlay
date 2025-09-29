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

export interface TwitchAuthResponse {
  access_token: string,
  expires_in: number,
  token_type: 'bearer'
}


export interface ChatEmote {
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
    description: unknown
  }
}

export interface ChatApiResponse<T> {
  status: number,
  body?: T
}