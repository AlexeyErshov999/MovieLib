import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'https://api.poiskkino.dev/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_POISKKINO_API_KEY,
  },
};

export const api: AxiosInstance = axios.create(config);