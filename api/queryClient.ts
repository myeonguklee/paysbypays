import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const STALE_TIME = 1000 * 60 * 5; // 5분
const GC_TIME = 1000 * 60 * 10; // 10분

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
        retry: (failureCount, error) => {
          if (error instanceof AxiosError) {
            return (error.response?.status ?? 0) >= 500 && failureCount < 3;
          }
          return failureCount < 1;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const enableReactQueryDevTools = process.env.NODE_ENV === 'development';
