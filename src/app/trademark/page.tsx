'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const STEPS_INFO = [
  {
    step: '01',
    title: '상표정보 입력',
    description: '상표 유형, 상표명, 이미지 등 기본 정보를 입력합니다.',
  },
  {
    step: '02',
    title: '상품 선택',
    description: 'Nice 분류 체계에서 출원할 상품을 선택합니다.',
  },
  {
    step: '03',
    title: '견적 확인',
    description: '선택한 내용을 바탕으로 비용 견적을 확인합니다.',
  },
  {
    step: '04',
    title: '신청인 정보 & 제출',
    description: '신청인 정보를 입력하고 최종 제출합니다.',
  },
];

export default function TrademarkIntroPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#09090B' }}>
          상표 출원
        </h1>
        <p className="mt-4 text-lg" style={{ color: '#71717A' }}>
          중국 상표 출원을 간편하게 진행하세요.
          <br />
          브랜드와 로고를 중국에서 보호받을 수 있습니다.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-12"
      >
        <h2 className="text-xl font-semibold mb-6" style={{ color: '#09090B' }}>
          진행 단계
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEPS_INFO.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <span
                className="text-3xl font-bold"
                style={{ color: '#E5E5E5' }}
              >
                {item.step}
              </span>
              <h3
                className="mt-2 text-lg font-semibold"
                style={{ color: '#09090B' }}
              >
                {item.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: '#71717A' }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 p-6 bg-gray-50 rounded-xl"
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#09090B' }}>
          안내 사항
        </h2>
        <ul className="space-y-2 text-sm" style={{ color: '#71717A' }}>
          <li>- 상표 출원에는 약 12-18개월이 소요됩니다.</li>
          <li>- 출원 전 중국 상표 데이터베이스에서 선행 상표를 검색하시기 바랍니다.</li>
          <li>- 모든 단계에서 임시저장이 가능합니다.</li>
          <li>- 문의사항은 고객센터로 연락해 주세요.</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-10"
      >
        <Link href="/trademark/step1">
          <Button size="lg" className="w-full sm:w-auto px-12 h-14 text-base">
            시작하기
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
