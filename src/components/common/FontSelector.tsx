'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Check } from 'lucide-react';
import { useFontStore } from '@/stores/fontStore';
import { FONT_OPTIONS } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export function FontSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentFont, setFont } = useFontStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        title="폰트 변경"
      >
        <Type className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-50"
          >
            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
              폰트 선택
            </div>
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.id}
                onClick={() => {
                  setFont(font.id);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between transition-colors',
                  currentFont === font.id && 'bg-gray-50'
                )}
                style={{ fontFamily: font.family }}
              >
                <span>{font.name}</span>
                {currentFont === font.id && (
                  <Check className="w-4 h-4 text-black" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
