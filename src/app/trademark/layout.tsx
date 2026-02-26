'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
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
  const { currentStep, completedSteps, setCurrentStep, resetStep, cart, addToCart, removeFromCart, selectCartItem, data } = useTrademarkStore();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNextModal, setShowNextModal] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(true);
  const [cartWidth, setCartWidth] = useState(320); // 기본 너비 320px
  const isResizing = useRef(false);

  // 리사이즈 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    // 최소 250px, 최대 500px
    if (newWidth >= 250 && newWidth <= 500) {
      setCartWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

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
    // Step 1에서 다음 단계 누르면 장바구니에 자동 추가
    if (activeStep === 1) {
      addToCart();
    }

    if (activeStep < 4) {
      setCurrentStep(activeStep + 1);
      router.push(`/trademark/step${activeStep + 1}`);
    }
  };

  const handleConfirmSingle = () => {
    setShowNextModal(false);
    setCurrentStep(activeStep + 1);
    router.push(`/trademark/step${activeStep + 1}`);
  };

  const handleAddToCart = () => {
    addToCart();
    setShowNextModal(false);
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
        <main className="flex-1 flex">
          {/* 메인 콘텐츠 */}
          <div className={`flex-1 transition-all duration-150`} style={{ paddingRight: isStepPage && showCartPanel ? `${cartWidth}px` : 0 }}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`p-6 lg:p-10 ${isStepPage ? 'pb-52' : ''}`}
            >
              {children}
            </motion.div>
          </div>

          {/* 우측 장바구니 패널 */}
          {isStepPage && showCartPanel && (
            <aside
              className="hidden lg:block fixed right-0 top-16 h-[calc(100vh-4rem)] border-l border-gray-200 bg-gray-50"
              style={{ width: `${cartWidth}px`, zIndex: 30 }}
            >
              {/* 리사이즈 핸들 */}
              <div
                onMouseDown={handleMouseDown}
                className="absolute left-0 top-0 w-2 h-full cursor-col-resize hover:bg-gray-300 transition-colors flex items-center justify-center group"
                style={{ marginLeft: '-4px' }}
              >
                <div className="w-1 h-8 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors" />
              </div>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold" style={{ color: '#09090B' }}>
                      출원 목록
                    </h3>
                    {cart.length > 0 && (
                      <span className="bg-[#09090B] text-white text-xs px-2 py-0.5 rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowCartPanel(false)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X className="w-4 h-4" style={{ color: '#71717A' }} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-center" style={{ color: '#71717A' }}>
                      여러 상표를 한 번에 출원하려면<br />
                      장바구니에 추가하세요.
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {cart.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => selectCartItem(item.id)}
                        className={`rounded-lg p-4 border-2 cursor-pointer transition-all ${
                          item.isSelected
                            ? 'bg-white border-[#09090B]'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium" style={{ color: '#71717A' }}>
                                상표 {index + 1}
                              </span>
                              {item.isSelected && (
                                <span className="text-xs px-1.5 py-0.5 bg-[#09090B] text-white rounded">
                                  선택됨
                                </span>
                              )}
                            </div>
                            <p className="font-medium truncate mt-1" style={{ color: '#09090B' }}>
                              {item.trademarkNameKo}
                            </p>
                            {item.trademarkNameEn && (
                              <p className="text-sm truncate" style={{ color: '#71717A' }}>
                                {item.trademarkNameEn}
                              </p>
                            )}
                            <p className="text-xs mt-2" style={{ color: '#71717A' }}>
                              {item.selectedClasses.length}개 상품 분류
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromCart(item.id);
                            }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" style={{ color: '#71717A' }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </aside>
          )}

          {/* 장바구니 패널 토글 버튼 (패널 닫혔을 때) */}
          {isStepPage && !showCartPanel && (
            <button
              onClick={() => setShowCartPanel(true)}
              className="hidden lg:flex fixed right-4 top-20 items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <ShoppingCart className="w-4 h-4" style={{ color: '#09090B' }} />
              {cart.length > 0 && (
                <span className="bg-[#09090B] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          )}
        </main>

        {/* 고정 하단 버튼 영역 */}
        {isStepPage && (
          <div
            className="fixed bottom-0 left-0 lg:left-64 border-t border-gray-200 bg-white px-4 py-3 lg:px-6 lg:py-3 shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.03)] z-40 transition-all duration-150"
            style={{ right: showCartPanel ? `${cartWidth}px` : 0 }}
          >
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
                {activeStep <= 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddToCart}
                  >
                    장바구니 추가
                  </Button>
                )}
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

        {/* 다음 단계 확인 모달 (장바구니 안내) */}
        {showNextModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-bold" style={{ color: '#09090B' }}>
                출원 방식 선택
              </h3>
              <p className="mt-3 text-sm" style={{ color: '#71717A' }}>
                현재 작성 중인 상표 1건만 출원하시겠습니까?
              </p>
              <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
                여러 상표를 한 번에 출원하려면 <strong>장바구니에 추가</strong>한 후,
                추가 상표 정보를 입력하세요.
              </p>

              {data.trademarkNameKo && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs" style={{ color: '#71717A' }}>현재 상표</p>
                  <p className="font-medium mt-1" style={{ color: '#09090B' }}>
                    {data.trademarkNameKo}
                  </p>
                  {data.selectedClasses.length > 0 && (
                    <p className="text-xs mt-1" style={{ color: '#71717A' }}>
                      {data.selectedClasses.length}개 상품 분류 선택됨
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2">
                <Button className="w-full" onClick={handleConfirmSingle}>
                  1건만 출원하기
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4" />
                  장바구니에 추가하고 계속 입력
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowNextModal(false)}
                >
                  취소
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
