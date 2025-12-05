import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://recruit.paysbypays.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10 * 1000,
});
