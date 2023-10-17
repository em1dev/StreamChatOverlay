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

export interface ApiParams<T> {
  url: string;
  params?: Record<string, string | number>;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: T;
  token?: string;
  headers?: Record<string, string>,
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