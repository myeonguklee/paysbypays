import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Pretendard } from '@/public/fonts/pretendard';
import './globals.css';
import ReactQueryProvider from './providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: '올페이즈',
  description: '편리하지만 단단한 결제 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <ReactQueryProvider>
          <div className="flex min-h-screen flex-col overflow-y-auto bg-white">
            <Header />
            <main className="mx-auto w-full max-w-7xl grow px-4 py-8 text-black sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
