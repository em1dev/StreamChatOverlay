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

