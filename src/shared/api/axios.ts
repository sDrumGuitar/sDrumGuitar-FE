import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

export const api2 = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL2,
  timeout: 5000,
});
