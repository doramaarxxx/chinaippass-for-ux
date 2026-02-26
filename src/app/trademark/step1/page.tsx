'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTrademarkStore } from '@/store/trademarkStore';

const COUNTRIES = [
  { value: 'KR', label: '대한민국' },
  { value: 'US', label: '미국' },
  { value: 'JP', label: '일본' },
  { value: 'EU', label: '유럽연합' },
  { value: 'CN', label: '중국' },
];

export default function TrademarkStep1Page() {
  const { data, updateData } = useTrademarkStore();

  const handlePriorityChange = (value: string) => {
    updateData({ hasPriority: value === 'yes' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ trademarkImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#09090B' }}>
          상표정보 입력
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
          출원하려는 상표의 기본 정보를 입력해주세요.
        </p>
      </div>

      <div className="space-y-8">
        {/* 상표명 */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="trademarkNameKo" className="text-base font-medium">
              상표명 (한글) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="trademarkNameKo"
              value={data.trademarkNameKo}
              onChange={(e) => updateData({ trademarkNameKo: e.target.value })}
              placeholder="예: 차이나아이피패스"
              className="mt-2"
            />
                      </div>

          <div>
            <Label htmlFor="trademarkNameEn" className="text-base font-medium">
              상표명 (영문)
            </Label>
            <Input
              id="trademarkNameEn"
              value={data.trademarkNameEn}
              onChange={(e) => updateData({ trademarkNameEn: e.target.value })}
              placeholder="예: China IP Pass"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="trademarkNameZh" className="text-base font-medium">
              상표명 (중문)
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="trademarkNameZh"
                value={data.trademarkNameZh}
                onChange={(e) => updateData({ trademarkNameZh: e.target.value })}
                placeholder="예: 中国知识产权通"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Mock 자동번역
                  if (data.trademarkNameKo) {
                    updateData({ trademarkNameZh: '中国知识产权通' });
                  }
                }}
              >
                자동번역
              </Button>
            </div>
          </div>

          {/* 중문 상표명 컨설팅 신청 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.needsChineseNameConsulting}
                onChange={(e) => updateData({ needsChineseNameConsulting: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-gray-300"
              />
              <div>
                <span className="font-medium" style={{ color: '#09090B' }}>
                  중문 상표명 컨설팅 신청
                </span>
                <p className="text-sm mt-1" style={{ color: '#71717A' }}>
                  전문가가 중국 시장에 적합한 중문 상표명을 제안해 드립니다.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* 상표 이미지 */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            상표 이미지
          </Label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              data.trademarkImage ? 'border-[#09090B]' : 'border-gray-200'
            }`}
          >
            {data.trademarkImage ? (
              <div className="space-y-4">
                <img
                  src={data.trademarkImage}
                  alt="상표 이미지"
                  className="max-h-40 mx-auto"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => updateData({ trademarkImage: null })}
                >
                  이미지 삭제
                </Button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="space-y-2">
                  <p style={{ color: '#71717A' }}>
                    클릭하여 이미지를 업로드하세요
                  </p>
                  <p className="text-xs" style={{ color: '#71717A' }}>
                    JPG, PNG (최대 5MB)
                  </p>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* 상표 설명 */}
        <div>
          <Label htmlFor="trademarkDescription" className="text-base font-medium">
            상표 설명
          </Label>
          <Textarea
            id="trademarkDescription"
            value={data.trademarkDescription}
            onChange={(e) => updateData({ trademarkDescription: e.target.value })}
            placeholder="상표에 대한 추가 설명을 입력해주세요."
            className="mt-2"
            rows={3}
          />
        </div>

        {/* 우선권 주장 */}
        <div className="space-y-3 mb-16">
          <Label className="text-base font-medium">
            우선권 주장 여부 <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={data.hasPriority ? 'yes' : 'no'}
            onValueChange={handlePriorityChange}
            className="flex gap-6"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="no" id="priority-no" />
              <span>아니오</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="yes" id="priority-yes" />
              <span>예</span>
            </label>
          </RadioGroup>
        </div>

        {/* 우선권 정보 (우선권 주장 시) */}
        {data.hasPriority && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 p-4 bg-gray-50 rounded-lg mb-16"
          >
            <div>
              <Label htmlFor="priorityCountry" className="text-base font-medium">
                기초출원국 <span className="text-red-500">*</span>
              </Label>
              <select
                id="priorityCountry"
                value={data.priorityCountry}
                onChange={(e) => updateData({ priorityCountry: e.target.value })}
                className="mt-2 w-full h-10 px-3 border border-gray-200 rounded-md"
              >
                <option value="">선택해주세요</option>
                {COUNTRIES.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
                          </div>

            <div>
              <Label htmlFor="priorityDate" className="text-base font-medium">
                기초출원일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="priorityDate"
                type="date"
                value={data.priorityDate}
                onChange={(e) => updateData({ priorityDate: e.target.value })}
                className="mt-2"
              />
                          </div>

            <div>
              <Label htmlFor="priorityNumber" className="text-base font-medium">
                기초출원번호 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="priorityNumber"
                value={data.priorityNumber}
                onChange={(e) => updateData({ priorityNumber: e.target.value })}
                placeholder="예: 40-2024-0001234"
                className="mt-2"
              />
                          </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
