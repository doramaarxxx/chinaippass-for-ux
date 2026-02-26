'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTrademarkStore } from '@/store/trademarkStore';

export default function TrademarkStep3Page() {
  const { data } = useTrademarkStore();
  const [openSections, setOpenSections] = useState({
    trademarkInfo: true,
    costDetails: true,
    productDetails: true,
  });
  const [previewModal, setPreviewModal] = useState<{ open: boolean; currency: 'KRW' | 'USD' | null }>({
    open: false,
    currency: null,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // 비용 계산
  const quotation = useMemo(() => {
    const classCount = data.selectedClasses.length;
    const baseCostKRW = 500000;
    const additionalClassCostKRW = classCount > 1 ? (classCount - 1) * 300000 : 0;
    const priorityCostKRW = data.hasPriority ? 200000 : 0;
    const chineseNameConsultingKRW = data.needsChineseNameConsulting ? 150000 : 0;
    const serviceFeeeKRW = 100000;

    const subtotalKRW = baseCostKRW + additionalClassCostKRW + priorityCostKRW + chineseNameConsultingKRW + serviceFeeeKRW;
    const vatKRW = Math.round(subtotalKRW * 0.1);
    const totalKRW = subtotalKRW + vatKRW;

    // USD (환율 1,300원 기준)
    const exchangeRate = 1300;
    const totalUSD = Math.round(totalKRW / exchangeRate);

    return {
      baseCostKRW,
      additionalClassCostKRW,
      priorityCostKRW,
      chineseNameConsultingKRW,
      serviceFeeeKRW,
      subtotalKRW,
      vatKRW,
      totalKRW,
      totalUSD,
      classCount,
      exchangeRate,
    };
  }, [data.selectedClasses, data.hasPriority, data.needsChineseNameConsulting]);

  const handleDownloadPDF = (currency: 'KRW' | 'USD') => {
    setPreviewModal({ open: true, currency });
  };

  const handleCloseModal = () => {
    setPreviewModal({ open: false, currency: null });
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#09090B' }}>
          견적 확인
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
          선택하신 내용을 바탕으로 비용 견적을 확인해주세요.
        </p>
      </div>

      {/* 상표 정보 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 rounded-xl mb-6 overflow-hidden"
      >
        <button
          onClick={() => toggleSection('trademarkInfo')}
          className="w-full p-6 flex justify-between items-center group"
        >
          <h2 className="text-lg font-semibold" style={{ color: '#09090B' }}>
            상표 정보
          </h2>
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                openSections.trademarkInfo ? 'rotate-180' : ''
              }`}
              style={{ color: '#71717A' }}
            />
          </div>
        </button>
        <AnimatePresence>
          {openSections.trademarkInfo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#71717A' }}>상표명 (한글)</span>
                  <span style={{ color: '#09090B' }}>{data.trademarkNameKo || '-'}</span>
                </div>
                {data.trademarkNameEn && (
                  <div className="flex justify-between">
                    <span style={{ color: '#71717A' }}>상표명 (영문)</span>
                    <span style={{ color: '#09090B' }}>{data.trademarkNameEn}</span>
                  </div>
                )}
                {data.trademarkNameZh && (
                  <div className="flex justify-between">
                    <span style={{ color: '#71717A' }}>상표명 (중문)</span>
                    <span style={{ color: '#09090B' }}>{data.trademarkNameZh}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: '#71717A' }}>우선권 주장</span>
                  <span style={{ color: '#09090B' }}>{data.hasPriority ? '예' : '아니오'}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#71717A' }}>중문 상표명 컨설팅</span>
                  <span style={{ color: '#09090B' }}>{data.needsChineseNameConsulting ? '신청' : '미신청'}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 비용 내역 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border border-gray-200 rounded-xl overflow-hidden mb-6"
      >
        <button
          onClick={() => toggleSection('costDetails')}
          className="w-full p-6 flex justify-between items-center group"
        >
          <h2 className="text-lg font-semibold" style={{ color: '#09090B' }}>
            비용 내역
          </h2>
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                openSections.costDetails ? 'rotate-180' : ''
              }`}
              style={{ color: '#71717A' }}
            />
          </div>
        </button>
        <AnimatePresence>
          {openSections.costDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3" style={{ color: '#71717A' }}>기본 출원료 (1류)</td>
                      <td className="py-3 text-right" style={{ color: '#09090B' }}>
                        {quotation.baseCostKRW.toLocaleString()}원
                      </td>
                    </tr>
                    {quotation.additionalClassCostKRW > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3" style={{ color: '#71717A' }}>
                          추가 류 비용 ({quotation.classCount - 1}류 x 300,000원)
                        </td>
                        <td className="py-3 text-right" style={{ color: '#09090B' }}>
                          {quotation.additionalClassCostKRW.toLocaleString()}원
                        </td>
                      </tr>
                    )}
                    <tr
                      className="border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors group"
                      onClick={() => toggleSection('productDetails')}
                    >
                      <td className="py-3 font-medium flex items-center gap-2" style={{ color: '#09090B' }}>
                        상품 출원료 소계
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openSections.productDetails ? 'rotate-180' : ''
                          }`}
                          style={{ color: '#71717A' }}
                        />
                      </td>
                      <td className="py-3 text-right font-medium" style={{ color: '#09090B' }}>
                        {(data.selectedClasses.reduce((sum, cls) => sum + cls.goods.length, 0) * 150000).toLocaleString()}원
                      </td>
                    </tr>
                    <AnimatePresence>
                      {openSections.productDetails && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan={2} className="p-0">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-gray-50"
                            >
                              <div className="p-4">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-gray-200">
                                      <th className="py-2 text-left font-medium text-xs" style={{ color: '#71717A' }}>상품 분류</th>
                                      <th className="py-2 text-left font-medium text-xs" style={{ color: '#71717A' }}>상품명</th>
                                      <th className="py-2 text-right font-medium text-xs" style={{ color: '#71717A' }}>가격</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.selectedClasses.map((cls) => {
                                      return cls.goods.map((good, goodIndex) => (
                                        <tr key={`${cls.classNumber}-${goodIndex}`} className="border-b border-gray-100">
                                          <td className="py-2 text-xs" style={{ color: '#09090B' }}>
                                            {goodIndex === 0 ? cls.className : ''}
                                          </td>
                                          <td className="py-2 text-xs" style={{ color: '#71717A' }}>{good}</td>
                                          <td className="py-2 text-right text-xs" style={{ color: '#71717A' }}>
                                            150,000원
                                          </td>
                                        </tr>
                                      ));
                                    })}
                                    {data.additionalGoods.map((good, index) => (
                                      <tr key={`additional-${index}`} className="border-b border-gray-100">
                                        <td className="py-2 text-xs" style={{ color: '#09090B' }}>
                                          {index === 0 ? '추가 입력' : ''}
                                        </td>
                                        <td className="py-2 text-xs" style={{ color: '#71717A' }}>{good}</td>
                                        <td className="py-2 text-right text-xs" style={{ color: '#71717A' }}>-</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                    {quotation.priorityCostKRW > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3" style={{ color: '#71717A' }}>우선권 주장</td>
                        <td className="py-3 text-right" style={{ color: '#09090B' }}>
                          {quotation.priorityCostKRW.toLocaleString()}원
                        </td>
                      </tr>
                    )}
                    {quotation.chineseNameConsultingKRW > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3" style={{ color: '#71717A' }}>중문 상표명 컨설팅</td>
                        <td className="py-3 text-right" style={{ color: '#09090B' }}>
                          {quotation.chineseNameConsultingKRW.toLocaleString()}원
                        </td>
                      </tr>
                    )}
                    <tr className="border-b border-gray-100">
                      <td className="py-3" style={{ color: '#71717A' }}>서비스 수수료</td>
                      <td className="py-3 text-right" style={{ color: '#09090B' }}>
                        {quotation.serviceFeeeKRW.toLocaleString()}원
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3" style={{ color: '#71717A' }}>소계</td>
                      <td className="py-3 text-right" style={{ color: '#09090B' }}>
                        {quotation.subtotalKRW.toLocaleString()}원
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3" style={{ color: '#71717A' }}>부가세 (10%)</td>
                      <td className="py-3 text-right" style={{ color: '#09090B' }}>
                        {quotation.vatKRW.toLocaleString()}원
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-[#09090B] p-6">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">총 비용</span>
                  <div className="text-right">
                    <p className="text-white text-xl font-bold">
                      {quotation.totalKRW.toLocaleString()}원
                    </p>
                    <p className="text-gray-400 text-sm">
                      (약 ${quotation.totalUSD.toLocaleString()} USD)
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * 환율 기준: 1 USD = {quotation.exchangeRate.toLocaleString()}원
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 견적서 다운로드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-3 mb-20"
      >
        <Button
          variant="outline"
          onClick={() => handleDownloadPDF('KRW')}
          className="flex-1"
        >
          견적서 다운로드 (원화)
        </Button>
        <Button
          variant="outline"
          onClick={() => handleDownloadPDF('USD')}
          className="flex-1"
        >
          견적서 다운로드 (달러)
        </Button>
      </motion.div>

      {/* 견적서 미리보기 모달 */}
      <AnimatePresence>
        {previewModal.open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] flex flex-col"
            >
              {/* 모달 헤더 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold" style={{ color: '#09090B', fontSize: '17px' }}>
                  견적서 미리보기 ({previewModal.currency === 'KRW' ? '원화' : '달러'})
                </h3>
              </div>

              {/* 모달 본문 */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="h-96 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                  <p className="text-center" style={{ color: '#71717A' }}>
                    실제 출력될 견적서가 보여집니다
                  </p>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="px-6 py-4 border-t border-gray-200">
                <Button
                  onClick={handleCloseModal}
                  className="w-full h-12"
                >
                  다운로드하기
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
