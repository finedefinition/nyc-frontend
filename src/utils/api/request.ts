/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomErrorClass } from '../error/CustomErrorClass';
import { createHeaders } from './createHeaders';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export async function request<T>(
  url: string,
  data: any = null,
  tokenUser: string | null = null,
  method: RequestMethod = 'GET',
  isMultipart: boolean = false
): Promise<T> {
  try {
    const headers = createHeaders(tokenUser, isMultipart);

    const options: RequestInit = {
      method,
      headers,
      next: { revalidate: 0 },
    };

    if (data) {
      options.body = isMultipart ? data : JSON.stringify(data);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`,
      options
    );

    // TO DO: update error handler and return respone after backend change response

    if (!response.ok) {
      // Попытка получить тело ошибки
      // let errorMessage = response.statusText;
      // try {
      //   const errorData = await response.json();
      //   errorMessage = errorData.message || errorMessage;
      // } catch (error) {
      //   // eslint-disable-next-line
      //   console.error(error);
      //   throw error;
      // }

      const error = new CustomErrorClass(response.statusText, response.status);
      // eslint-disable-next-line
      console.error(error.toString());
      throw error;
    }

    return url === '/contact' ? (response as unknown as T) : response.json();

    // Возвращаем JSON или другой тип данных
    // const responseData: T = await response.json();
    // return responseData;
  } catch (error: any) {
    // eslint-disable-next-line
    console.error('Помилка під час виконання запиту:', error);
    throw error;
  }
}
