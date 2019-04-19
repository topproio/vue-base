import axios from 'axios';
import {getToken} from '@/utils/token';
const baseURL = '';


const request = axios.create({
  baseURL,
  timeout: 15000
});
request.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
request.interceptors.response.use(({data}) => data);
export default request;
