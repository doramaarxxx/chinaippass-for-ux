'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTrademarkStore } from '@/store/trademarkStore';

export default function TrademarkStep3Page() {
  const { data } = useTrademarkStore();

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
    // Mock PDF 다운로드
    alert(`견적서 (${currency === 'KRW' ? '원화' : '달러'}) 다운로드가 시작됩니다.`);
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
        className="p-6 bg-gray-50 rounded-xl mb-6"
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#09090B' }}>
          상표 정보
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: '#71717A' }}>상표 유형</span>
            <span style={{ color: '#09090B' }}>
              {data.trademarkType === 'text'
                ? '문자상표'
                : data.trademarkType === 'figure'
                ? '도형상표'
                : '결합상표'}
            </span>
          </div>
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

      {/* 선택 상품 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 bg-gray-50 rounded-xl mb-6"
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#09090B' }}>
          선택 상품 ({quotation.classCount}개 류)
        </h2>
        <div className="space-y-3">
          {data.selectedClasses.map((cls) => (
            <div key={cls.classNumber}>
              <p className="text-sm font-medium" style={{ color: '#09090B' }}>
                {cls.className}
              </p>
              <p className="text-xs mt-1" style={{ color: '#71717A' }}>
                {cls.goods.join(', ')}
              </p>
            </div>
          ))}
          {data.additionalGoods.length > 0 && (
            <div>
              <p className="text-sm font-medium" style={{ color: '#09090B' }}>
                추가 입력 상품
              </p>
              <p className="text-xs mt-1" style={{ color: '#71717A' }}>
                {data.additionalGoods.join(', ')}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* 비용 내역 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border border-gray-200 rounded-xl overflow-hidden mb-6"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#09090B' }}>
            비용 내역
          </h2>
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
    </div>
  );
}
