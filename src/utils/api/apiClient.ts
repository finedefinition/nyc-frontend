/* eslint-disable @typescript-eslint/no-explicit-any */
import { Yacht } from '@/interfaces/yacht.interface';
import { PaginationOptions } from '@/interfaces/pagination.interface';
import { CustomErrorClass } from '../error/CustomErrorClass';
import { createHeaders } from './createHeaders';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  // options?: any,
  data: any = null,
  tokenUser: string | null = '',
  method: RequestMethod = 'GET'
): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: createHeaders(tokenUser, method),
      cache: 'no-store',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const responseBody = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + url,
      options
    );

    if (!responseBody.ok) {
      throw new CustomErrorClass(responseBody.statusText, responseBody.status);
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

export const apiClient = {
  getYachtsWithPagination: async (url: string) => {
    try {
      const { pagination, yachts } = await request<{
        pagination: PaginationOptions;
        yachts: Yacht[];
      }>(url);

      return { pagination, yachts };
    } catch (error) {
      return { pagination: {}, yachts: [] };
    }
  },
  getFeaturedYachts: async (url: string) => {
    const data = await request<{ yachts: Yacht[] }>(url);
    return data.yachts.filter(
      (yacht) => yacht.yacht_top || yacht.yacht_hot_price
    );
  },
  getYachtById: <T>(url: string) => request<T>(url),
  // getYachtById: async (url: string) => {
  //   try {
  //     const yacht = await request(url);
  //     return yacht;
  //   } catch (error) {
  //     return null;
  //   }
  // },
  sendMessageFromContactForm: <T>(url: string, data: any) =>
    request<T>(url, data, '', 'POST'),
};
