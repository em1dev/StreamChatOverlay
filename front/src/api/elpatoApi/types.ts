export interface Badge {
  set_id: string,
  versions: Array<BadgeVersion>,
}

export interface BadgeVersion {
  id: string,
  image_url_1x: string,
  image_url_2x: string,
  image_url_4x: string,
  title: string,
  description: string,
  click_action: string,
  click_url: string
}

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