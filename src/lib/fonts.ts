import { Noto_Sans_KR } from 'next/font/google';

export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const FONT_OPTIONS = [
  { id: 'pretendard', name: 'Pretendard', family: 'Pretendard, sans-serif' },
  { id: 'maruburi', name: 'MaruBuri', family: 'MaruBuri, serif' },
  { id: 'noto', name: 'Noto Sans KR', family: 'var(--font-noto), sans-serif' },
] as const;

export type FontId = (typeof FONT_OPTIONS)[number]['id'];
