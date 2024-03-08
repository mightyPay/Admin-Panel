import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: 'https://outsourcapi.herokuapp.com/',
  headers: {
    'Authorization': `Bearer ${Cookies.get('authorization')}`
  }
})


export const api = {
  get: <T>(url: string, params?: object) =>
    instance.get<T>(url, {...params,}),
  post: <T>(url: string, data: any) =>
    instance.post<T>(url, data, {}),
  patch: <T>(url: string, data: any) =>
    instance.patch<T>(url, data, {}),
  delete: <T>(url: string) =>
    instance.delete<T>(url, {}),
};
