'use client';

import { useEffect, useState } from 'react';
import { useFontStore } from '@/stores/fontStore';
import { FONT_OPTIONS } from '@/lib/fonts';

export function FontProvider({ children }: { children: React.ReactNode }) {
  const { currentFont } = useFontStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const font = FONT_OPTIONS.find((f) => f.id === currentFont);
    if (font) {
      document.documentElement.style.setProperty('font-family', font.family);
    }
  }, [currentFont, mounted]);

  return <>{children}</>;
}
