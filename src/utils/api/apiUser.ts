/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from './request';

export const apiUser = {
  userSignIn: <T>(url: string, data: any) => request<T>(url, data, '', 'POST'),
};
