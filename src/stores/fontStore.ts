'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FontId } from '@/lib/fonts';

interface FontState {
  currentFont: FontId;
  setFont: (font: FontId) => void;
}

export const useFontStore = create<FontState>()(
  persist(
    (set) => ({
      currentFont: 'pretendard',
      setFont: (font) => set({ currentFont: font }),
    }),
    { name: 'font-storage' }
  )
);
