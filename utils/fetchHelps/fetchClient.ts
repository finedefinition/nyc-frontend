/* eslint-disable @typescript-eslint/no-explicit-any */
//Move server url to .env file
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  data: any = null,
  tokenUser: string | null = '',
  method: RequestMethod = 'POST'
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
  }

  if ((method === 'GET' || method === 'DELETE' || method === 'POST') && tokenUser) {
    options.headers = {
      ...(tokenUser ? { Authorization: `Bearer ${tokenUser}` } : {}),
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(async (response) => {
      if (!response.ok) {
        const errorMessage = await response.json();

        throw new Error(`Network response was not ok: ${errorMessage.message}`);
      }

      return response.json();
    });
}

export const client = {
  userSignUp: <T>(url: string, data: any) => request<T>(url, data, '', 'POST'),
  userSignIn: <T>(url: string, data: any) => request<T>(url, data, '', 'POST'),
  confirmUser: <T>(url: string) => request<T>(url, 'POST'),
  getFavouriteYachts: <T>(url: string, tokenUser: string | null) =>
    request<T>(url, null, tokenUser, 'GET'),
  deleteFavouriteYachts: <T>(url: string, tokenUser: string | null) =>
    request<T>(url, null, tokenUser, 'DELETE'),
  createFavouriteYachts: <T>(url: string, tokenUser: string | null) =>
    request<T>(url, null, tokenUser, 'POST'),
};
