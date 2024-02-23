export type PronounResponse = Record<string, Pronoun>;

export interface Pronoun {
  name: string,
  subject: string,
  object: string,
  singular: boolean
}

export interface PronounUser {
  channel_id: string,
  channel_login: string,
  pronoun_id: string,
  alt_pronoun_id: string | null,
}