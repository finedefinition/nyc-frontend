/* eslint-disable @typescript-eslint/no-explicit-any */
import { Yacht } from '@/interfaces/yacht.interface';
import { PaginationOptions } from '@/interfaces/pagination.interface';
import { request } from './request';

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
  getFeaturedYachts: <T>(url: string) => request<T>(url),
  getYachtById: <T>(url: string) => {
    return request<T>(url);
  },
  sendMessageFromContactForm: <T>(url: string, data: any) =>
    request<T>(url, data, '', 'POST'),
};
