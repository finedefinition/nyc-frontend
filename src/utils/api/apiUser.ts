/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from './request';

export const apiUser = {
  userSignIn: <T>(url: string, data: any) => request<T>(url, data, null, 'POST', false),
  adminAddYacht: <T>(url: string, data: FormData, tokenUser: string | null) =>
    request<T>(url, data, tokenUser, 'POST', true),
};
