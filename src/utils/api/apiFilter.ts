import { request } from './request';

export const apiFilter = {
  getAllCoutries: async <T>(url: string) => await request<T>(url),
  getAllTowns: async <T>(url: string) => await request<T>(url),
};
