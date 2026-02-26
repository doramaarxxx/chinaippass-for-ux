'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTrademarkStore, NiceClassItem } from '@/store/trademarkStore';

// Nice 분류 데이터 (45개 류)
const NICE_CLASSES = [
  { classNumber: 1, className: '1류 - 화학제품류', goods: [
    '공업용 화학제품', '과학용 화학제품', '농업용 화학제품', '비료', '접착제',
    '산업용 접착제', '건축용 접착제', '의료용 접착제', '종이용 접착제', '목재용 접착제',
    '플라스틱 가공용 화학제품', '고무 가공용 화학제품', '금속 가공용 화학제품', '섬유 가공용 화학제품', '피혁 가공용 화학제품',
    '산업용 계면활성제', '세정용 계면활성제', '유화제', '분산제', '소포제',
    '산업용 촉매', '화학반응 촉매', '중합 촉매', '수소화 촉매', '산화 촉매',
    '산업용 용제', '세정용 용제', '도료용 용제', '인쇄용 용제', '접착제용 용제',
    '산업용 산', '염산', '황산', '질산', '인산',
    '산업용 알칼리', '수산화나트륨', '수산화칼륨', '암모니아', '탄산나트륨',
    '금속 표면처리제', '금속 세정제', '금속 방청제', '금속 탈지제', '금속 피막제',
    '도금용 화학제품', '전기도금용 화학제품', '무전해도금용 화학제품', '아연도금용 화학제품', '크롬도금용 화학제품',
    '수처리용 화학제품', '정수용 화학제품', '폐수처리용 화학제품', '보일러 수처리제', '냉각수 처리제',
    '식품 첨가용 화학제품', '식품 보존제', '식품 산화방지제', '식품 유화제', '식품 안정제',
    '화장품용 화학원료', '화장품용 계면활성제', '화장품용 유화제', '화장품용 보존제', '화장품용 향료원료',
    '의약품용 화학원료', '의약품용 부형제', '의약품용 첨가제', '의약품용 안정제', '의약품용 용제',
    '농약용 화학원료', '살충제용 원료', '살균제용 원료', '제초제용 원료', '비료용 원료',
    '반도체용 화학제품', '반도체 세정제', '반도체 식각액', '반도체 연마제', '반도체 포토레지스트',
    '전자재료용 화학제품', '디스플레이용 화학제품', '배터리용 화학제품', '태양전지용 화학제품', '전자부품용 화학제품',
    '자동차용 화학제품', '자동차용 세정제', '자동차용 왁스', '자동차용 코팅제', '자동차용 부동액',
    '건축용 화학제품', '건축용 방수제', '건축용 실란트', '건축용 코팅제', '건축용 몰탈혼화제',
    '섬유용 화학제품', '섬유용 염료', '섬유용 조제', '섬유용 유연제', '섬유용 발수제'
  ] },
  { classNumber: 2, className: '2류 - 염료·페인트류', goods: ['페인트', '니스', '래커', '방부제', '염료'] },
  { classNumber: 3, className: '3류 - 화장품/세정류', goods: ['화장품', '비누', '세제', '향료', '치약'] },
  { classNumber: 4, className: '4류 - 산업윤활유·연료류', goods: ['공업용 오일', '윤활제', '연료', '양초', '심지'] },
  { classNumber: 5, className: '5류 - 의약/위생용품류', goods: ['의약품', '의료용 영양제', '위생용품', '살균제', '의료용 반창고'] },
  { classNumber: 6, className: '6류 - 금속재료류', goods: ['비귀금속', '금속건축재료', '금속파이프', '금속케이블', '철물'] },
  { classNumber: 7, className: '7류 - 기계장치류', goods: ['공작기계', '모터', '엔진', '커플링', '전동장치'] },
  { classNumber: 8, className: '8류 - 공구류', goods: ['수동공구', '칼붙이', '면도기', '가위', '식탁용 칼'] },
  { classNumber: 9, className: '9류 - 전자기기류', goods: ['컴퓨터', '소프트웨어', '스마트폰', '전자출판물', '측정기기'] },
  { classNumber: 10, className: '10류 - 의료기기류', goods: ['의료기구', '수의과용 기구', '의료용 보조기', '봉합재료', '마사지기'] },
  { classNumber: 11, className: '11류 - 조명·난방기기류', goods: ['조명장치', '난방장치', '냉방장치', '정수기', '건조기'] },
  { classNumber: 12, className: '12류 - 운송수단류', goods: ['자동차', '오토바이', '자전거', '선박', '항공기'] },
  { classNumber: 13, className: '13류 - 화기·폭발물류', goods: ['화기', '탄약', '폭약', '불꽃', '폭죽'] },
  { classNumber: 14, className: '14류 - 귀금속류', goods: ['귀금속', '보석', '시계', '장신구', '귀금속제 예술품'] },
  { classNumber: 15, className: '15류 - 악기류', goods: ['악기', '악보대', '지휘봉', '피아노', '기타'] },
  { classNumber: 16, className: '16류 - 문구·인쇄물류', goods: ['종이', '인쇄물', '사무용품', '문방구', '포장재'] },
  { classNumber: 17, className: '17류 - 고무·플라스틱류', goods: ['고무', '플라스틱 반제품', '패킹', '절연재료', '호스'] },
  { classNumber: 18, className: '18류 - 가죽제품류', goods: ['가죽', '가방', '지갑', '우산', '지팡이'] },
  { classNumber: 19, className: '19류 - 비금속건축자재류', goods: ['비금속 건축재료', '콘크리트', '시멘트', '유리', '대리석'] },
  { classNumber: 20, className: '20류 - 가구류', goods: ['가구', '거울', '액자', '목재용기', '플라스틱제품'] },
  { classNumber: 21, className: '21류 - 주방·가정용품류', goods: ['주방용기', '식기', '유리제품', '도자기', '빗'] },
  { classNumber: 22, className: '22류 - 로프·섬유류', goods: ['로프', '끈', '텐트', '차양', '원섬유'] },
  { classNumber: 23, className: '23류 - 실류', goods: ['방직용 실', '면사', '견사', '모사', '합성섬유사'] },
  { classNumber: 24, className: '24류 - 직물류', goods: ['직물', '침대커버', '테이블보', '커튼', '수건'] },
  { classNumber: 25, className: '25류 - 의류류', goods: ['의류', '신발', '모자', '양말', '넥타이'] },
  { classNumber: 26, className: '26류 - 레이스·자수류', goods: ['레이스', '자수', '리본', '단추', '머리핀'] },
  { classNumber: 27, className: '27류 - 카펫류', goods: ['카펫', '러그', '매트', '벽지', '바닥재'] },
  { classNumber: 28, className: '28류 - 완구·운동용품류', goods: ['게임기', '완구', '스포츠용품', '낚시도구', '크리스마스장식'] },
  { classNumber: 29, className: '29류 - 육류·어류가공품류', goods: ['육류', '생선', '가금', '유제품', '식용유'] },
  { classNumber: 30, className: '30류 - 커피·차류', goods: ['커피', '차', '코코아', '빵', '과자'] },
  { classNumber: 31, className: '31류 - 곡물·종자류', goods: ['농산물', '원예제품', '종자', '화초', '사료'] },
  { classNumber: 32, className: '32류 - 맥주·음료류', goods: ['맥주', '미네랄워터', '청량음료', '과일주스', '시럽'] },
  { classNumber: 33, className: '33류 - 주류', goods: ['와인', '증류주', '소주', '위스키', '브랜디'] },
  { classNumber: 34, className: '34류 - 담배류', goods: ['담배', '흡연용품', '성냥', '라이터', '재떨이'] },
  { classNumber: 35, className: '35류 - 광고·사업관리류', goods: ['광고업', '사업관리', '도소매업', '마케팅', '온라인쇼핑몰운영'] },
  { classNumber: 36, className: '36류 - 금융·보험류', goods: ['보험업', '금융업', '부동산업', '신탁업', '증권업'] },
  { classNumber: 37, className: '37류 - 건설·수리류', goods: ['건설업', '수리업', '설치업', '청소업', '소독업'] },
  { classNumber: 38, className: '38류 - 통신류', goods: ['통신업', '방송업', '인터넷서비스', '전화서비스', '데이터전송'] },
  { classNumber: 39, className: '39류 - 운송·보관류', goods: ['운송업', '포장업', '창고업', '여행업', '배송서비스'] },
  { classNumber: 40, className: '40류 - 재료처리류', goods: ['재료가공업', '인쇄업', '식품가공업', '섬유처리업', '목재가공업'] },
  { classNumber: 41, className: '41류 - 교육·오락류', goods: ['교육업', '연수업', '연예업', '스포츠업', '출판업'] },
  { classNumber: 42, className: '42류 - 과학기술서비스류', goods: ['소프트웨어개발', '연구개발', 'IT컨설팅', '웹디자인', '클라우드서비스'] },
  { classNumber: 43, className: '43류 - 음식숙박류', goods: ['음식점업', '호텔업', '카페업', '케이터링', '숙박예약'] },
  { classNumber: 44, className: '44류 - 의료·미용류', goods: ['의료업', '미용업', '수의업', '농업서비스', '원예서비스'] },
  { classNumber: 45, className: '45류 - 법률·보안류', goods: ['법률서비스', '보안업', '지식재산권컨설팅', '장례업', '결혼중개업'] },
];

