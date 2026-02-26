'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function FooterWrapper() {
  const pathname = usePathname();

  // 상표 출원 스텝 페이지에서는 푸터 숨김
  const hideFooter = pathname?.startsWith('/trademark/step');

  if (hideFooter) {
    return null;
  }

  return <Footer />;
}
