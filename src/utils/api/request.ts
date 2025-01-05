/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomErrorClass } from '../error/CustomErrorClass';
import { createHeaders } from './createHeaders';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export async function request<T>(
  url: string,
  data: any = null,
  tokenUser: string | null = '',
  method: RequestMethod = 'GET',
  content: boolean = false
): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: createHeaders(tokenUser, content),
      next: { revalidate: 0 },
    };

    if (data) {
      options.body = content ? data : JSON.stringify(data);
    }

    if (content) {
      // eslint-disable-next-line
      console.log('data entries:');
      data.forEach((value: any, key: any) => {
        // eslint-disable-next-line
        console.log(key, value);
      });
    }

    // eslint-disable-next-line
    console.log(process.env.NEXT_PUBLIC_SERVER_URL + url);
    // eslint-disable-next-line
    console.log(options);

    const responseBody = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + url,
      options
    );

    if (content) {
      // eslint-disable-next-line
      console.log(responseBody);
    }

    if (!responseBody.ok) {
      const error = new CustomErrorClass(
        responseBody.statusText,
        responseBody.status
      );
      // eslint-disable-next-line
      console.error(error.toString());
      throw error;
    }

    return url === '/contact'
      ? (responseBody as unknown as T)
      : responseBody.json();
  } catch (error) {
    // eslint-disable-next-line
    console.error('Помилка під час виконання запиту:', error);
    throw error;
  }
}
