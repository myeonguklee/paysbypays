import Link from 'next/link';
import { ROUTES, ROUTE_LABELS } from '@/constants/Routes';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="flex h-16 items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:gap-10 lg:px-8">
        <Link
          href={ROUTES.DASHBOARD}
          className="text-xl font-bold text-zinc-600"
        >
          올페이즈
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href={ROUTES.PAYMENTS}
            className="px-2 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-gray-100 hover:text-zinc-900"
          >
            {ROUTE_LABELS[ROUTES.PAYMENTS]}
          </Link>
          <Link
            href={ROUTES.MERCHANTS}
            className="px-2 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-gray-100 hover:text-zinc-900"
          >
            {ROUTE_LABELS[ROUTES.MERCHANTS]}
          </Link>
        </nav>
      </div>
    </header>
  );
};
