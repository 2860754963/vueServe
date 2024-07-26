/*
 * @Author: Nigulasi
 * @Date: 2024-06-25 14:00:30
 * @Last Modified by: Nigulasi
 * @Describe: request
 */
import baseURL from './baseurl.js';
import axios from 'axios';

let request = axios.create({
  baseURL,
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
