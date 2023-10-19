export interface Pronoun {
  name: string,
  display: string,
}

export interface PronounUser {
  id: string,
  login: string,
  pronoun_id: string
}