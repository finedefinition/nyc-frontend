import { request } from './apiClient';

export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const apiFilter = {
  getAllCoutries: async <T>(url: string) => await request<T>(url),
};
