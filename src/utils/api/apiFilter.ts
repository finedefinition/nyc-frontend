import { request } from './request';

export const apiFilter = {
  getAllCoutries: async <T>(url: string) => await request<T>(url),
  getAllTowns: async <T>(url: string) => await request<T>(url),
  getAllFuelTypes: async <T>(url: string) => await request<T>(url),
  getAllKeelTypes: async <T>(url: string) => await request<T>(url),
  getAllYachtModels: async <T>(url: string) => await request<T>(url),
};