export default function TrademarkStep2Page() {
  const { data, updateData } = useTrademarkStore();

  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [classSearchQuery, setClassSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [additionalGood, setAdditionalGood] = useState('');

  // 초기화 버튼 클릭 시 로컬 상태도 리셋
  useEffect(() => {
    const handleReset = (e: CustomEvent<{ step: number }>) => {
      if (e.detail.step === 2) {
        setSelectedClass(null);
        setClassSearchQuery('');
        setSearchQuery('');
        setAdditionalGood('');
      }
    };

    window.addEventListener('trademark-reset', handleReset as EventListener);
    return () => {
      window.removeEventListener('trademark-reset', handleReset as EventListener);
    };
  }, []);

  // 상품 분류(류) 필터링
  const filteredClasses = useMemo(() => {
    if (!classSearchQuery.trim()) return NICE_CLASSES;
    return NICE_CLASSES.filter((cls) =>
      cls.className.toLowerCase().includes(classSearchQuery.toLowerCase())
    );
  }, [classSearchQuery]);

  // 선택된 류의 상품 목록 필터링
  const filteredGoods = useMemo(() => {
    if (!selectedClass) return [];
    const classData = NICE_CLASSES.find((c) => c.classNumber === selectedClass);
    if (!classData) return [];

    if (!searchQuery.trim()) return classData.goods;
    return classData.goods.filter((good) =>
      good.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedClass, searchQuery]);

  // 상품 선택/해제
  const toggleGood = (classNumber: number, good: string) => {
    const existingClass = data.selectedClasses.find(
      (c) => c.classNumber === classNumber
    );

    if (existingClass) {
      if (existingClass.goods.includes(good)) {
        // 상품 제거
        const newGoods = existingClass.goods.filter((g) => g !== good);
        if (newGoods.length === 0) {
          // 류 전체 제거
          updateData({
            selectedClasses: data.selectedClasses.filter(
              (c) => c.classNumber !== classNumber
            ),
          });
        } else {
          updateData({
            selectedClasses: data.selectedClasses.map((c) =>
              c.classNumber === classNumber ? { ...c, goods: newGoods } : c
            ),
          });
        }
      } else {
        // 상품 추가
        updateData({
          selectedClasses: data.selectedClasses.map((c) =>
            c.classNumber === classNumber
              ? { ...c, goods: [...c.goods, good] }
              : c
          ),
        });
      }
    } else {
      // 새 류 추가
      const classData = NICE_CLASSES.find((c) => c.classNumber === classNumber);
      if (classData) {
        updateData({
          selectedClasses: [
            ...data.selectedClasses,
            {
              classNumber,
              className: classData.className,
              goods: [good],
            },
          ],
        });
      }
    }
  };

  // 상품이 선택되었는지 확인
  const isGoodSelected = (classNumber: number, good: string) => {
    const classData = data.selectedClasses.find(
      (c) => c.classNumber === classNumber
    );
    return classData?.goods.includes(good) || false;
  };

  // 현재 필터된 상품들이 모두 선택되었는지 확인
  const isAllFilteredGoodsSelected = useMemo(() => {
    if (!selectedClass || filteredGoods.length === 0) return false;
    return filteredGoods.every((good) => isGoodSelected(selectedClass, good));
  }, [selectedClass, filteredGoods, data.selectedClasses]);

  // 현재 필터된 상품들 중 일부만 선택되었는지 확인
  const isSomeFilteredGoodsSelected = useMemo(() => {
    if (!selectedClass || filteredGoods.length === 0) return false;
    const selectedCount = filteredGoods.filter((good) => isGoodSelected(selectedClass, good)).length;
    return selectedCount > 0 && selectedCount < filteredGoods.length;
  }, [selectedClass, filteredGoods, data.selectedClasses]);

  // 전체 선택/해제 토글
  const toggleAllFilteredGoods = () => {
    if (!selectedClass) return;

    const classData = NICE_CLASSES.find((c) => c.classNumber === selectedClass);
    if (!classData) return;

    if (isAllFilteredGoodsSelected) {
      // 전체 해제: 필터된 상품들만 제거
      const existingClass = data.selectedClasses.find((c) => c.classNumber === selectedClass);
      if (existingClass) {
        const remainingGoods = existingClass.goods.filter((g) => !filteredGoods.includes(g));
        if (remainingGoods.length === 0) {
          updateData({
            selectedClasses: data.selectedClasses.filter((c) => c.classNumber !== selectedClass),
          });
        } else {
          updateData({
            selectedClasses: data.selectedClasses.map((c) =>
              c.classNumber === selectedClass ? { ...c, goods: remainingGoods } : c
            ),
          });
        }
      }
    } else {
      // 전체 선택: 필터된 상품들 추가
      const existingClass = data.selectedClasses.find((c) => c.classNumber === selectedClass);
      if (existingClass) {
        const newGoods = [...new Set([...existingClass.goods, ...filteredGoods])];
        updateData({
          selectedClasses: data.selectedClasses.map((c) =>
            c.classNumber === selectedClass ? { ...c, goods: newGoods } : c
          ),
        });
      } else {
        updateData({
          selectedClasses: [
            ...data.selectedClasses,
            {
              classNumber: selectedClass,
              className: classData.className,
              goods: filteredGoods,
            },
          ],
        });
      }
    }
  };

  // 추가 상품 입력
  const handleAddGood = () => {
    if (additionalGood.trim()) {
      updateData({
        additionalGoods: [...data.additionalGoods, additionalGood.trim()],
      });
      setAdditionalGood('');
    }
  };

  // 추가 상품 삭제
  const removeAdditionalGood = (good: string) => {
    updateData({
      additionalGoods: data.additionalGoods.filter((g) => g !== good),
    });
  };

  // 선택 상품 태그 삭제
  const removeSelectedGood = (classNumber: number, good: string) => {
    toggleGood(classNumber, good);
  };

  // 총 선택된 상품 수
  const totalSelectedGoods =
    data.selectedClasses.reduce((sum, c) => sum + c.goods.length, 0) +
    data.additionalGoods.length;

  // 예상 비용 계산
  const estimatedCost = useMemo(() => {
    const classCount = data.selectedClasses.length;
    if (classCount === 0) return 0;

    const baseCost = 500000; // 1류 기준
    const additionalCost = (classCount - 1) * 300000; // 추가 류
    const serviceFee = 100000;

    return baseCost + additionalCost + serviceFee;
  }, [data.selectedClasses]);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#09090B' }}>
          상품 선택
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#71717A' }}>
          NICE 분류 체계에서 출원할 상품을 선택해주세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#F8F9FA] p-6 rounded-xl mb-6">
        {/* 류 선택 */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">상품 분류 (류)</Label>
            <Input
              value={classSearchQuery}
              onChange={(e) => setClassSearchQuery(e.target.value)}
              placeholder="분류 검색..."
              className="mt-2 bg-white"
            />
          </div>
          <div className="relative">
            <div className="space-y-2 h-[384px] overflow-y-auto scrollbar-hide">
              {filteredClasses.map((cls) => {
                const selectedCount = data.selectedClasses.find(
                  (c) => c.classNumber === cls.classNumber
                )?.goods.length || 0;

                return (
                  <button
                    key={cls.classNumber}
                    onClick={() => setSelectedClass(cls.classNumber)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-500 ease-out ${
                      selectedClass === cls.classNumber
                        ? 'border-[#09090B] bg-white'
                        : 'border-gray-200 bg-[#FCFCFC] hover:border-gray-300 hover:bg-white hover:scale-[0.96]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: '#09090B' }}>
                        {cls.className}
                      </span>
                      {selectedCount > 0 && (
                        <span className="text-xs bg-[#09090B] text-white px-2 py-0.5 rounded-full">
                          {selectedCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {/* 하단 페이드 효과 */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(248,249,250,0.9), #F8F9FA)'
              }}
            />
          </div>
        </div>

        {/* 상품 목록 */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">상품 목록</Label>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="상품 검색..."
              className="mt-2 bg-white"
            />
          </div>

          <div className="border border-gray-200 rounded-lg bg-[#FCFCFC]">
            {selectedClass ? (
              filteredGoods.length > 0 ? (
                <>
                  {/* 전체 선택 체크박스 */}
                  <label className="flex items-center gap-2 p-3 border-b border-gray-200 bg-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAllFilteredGoodsSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeFilteredGoodsSelected;
                      }}
                      onChange={toggleAllFilteredGoods}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium" style={{ color: '#09090B' }}>
                      전체 선택
                    </span>
                    <span className="text-xs" style={{ color: '#71717A' }}>
                      ({filteredGoods.filter((good) => isGoodSelected(selectedClass, good)).length}/{filteredGoods.length})
                    </span>
                  </label>
                  {/* 상품 목록 */}
                  <div className="h-[340px] overflow-y-auto p-2 space-y-1">
                    {filteredGoods.map((good) => (
                      <label
                        key={good}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isGoodSelected(selectedClass, good)}
                          onChange={() => toggleGood(selectedClass, good)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm" style={{ color: '#09090B' }}>
                          {good}
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-[384px] flex items-center justify-center">
                  <p className="text-sm text-center" style={{ color: '#71717A' }}>
                    검색 결과가 없습니다.
                  </p>
                </div>
              )
            ) : (
              <div className="h-[384px] flex items-center justify-center">
                <p className="text-sm text-center" style={{ color: '#71717A' }}>
                  좌측에서 류를 선택해주세요.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 선택된 상품 */}
        <div className="space-y-4 flex flex-col">
          <Label className="text-base font-medium">선택된 상품</Label>

          <div className="h-[180px] overflow-y-auto border border-gray-200 rounded-lg p-3 bg-white">
            {data.selectedClasses.length > 0 || data.additionalGoods.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.selectedClasses.map((cls) =>
                  cls.goods.map((good) => (
                    <span
                      key={`${cls.classNumber}-${good}`}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs"
                    >
                      <span style={{ color: '#09090B' }}>{good}</span>
                      <button
                        onClick={() => removeSelectedGood(cls.classNumber, good)}
                        className="text-[#71717A] hover:text-[#09090B]"
                      >
                        x
                      </button>
                    </span>
                  ))
                )}
                {data.additionalGoods.map((good) => (
                  <span
                    key={good}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-xs"
                  >
                    <span style={{ color: '#09090B' }}>{good}</span>
                    <button
                      onClick={() => removeAdditionalGood(good)}
                      className="text-[#71717A] hover:text-[#09090B]"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-center py-4" style={{ color: '#71717A' }}>
                선택된 상품이 없습니다.
              </p>
            )}
          </div>

          {/* 추가 상품 입력 */}
          <div>
            <Label className="text-sm">추가 상품 직접 입력</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={additionalGood}
                onChange={(e) => setAdditionalGood(e.target.value)}
                placeholder="상품명 입력"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddGood();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddGood}>
                추가
              </Button>
            </div>
          </div>

          {/* 요약 */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-2 mt-auto">
            <div className="flex justify-between text-sm">
              <span style={{ color: '#71717A' }}>선택 류</span>
              <span style={{ color: '#09090B' }}>{data.selectedClasses.length}개</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#71717A' }}>선택 상품</span>
              <span style={{ color: '#09090B' }}>{totalSelectedGoods}개</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t">
              <span style={{ color: '#09090B' }}>예상 비용</span>
              <span style={{ color: '#09090B' }}>
                {estimatedCost.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </div>

          </div>
  );
}
