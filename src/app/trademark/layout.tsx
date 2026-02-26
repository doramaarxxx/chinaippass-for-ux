'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTrademarkStore } from '@/store/trademarkStore';

const STEPS = [
  { step: 1, name: '상표정보 입력', href: '/trademark/step1' },
  { step: 2, name: '상품 선택', href: '/trademark/step2' },
  { step: 3, name: '견적 확인', href: '/trademark/step3' },
  { step: 4, name: '신청인 & 제출', href: '/trademark/step4' },
];

export default function TrademarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentStep, completedSteps, setCurrentStep, resetStep } = useTrademarkStore();
  const [showResetModal, setShowResetModal] = useState(false);

  // 현재 단계 확인
  const getCurrentStep = () => {
    if (pathname === '/trademark') return 0;
    const match = pathname.match(/step(\d)/);
    return match ? parseInt(match[1]) : 0;
  };

  const activeStep = getCurrentStep();
  const isIntroPage = pathname === '/trademark';
  const isStepPage = activeStep >= 1 && activeStep <= 4;

  const handlePrev = () => {
    if (activeStep > 1) {
      router.push(`/trademark/step${activeStep - 1}`);
    } else if (activeStep === 1) {
      router.push('/trademark');
    }
  };

  const handleNext = () => {
    if (activeStep < 4) {
      setCurrentStep(activeStep + 1);
      router.push(`/trademark/step${activeStep + 1}`);
    }
  };

  const handleSave = () => {
    alert('임시저장 되었습니다.');
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    resetStep(activeStep);
    setShowResetModal(false);
    // 해당 단계에 초기화 이벤트 전달
    const event = new CustomEvent('trademark-reset', { detail: { step: activeStep } });
    window.dispatchEvent(event);
  };

  const getStepName = () => {
    const step = STEPS.find((s) => s.step === activeStep);
    return step?.name || '';
  };

  const handleSubmit = () => {
    // Step 4에서 제출 버튼 클릭 시
    const event = new CustomEvent('trademark-submit');
    window.dispatchEvent(event);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* SNB (Side Navigation Bar) */}
      <aside className="w-64 border-r border-gray-200 bg-gray-50 hidden lg:block flex-shrink-0">
        <div className="sticky top-16 p-6">
          <h2 className="text-lg font-bold mb-6" style={{ color: '#09090B' }}>
            상표 출원
          </h2>
          <nav className="space-y-2">
            {STEPS.map((item) => {
              const isActive = activeStep === item.step;
              const isCompleted = completedSteps.includes(item.step);

              return (
                <Link
                  key={item.step}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300',
                    isActive
                      ? 'bg-[#09090B] text-white'
                      : isCompleted
                      ? 'bg-white text-[#09090B] border border-gray-200 hover:bg-gray-100'
                      : 'bg-white text-[#71717A] border border-gray-200 hover:bg-gray-50 hover:text-[#09090B]'
                  )}
                >
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium',
                      isActive
                        ? 'bg-white text-[#09090B]'
                        : isCompleted
                        ? 'bg-[#09090B] text-white'
                        : 'bg-gray-300 text-white'
                    )}
                  >
                    {isCompleted ? '✓' : item.step}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* 모바일 Step 인디케이터 */}
        {isStepPage && (
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center max-w-md mx-auto">
              {STEPS.map((item) => {
                const isActive = activeStep === item.step;
                const isCompleted = completedSteps.includes(item.step);

                return (
                  <div key={item.step} className="flex flex-col items-center">
                    <span
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                        isActive
                          ? 'bg-[#09090B] text-white'
                          : isCompleted
                          ? 'bg-[#09090B] text-white'
                          : 'bg-gray-200 text-[#71717A]'
                      )}
                    >
                      {isCompleted ? '✓' : item.step}
                    </span>
                    <span className="text-xs mt-1 text-[#71717A]">{item.step}단계</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 스크롤 가능한 콘텐츠 영역 */}
        <main className="flex-1">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`p-6 lg:p-10 ${isStepPage ? 'pb-52' : ''}`}
          >
            {children}
          </motion.div>
        </main>

        {/* 고정 하단 버튼 영역 */}
        {isStepPage && (
          <div className="fixed bottom-0 left-0 lg:left-64 right-0 border-t border-gray-200 bg-white px-4 py-3 lg:px-6 lg:py-3 shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.03)] z-40">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                >
                  {activeStep === 1 ? '취소' : '이전 단계'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResetClick}
                  className="text-[#71717A] hover:text-[#09090B]"
                >
                  초기화
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSave}
                >
                  임시저장
                </Button>
                {activeStep < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    다음 단계
                  </Button>
                ) : (
                  <Button type="button" onClick={handleSubmit}>
                    신청서 제출
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 초기화 확인 모달 */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold" style={{ color: '#09090B' }}>
                초기화 확인
              </h3>
              <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
                현재 단계({getStepName()})의 입력 내용이 초기화됩니다. 계속하시겠습니까?
              </p>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowResetModal(false)}
                >
                  취소
                </Button>
                <Button className="flex-1" onClick={handleResetConfirm}>
                  초기화
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
