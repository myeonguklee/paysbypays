import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { ROUTES } from '@/constants/Routes';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-100 p-4">
            <FileQuestion className="h-12 w-12 text-gray-600" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">404</h1>
        <p className="mb-2 text-xl font-semibold text-gray-700">
          페이지를 찾을 수 없습니다
        </p>
        <p className="mb-8 text-gray-600">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          href={ROUTES.DASHBOARD}
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-label="대시보드로 이동"
        >
          대시보드로 이동
        </Link>
      </div>
    </div>
  );
}
