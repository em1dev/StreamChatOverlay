import { ApiResponse } from "../ApiResponse";
import { Pronoun, PronounUser } from "./types";

const BASE_URL = 'https://pronouns.alejo.io/api/';

const getPronouns = async (): Promise<ApiResponse<Array<Pronoun>>> => {
  try {
    const url = BASE_URL + 'pronouns';
    const resp = await fetch(url);
    const data = (await resp.json()) as Array<Pronoun>;
    return {
      hasError: false,
      status: resp.status,
      data
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      hasError: true
    }
  }
}

const getUser = async (userLogin: string): Promise<ApiResponse<Array<PronounUser>>> => {
  try {
    const url = BASE_URL + 'users/' + userLogin.toLocaleLowerCase();
    const resp = await fetch(url);
    const data = (await resp.json()) as Array<PronounUser>;
    return {
      hasError: false,
      status: resp.status,
      data
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      hasError: true
    }
  }
}

export const pronounsApi = {
  getPronouns,
  getUser
};