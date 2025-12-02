'use client';

import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createQueryClient, enableReactQueryDevTools } from '@/api/queryClient';

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {enableReactQueryDevTools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
