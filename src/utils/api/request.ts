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

    if (isMultipart && data instanceof FormData) {
      // Логирование содержимого FormData
      console.log('data entries:');
      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }
    }

    console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`);
    console.log('Request Options:', options);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`,
      options
    );

    if (isMultipart) {
      console.log('Response:', response);
    }

    if (!response.ok) {
      // Попытка получить тело ошибки
      let errorMessage = response.statusText;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Если тело не в JSON формате
      }

      const error = new CustomErrorClass(errorMessage, response.status);
      console.error(error.toString());
      throw error;
    }

    // Возвращаем JSON или другой тип данных
    const responseData: T = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Помилка під час виконання запиту:', error);
    throw error;
  }
}
