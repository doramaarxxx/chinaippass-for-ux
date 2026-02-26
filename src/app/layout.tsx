import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { FooterWrapper } from '@/components/layout/FooterWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'China IP Pass | 중국 IP 출원 원스톱 플랫폼',
  description:
    '한국 특허사무소와 중견기업을 위한 중국 특허/상표/디자인 출원 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
