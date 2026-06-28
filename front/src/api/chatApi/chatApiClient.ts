import { ApiResponse } from '../ApiResponse';


export const BASE_URL = import.meta.env.VITE_API_URL;
if (!BASE_URL) throw new Error('Missing VITE_API_URL in .env file');

export const fetchApi = async <T>(
  path: string,
  method: string,
  token?: string,
  body?: string
): Promise<ApiResponse<T>> => {
  const headers = new Headers({
    'content-type': 'application/json',
  }) ;

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const resp = await fetch(`${BASE_URL}/${path}`, { headers, method, body });
  if (!resp.ok) {
    return {
      status: resp.status,
      hasError: true,
    };
  }

  try {
    return {
      data: await resp.json(),
      status: resp.status
    };
  } catch {
    return {
      data: null as T,
      status: resp.status
    };
  }
};

export const chatApiClient = {
  fetch: fetchApi
};
