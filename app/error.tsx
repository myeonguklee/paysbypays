'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          오류가 발생했습니다
        </h1>
        <p className="mb-8 text-gray-600">
          일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-label="다시 시도"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
