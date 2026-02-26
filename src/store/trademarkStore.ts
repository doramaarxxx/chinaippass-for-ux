import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상표 유형
export type TrademarkType = 'text' | 'figure' | 'combined';

// 신청인 유형
export type ApplicantType = 'individual' | 'corporation';

// Nice 분류 상품
export interface NiceClassItem {
  classNumber: number;
  className: string;
  goods: string[];
}

// 신청인 정보
export interface Applicant {
  type: ApplicantType;
  nameKo: string;
  nameEn: string;
  nameZh?: string;
  businessNumber?: string;
  representativeName?: string;
  phone: string;
  email: string;
  addressKo: string;
  addressEn: string;
  addressDetail: string;
}

// 대리인 정보
export interface Agent {
  name: string;
  phone: string;
  email: string;
}

// 상표 신청 데이터
export interface TrademarkData {
  // Step 1: 상표정보
  trademarkType: TrademarkType | null;
  trademarkNameKo: string;
  trademarkNameEn: string;
  trademarkNameZh: string;
  trademarkImage: string | null;
  trademarkDescription: string;
  needsChineseNameConsulting: boolean; // 중문 상표명 컨설팅 신청
  hasPriority: boolean;
  priorityCountry: string;
  priorityDate: string;
  priorityNumber: string;

  // Step 2: 상품 선택
  selectedClasses: NiceClassItem[];
  additionalGoods: string[];

  // Step 4: 신청인 정보
  applicant: Applicant | null;
  hasAgent: boolean;
  agent: Agent | null;

  // 첨부 서류
  businessLicense: string | null;
  powerOfAttorney: string | null;
  priorityDocument: string | null;
}

interface TrademarkStore {
  // 현재 단계
  currentStep: number;

  // 데이터
  data: TrademarkData;

  // 단계별 완료 상태
  completedSteps: number[];

  // Actions
  setCurrentStep: (step: number) => void;
  updateData: (data: Partial<TrademarkData>) => void;
  completeStep: (step: number) => void;
  reset: () => void;
  resetStep: (step: number) => void;
}

const initialData: TrademarkData = {
  // Step 1
  trademarkType: null,
  trademarkNameKo: '',
  trademarkNameEn: '',
  trademarkNameZh: '',
  trademarkImage: null,
  trademarkDescription: '',
  needsChineseNameConsulting: false,
  hasPriority: false,
  priorityCountry: '',
  priorityDate: '',
  priorityNumber: '',

  // Step 2
  selectedClasses: [],
  additionalGoods: [],

  // Step 4
  applicant: null,
  hasAgent: false,
  agent: null,

  // 첨부 서류
  businessLicense: null,
  powerOfAttorney: null,
  priorityDocument: null,
};

export const useTrademarkStore = create<TrademarkStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      data: initialData,
      completedSteps: [],

      setCurrentStep: (step) => set({ currentStep: step }),

      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),

      completeStep: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      reset: () =>
        set({
          currentStep: 1,
          data: initialData,
          completedSteps: [],
        }),

      resetStep: (step: number) =>
        set((state) => {
          const newData = { ...state.data };
          const newCompletedSteps = state.completedSteps.filter((s) => s !== step);

          if (step === 1) {
            // Step 1 초기화: 상표정보
            newData.trademarkType = null;
            newData.trademarkNameKo = '';
            newData.trademarkNameEn = '';
            newData.trademarkNameZh = '';
            newData.trademarkImage = null;
            newData.trademarkDescription = '';
            newData.needsChineseNameConsulting = false;
            newData.hasPriority = false;
            newData.priorityCountry = '';
            newData.priorityDate = '';
            newData.priorityNumber = '';
          } else if (step === 2) {
            // Step 2 초기화: 상품 선택
            newData.selectedClasses = [];
            newData.additionalGoods = [];
          } else if (step === 4) {
            // Step 4 초기화: 신청인 정보
            newData.applicant = null;
            newData.hasAgent = false;
            newData.agent = null;
            newData.businessLicense = null;
            newData.powerOfAttorney = null;
            newData.priorityDocument = null;
          }
          // Step 3는 계산된 값이므로 초기화 불필요

          return {
            data: newData,
            completedSteps: newCompletedSteps,
          };
        }),
    }),
    {
      name: 'trademark-storage',
    }
  )
);
