'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ComingSoonProps {
  title?: string;
}

export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center px-4"
      >
        <h1 className="text-5xl sm:text-6xl font-bold" style={{ color: '#09090B' }}>
          준비중
        </h1>
        {title && (
          <p className="mt-4 text-xl font-medium" style={{ color: '#09090B' }}>
            {title}
          </p>
        )}
        <p className="mt-6 text-lg" style={{ color: '#71717A' }}>
          해당 서비스는 현재 준비중입니다.
          <br />
          빠른 시일 내에 찾아뵙겠습니다.
        </p>
        <div className="mt-10">
          <Link href="/">
            <Button size="lg">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
