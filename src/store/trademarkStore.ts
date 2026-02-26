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

// 장바구니 아이템 (상표 1건)
export interface CartItem {
  id: string;
  trademarkNameKo: string;
  trademarkNameEn: string;
  trademarkNameZh: string;
  trademarkImage: string | null;
  trademarkDescription: string;
  needsChineseNameConsulting: boolean;
  hasPriority: boolean;
  priorityCountry: string;
  priorityDate: string;
  priorityNumber: string;
  selectedClasses: NiceClassItem[];
  createdAt: Date;
  isSelected: boolean;
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

  // 장바구니
  cart: CartItem[];

  // Actions
  setCurrentStep: (step: number) => void;
  updateData: (data: Partial<TrademarkData>) => void;
  completeStep: (step: number) => void;
  reset: () => void;
  resetStep: (step: number) => void;

  // 장바구니 Actions
  addToCart: () => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  selectCartItem: (id: string) => void;
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
    (set, get) => ({
      currentStep: 1,
      data: initialData,
      completedSteps: [],
      cart: [],

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

      // 장바구니에 현재 상표 추가
      addToCart: () => {
        const state = get();
        const { data } = state;

        const newItem: CartItem = {
          id: Date.now().toString(),
          trademarkNameKo: data.trademarkNameKo || '(상표명 미입력)',
          trademarkNameEn: data.trademarkNameEn,
          trademarkNameZh: data.trademarkNameZh,
          trademarkImage: data.trademarkImage,
          trademarkDescription: data.trademarkDescription,
          needsChineseNameConsulting: data.needsChineseNameConsulting,
          hasPriority: data.hasPriority,
          priorityCountry: data.priorityCountry,
          priorityDate: data.priorityDate,
          priorityNumber: data.priorityNumber,
          selectedClasses: data.selectedClasses,
          createdAt: new Date(),
          isSelected: true, // 새로 추가된 아이템은 자동 선택
        };

        set((state) => ({
          // 기존 아이템들은 선택 해제, 새 아이템은 선택됨
          cart: [...state.cart.map(item => ({ ...item, isSelected: false })), newItem],
          // 현재 입력 데이터 초기화
          data: {
            ...initialData,
            applicant: state.data.applicant,
            hasAgent: state.data.hasAgent,
            agent: state.data.agent,
          },
          currentStep: 1,
          completedSteps: [],
        }));
      },

      removeFromCart: (id) =>
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== id);
          // 삭제 후 선택된 아이템이 없으면 첫 번째 아이템 선택
          if (newCart.length > 0 && !newCart.some(item => item.isSelected)) {
            newCart[0].isSelected = true;
          }
          return { cart: newCart };
        }),

      clearCart: () => set({ cart: [] }),

      selectCartItem: (id) =>
        set((state) => ({
          cart: state.cart.map(item => ({
            ...item,
            isSelected: item.id === id,
          })),
        })),

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
