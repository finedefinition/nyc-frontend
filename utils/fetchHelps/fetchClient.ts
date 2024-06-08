/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL = 'https://nyb-project-production.up.railway.app';
export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  data: any = null,
  method: RequestMethod = 'POST'
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
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
  userSignUp: <T>(url: string, data: any) => request<T>(url, data, 'POST'),
  userSignIn: <T>(url: string, data: any) => request<T>(url, data, 'POST'),
  confirmUser: <T>(url: string) => request<T>(url, 'POST'),
};
