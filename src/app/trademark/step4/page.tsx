'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTrademarkStore, ApplicantType, Applicant, Agent } from '@/store/trademarkStore';

export default function TrademarkStep4Page() {
  const router = useRouter();
  const { data, updateData, completeStep, reset } = useTrademarkStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [agreedToSign, setAgreedToSign] = useState(false);

  // Mock 로그인 상태 체크 (LocalStorage 기반)
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';

  // 회원 정보 불러오기
  const handleLoadUserInfo = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // Mock 회원 정보 (실제로는 API에서 가져옴)
    const mockUserInfo = {
      type: 'individual' as ApplicantType,
      nameKo: '홍길동',
      nameEn: 'Hong Gildong',
      nameZh: '洪吉童',
      phone: '010-1234-5678',
      email: 'user@example.com',
      addressKo: '서울특별시 강남구 테헤란로 123',
      addressEn: '123, Teheran-ro, Gangnam-gu, Seoul',
      addressDetail: '5층 501호',
      businessNumber: '',
      representativeName: '',
    };

    updateData({ applicant: mockUserInfo });
  };

  // 신청인 정보 초기화
  const applicant: Applicant = data.applicant || {
    type: 'individual',
    nameKo: '',
    nameEn: '',
    nameZh: '',
    businessNumber: '',
    representativeName: '',
    phone: '',
    email: '',
    addressKo: '',
    addressEn: '',
    addressDetail: '',
  };

  // 대리인 정보 초기화
  const agent: Agent = data.agent || {
    name: '',
    phone: '',
    email: '',
  };

  const updateApplicant = (field: keyof Applicant, value: string) => {
    updateData({
      applicant: { ...applicant, [field]: value },
    });
  };

  const updateAgent = (field: keyof Agent, value: string) => {
    updateData({
      agent: { ...agent, [field]: value },
    });
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!applicant.nameKo.trim()) {
      newErrors.nameKo = '신청인명(한글)을 입력해주세요.';
    }
    if (!applicant.nameEn.trim()) {
      newErrors.nameEn = '신청인명(영문)을 입력해주세요.';
    }
    if (!applicant.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    }
    if (!applicant.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    }
    if (!applicant.addressKo.trim()) {
      newErrors.addressKo = '주소를 입력해주세요.';
    }
    if (!applicant.addressDetail.trim()) {
      newErrors.addressDetail = '상세주소를 입력해주세요.';
    }

    if (applicant.type === 'corporation') {
      if (!applicant.businessNumber?.trim()) {
        newErrors.businessNumber = '사업자등록번호를 입력해주세요.';
      }
      if (!applicant.representativeName?.trim()) {
        newErrors.representativeName = '대표자명을 입력해주세요.';
      }
    }

    if (data.hasAgent) {
      if (!agent.name.trim()) {
        newErrors.agentName = '대리인명을 입력해주세요.';
      }
      if (!agent.phone.trim()) {
        newErrors.agentPhone = '대리인 연락처를 입력해주세요.';
      }
      if (!agent.email.trim()) {
        newErrors.agentEmail = '대리인 이메일을 입력해주세요.';
      }
    }

    if (!agreedToSign) {
      newErrors.sign = '전자서명에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(() => {
    if (validate()) {
      setShowConfirmModal(true);
    }
  }, [agreedToSign, applicant, agent, data.hasAgent]);

  const handleConfirmSubmit = () => {
    completeStep(4);
    // Mock 제출 완료
    alert('신청서가 제출되었습니다. 신청번호: TM-2024-00001');
    reset();
    router.push('/trademark');
  };

  // 레이아웃의 '신청서 제출' 버튼 클릭 이벤트 리스닝
  useEffect(() => {
    const handleTrademarkSubmit = () => {
      handleSubmit();
    };
    window.addEventListener('trademark-submit', handleTrademarkSubmit);
    return () => {
      window.removeEventListener('trademark-submit', handleTrademarkSubmit);
    };
  }, [handleSubmit]);

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#09090B' }}>
              신청인 정보 & 제출
            </h1>
            <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
              신청인 정보를 입력하고 최종 제출해주세요.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleLoadUserInfo}
          >
            회원 정보 불러오기
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* 신청인 유형 */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            신청인 유형 <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={applicant.type}
            onValueChange={(value) => updateApplicant('type', value as ApplicantType)}
            className="flex gap-6"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="individual" id="individual" />
              <span>개인</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="corporation" id="corporation" />
              <span>법인</span>
            </label>
          </RadioGroup>
        </div>

        {/* 신청인 정보 */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium">
                신청인명 (한글) <span className="text-red-500">*</span>
              </Label>
              <Input
                value={applicant.nameKo}
                onChange={(e) => updateApplicant('nameKo', e.target.value)}
                placeholder="홍길동 또는 회사명"
                className="mt-2"
              />
              {errors.nameKo && (
                <p className="text-sm text-red-500 mt-1">{errors.nameKo}</p>
              )}
            </div>
            <div>
              <Label className="text-base font-medium">
                신청인명 (영문) <span className="text-red-500">*</span>
              </Label>
              <Input
                value={applicant.nameEn}
                onChange={(e) => updateApplicant('nameEn', e.target.value)}
                placeholder="Hong Gildong"
                className="mt-2"
              />
              {errors.nameEn && (
                <p className="text-sm text-red-500 mt-1">{errors.nameEn}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">신청인명 (중문)</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={applicant.nameZh || ''}
                onChange={(e) => updateApplicant('nameZh', e.target.value)}
                placeholder="洪吉童"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => updateApplicant('nameZh', '洪吉童')}
              >
                자동번역
              </Button>
            </div>
          </div>

          {/* 법인 추가 필드 */}
          {applicant.type === 'corporation' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <Label className="text-base font-medium">
                  사업자등록번호 <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={applicant.businessNumber || ''}
                  onChange={(e) => updateApplicant('businessNumber', e.target.value)}
                  placeholder="000-00-00000"
                  className="mt-2"
                />
                {errors.businessNumber && (
                  <p className="text-sm text-red-500 mt-1">{errors.businessNumber}</p>
                )}
              </div>
              <div>
                <Label className="text-base font-medium">
                  대표자명 <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={applicant.representativeName || ''}
                  onChange={(e) => updateApplicant('representativeName', e.target.value)}
                  placeholder="홍길동"
                  className="mt-2"
                />
                {errors.representativeName && (
                  <p className="text-sm text-red-500 mt-1">{errors.representativeName}</p>
                )}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium">
                연락처 <span className="text-red-500">*</span>
              </Label>
              <Input
                value={applicant.phone}
                onChange={(e) =>
                  updateApplicant('phone', formatPhoneNumber(e.target.value))
                }
                placeholder="010-0000-0000"
                className="mt-2"
                maxLength={13}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <Label className="text-base font-medium">
                이메일 <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={applicant.email}
                onChange={(e) => updateApplicant('email', e.target.value)}
                placeholder="email@example.com"
                className="mt-2"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">
              주소 (한글) <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={applicant.addressKo}
                onChange={(e) => updateApplicant('addressKo', e.target.value)}
                placeholder="도로명 주소"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Mock 주소 검색
                  updateApplicant('addressKo', '서울특별시 강남구 테헤란로 123');
                  updateApplicant('addressEn', '123, Teheran-ro, Gangnam-gu, Seoul');
                }}
              >
                주소 검색
              </Button>
            </div>
            {errors.addressKo && (
              <p className="text-sm text-red-500 mt-1">{errors.addressKo}</p>
            )}
          </div>

          <div>
            <Label className="text-base font-medium">주소 (영문)</Label>
            <Input
              value={applicant.addressEn}
              onChange={(e) => updateApplicant('addressEn', e.target.value)}
              placeholder="English Address"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-base font-medium">
              상세주소 <span className="text-red-500">*</span>
            </Label>
            <Input
              value={applicant.addressDetail}
              onChange={(e) => updateApplicant('addressDetail', e.target.value)}
              placeholder="상세주소 입력"
              className="mt-2"
            />
            {errors.addressDetail && (
              <p className="text-sm text-red-500 mt-1">{errors.addressDetail}</p>
            )}
          </div>
        </div>

        {/* 대리인 정보 */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.hasAgent}
              onChange={(e) => updateData({ hasAgent: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="font-medium" style={{ color: '#09090B' }}>
              대리인 지정
            </span>
          </label>

          {data.hasAgent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-4"
            >
              <div>
                <Label>대리인명 <span className="text-red-500">*</span></Label>
                <Input
                  value={agent.name}
                  onChange={(e) => updateAgent('name', e.target.value)}
                  placeholder="대리인명"
                  className="mt-2"
                />
                {errors.agentName && (
                  <p className="text-sm text-red-500 mt-1">{errors.agentName}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>연락처 <span className="text-red-500">*</span></Label>
                  <Input
                    value={agent.phone}
                    onChange={(e) =>
                      updateAgent('phone', formatPhoneNumber(e.target.value))
                    }
                    placeholder="010-0000-0000"
                    className="mt-2"
                    maxLength={13}
                  />
                  {errors.agentPhone && (
                    <p className="text-sm text-red-500 mt-1">{errors.agentPhone}</p>
                  )}
                </div>
                <div>
                  <Label>이메일 <span className="text-red-500">*</span></Label>
                  <Input
                    type="email"
                    value={agent.email}
                    onChange={(e) => updateAgent('email', e.target.value)}
                    placeholder="email@example.com"
                    className="mt-2"
                  />
                  {errors.agentEmail && (
                    <p className="text-sm text-red-500 mt-1">{errors.agentEmail}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* 전자서명 동의 */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToSign}
              onChange={(e) => setAgreedToSign(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm" style={{ color: '#09090B' }}>
              전자서명에 동의합니다. 본인은 위 내용이 사실임을 확인합니다.
            </span>
          </label>
          {errors.sign && (
            <p className="text-sm text-red-500">{errors.sign}</p>
          )}
        </div>

      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-bold" style={{ color: '#09090B' }}>
              신청서 제출 확인
            </h3>
            <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
              입력하신 정보로 상표 출원 신청서를 제출하시겠습니까?
              제출 후에는 수정이 불가능합니다.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmModal(false)}
              >
                취소
              </Button>
              <Button className="flex-1" onClick={handleConfirmSubmit}>
                제출 확인
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold" style={{ color: '#09090B' }}>
              로그인 필요
            </h3>
            <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
              회원 정보를 불러오려면 로그인이 필요합니다.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowLoginModal(false)}
              >
                취소
              </Button>
              <Button
                className="flex-1"
                onClick={() => router.push('/auth/login')}
              >
                로그인하기
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
