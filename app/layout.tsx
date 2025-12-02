import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Pretendard } from '@/public/fonts/pretendard'
import './globals.css'

export const metadata: Metadata = {
  title: '올페이즈',
  description: '편리하지만 단단한 결제 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>{children}</body>
    </html>
  )
}
