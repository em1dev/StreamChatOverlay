import { ApiResponse } from '../ApiResponse';
import { PronounResponse, PronounUser } from './types';

const BASE_URL = 'https://api.pronouns.alejo.io/v1/';

const getPronouns = async (): Promise<ApiResponse<PronounResponse>> => {
  try {
    const url = BASE_URL + 'pronouns';
    const resp = await fetch(url);
    const data = (await resp.json()) as PronounResponse;
    return {
      hasError: false,
      status: resp.status,
      data
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      hasError: true
    };
  }
};

const getUser = async (userLogin: string): Promise<ApiResponse<PronounUser>> => {
  try {
    const url = BASE_URL + 'users/' + userLogin.toLocaleLowerCase();
    const resp = await fetch(url);
    if (!resp.ok) {
      return {
        hasError: true,
        status: resp.status
      };
    }

    const data = (await resp.json()) as PronounUser;
    return {
      hasError: false,
      status: resp.status,
      data
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      hasError: true
    };
  }
};

export const pronounsApi = {
  getPronouns,
  getUser
};