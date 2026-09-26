import axios from 'axios';
import { mockAdapter } from '@/mock/mockAdapter';

export const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  // 목업 모드에서는 서버 대신 메모리 목업 데이터로 응답
  ...(IS_MOCK && { adapter: mockAdapter }),
});
