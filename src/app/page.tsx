'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black">
              중국 IP 출원,
              <br />
              <span className="text-black">이제 간편하게</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              복잡한 중국 특허, 상표, 디자인 출원 절차를
              <br className="hidden sm:block" />
              원스톱으로 해결하세요.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-14">
                  무료로 시작하기
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 h-14"
                >
                  서비스 알아보기
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 캐러셀 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mt-10 overflow-hidden rounded-3xl mx-4"
          >
            <img
              src="/images/bg1.png"
              alt="China IP Pass"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black">
              간단한 3단계로 중국 출원 완료
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              복잡한 절차, 저희가 대신합니다
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                title: '정보 입력',
                description: '상표, 특허, 디자인 정보를 간편하게 입력하세요.',
              },
              {
                step: '02',
                title: '견적 확인',
                description: '투명한 비용 견적을 즉시 확인하고 다운로드하세요.',
              },
              {
                step: '03',
                title: '신청 제출',
                description: '신청인 정보 입력 후 클릭 한 번으로 제출 완료.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative p-8 bg-gray-50 rounded-2xl"
              >
                <span className="text-5xl font-bold text-gray-200">
                  {item.step}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 출원 유형 카드 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black">
              출원 유형 선택
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              필요한 IP 출원 서비스를 선택하세요
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: '상표 출원',
                description:
                  '브랜드와 로고를 중국에서 보호하세요. Nice 분류 체계 기반 상품 선택을 지원합니다.',
                href: '/trademark/step1',
                available: true,
              },
              {
                title: '특허 출원',
                description:
                  '발명과 기술을 중국에서 보호하세요. 발명특허와 실용신안을 지원합니다.',
                href: '/patent',
                available: false,
              },
              {
                title: '디자인 출원',
                description:
                  '제품 디자인을 중국에서 보호하세요. 로카르노 분류 체계를 지원합니다.',
                href: '/design',
                available: false,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="relative p-8 bg-white rounded-2xl border border-gray-200 hover:border-[#09090B] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold" style={{ color: '#09090B' }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm" style={{ color: '#71717A' }}>{item.description}</p>
                <Link href={item.href} className="mt-6 inline-block">
                  <Button
                    variant={item.available ? 'default' : 'outline'}
                    size="sm"
                  >
                    {item.available ? '신청하기' : '준비중'}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 장점/특징 섹션 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black">
              왜 China IP Pass인가요?
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              전문가들이 선택하는 이유
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                title: '언어 장벽 해소',
                description: '한글 입력만으로 중문 서류 자동 생성',
              },
              {
                title: '신속한 처리',
                description: '복잡한 절차 없이 빠른 출원 진행',
              },
              {
                title: '안전한 보안',
                description: '기업 기밀 정보 철저히 보호',
              },
              {
                title: '투명한 비용',
                description: '숨김 비용 없는 명확한 견적 제공',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="text-center p-6"
              >
                <h3 className="text-lg font-semibold" style={{ color: '#09090B' }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: '#71717A' }}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              지금 바로 시작하세요
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              회원가입 후 첫 견적 조회는 무료입니다
            </p>
            <div className="mt-10">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black hover:bg-gray-100 text-base px-8"
                >
                  무료 회원가입
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
