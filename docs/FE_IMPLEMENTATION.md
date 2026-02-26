# China IP Pass 프론트엔드 구현 가이드

## 1. 기술 스택

### 1.1 Core
| 기술 | 버전 | 용도 |
|---|---|---|
| Next.js | 14.x | React 프레임워크 (App Router) |
| React | 18.x | UI 라이브러리 |
| TypeScript | 5.x | 타입 안정성 |

### 1.2 Styling
| 기술 | 용도 |
|---|---|
| Tailwind CSS | 유틸리티 기반 스타일링 |
| shadcn/ui | UI 컴포넌트 라이브러리 |
| Framer Motion | 애니메이션 |

### 1.3 State & Data
| 기술 | 용도 |
|---|---|
| Zustand | 전역 상태 관리 |
| React Hook Form | 폼 상태 관리 |
| Zod | 폼 유효성 검사 |

### 1.4 Utilities
| 기술 | 용도 |
|---|---|
| date-fns | 날짜 처리 |
| jsPDF / html2pdf.js | PDF 생성 |
| Recharts | 차트 (어드민) |
| Lucide React | 아이콘 |

---

## 2. 디자인 시스템

### 2.1 디자인 컨셉
- **스타일**: shadcn/ui 기반 미니멀 디자인
- **컬러**: 블랙 모노톤 (단일 컬러)
- **모션**: 요소 등장 시 부드러운 애니메이션
- **이모지 금지**: 모든 UI 요소에서 이모지 사용하지 않음 (아이콘은 Lucide React 사용)

### 2.2 컬러 팔레트

**사용 컬러 (2가지만):**

| 용도 | Hex | 설명 |
|---|---|---|
| Primary | #09090B | 메인 텍스트, 버튼, 강조 |
| Secondary | #71717A | 보조 텍스트, 설명문 |
| Background | #FFFFFF | 배경색 |

```css
:root {
  --color-primary: #09090B;
  --color-secondary: #71717A;
  --color-background: #FFFFFF;
}
```

### 2.3 타이포그래피

```css
/* Font Family */
--font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 2.3.1 폰트 선택 기능 (데모용)

**폰트 3종:**

| 폰트명 | 특징 | 소스 |
|---|---|---|
| Pretendard | 모던, 깔끔한 산세리프 | CDN (기본값) |
| MaruBuri | 부드러운 명조, 전통적 느낌 | 네이버 CDN |
| Noto Sans KR | 안정적, 가독성 좋음 | Google Fonts |

**globals.css에 폰트 정의:**

```css
/* Pretendard - CDN */
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2');
  font-weight: 100;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2');
  font-weight: 200;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2');
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2');
  font-weight: 900;
  font-display: swap;
}

/* MaruBuri - 네이버 CDN */
@font-face {
  font-family: 'MaruBuri';
  src: url('https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-ExtraLight.woff2') format('woff2');
  font-weight: 200;
  font-display: swap;
}
@font-face {
  font-family: 'MaruBuri';
  src: url('https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Light.woff2') format('woff2');
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: 'MaruBuri';
  src: url('https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'MaruBuri';
  src: url('https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: 'MaruBuri';
  src: url('https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

/* Noto Sans KR - Google Fonts (layout.tsx에서 import) */
```

**폰트 설정:**

```typescript
// lib/fonts.ts
import { Noto_Sans_KR } from 'next/font/google';

export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const FONT_OPTIONS = [
  { id: 'pretendard', name: 'Pretendard', family: 'Pretendard' },
  { id: 'maruburi', name: 'MaruBuri', family: 'MaruBuri' },
  { id: 'noto', name: 'Noto Sans KR', family: 'var(--font-noto)' },
] as const;

export type FontId = typeof FONT_OPTIONS[number]['id'];
```

**폰트 스토어:**

```typescript
// stores/fontStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FontId } from '@/lib/fonts';

interface FontState {
  currentFont: FontId;
  setFont: (font: FontId) => void;
}

export const useFontStore = create<FontState>()(
  persist(
    (set) => ({
      currentFont: 'pretendard',
      setFont: (font) => set({ currentFont: font }),
    }),
    { name: 'font-storage' }
  )
);
```

**폰트 선택 컴포넌트:**

```typescript
// components/common/FontSelector.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type } from 'lucide-react';
import { useFontStore } from '@/stores/fontStore';
import { FONT_OPTIONS } from '@/lib/fonts';
import { cn } from '@/lib/cn';

export function FontSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentFont, setFont } = useFontStore();
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        title="폰트 변경"
      >
        <Type className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg py-1 min-w-[160px] z-50"
          >
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.id}
                onClick={() => {
                  setFont(font.id);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between',
                  currentFont === font.id && 'bg-gray-100'
                )}
                style={{ fontFamily: font.family }}
              >
                {font.name}
                {currentFont === font.id && (
                  <span className="text-black">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**폰트 적용 Provider:**

```typescript
// components/providers/FontProvider.tsx
'use client';

import { useEffect } from 'react';
import { useFontStore } from '@/stores/fontStore';
import { FONT_OPTIONS } from '@/lib/fonts';

export function FontProvider({ children }: { children: React.ReactNode }) {
  const { currentFont } = useFontStore();

  useEffect(() => {
    const font = FONT_OPTIONS.find((f) => f.id === currentFont);
    if (font) {
      document.documentElement.style.setProperty('--font-current', font.family);
    }
  }, [currentFont]);

  return <>{children}</>;
}
```

**레이아웃에 폰트 적용:**

```typescript
// app/layout.tsx
import { notoSansKR } from '@/lib/fonts';
import { FontProvider } from '@/components/providers/FontProvider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body style={{ fontFamily: 'var(--font-current, Pretendard)' }}>
        <FontProvider>
          {children}
        </FontProvider>
      </body>
    </html>
  );
}
```

### 2.4 모션 시스템

```typescript
// framer-motion variants

// 페이드 인 + 슬라이드 업
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// 스태거 컨테이너
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// 스태거 아이템
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// 스케일 인
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
};

// 페이지 전환
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};
```

### 2.5 간격 시스템

```css
/* Tailwind 기본 spacing 사용 */
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
```

---

## 3. 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 인증 관련 (그룹)
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── (main)/                   # 메인 레이아웃 (그룹)
│   │   ├── page.tsx              # 랜딩페이지
│   │   ├── about/
│   │   ├── trademark/
│   │   │   ├── step1/
│   │   │   ├── step2/
│   │   │   ├── step3/
│   │   │   └── step4/
│   │   ├── patent/
│   │   │   ├── step1/
│   │   │   └── step2/
│   │   ├── design/
│   │   │   ├── step1/
│   │   │   └── step2/
│   │   └── mypage/
│   │       ├── applications/
│   │       └── profile/
│   ├── admin/                    # 어드민 레이아웃
│   │   ├── page.tsx              # 대시보드
│   │   ├── applications/
│   │   ├── users/
│   │   └── pricing/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── pagination.tsx
│   │   └── skeleton.tsx
│   │
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── forms/                    # 폼 컴포넌트
│   │   ├── FormField.tsx
│   │   ├── FileUpload.tsx
│   │   ├── AddressSearch.tsx
│   │   ├── TagInput.tsx
│   │   ├── DatePicker.tsx
│   │   └── PhoneInput.tsx
│   │
│   ├── trademark/                # 상표 관련 컴포넌트
│   │   ├── TrademarkTypeSelector.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── NICEClassSelector.tsx
│   │   ├── GoodsSearchInput.tsx
│   │   ├── QuotationTable.tsx
│   │   └── ApplicantForm.tsx
│   │
│   ├── patent/                   # 특허 관련 컴포넌트
│   │   ├── InventorForm.tsx
│   │   └── PatentQuotation.tsx
│   │
│   ├── design/                   # 디자인 관련 컴포넌트
│   │   ├── DesignImageUploader.tsx
│   │   └── LocarnoSelector.tsx
│   │
│   ├── common/                   # 공통 컴포넌트
│   │   ├── Stepper.tsx
│   │   ├── StepNavigation.tsx
│   │   ├── PageTransition.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── ConfirmDialog.tsx
│   │
│   └── landing/                  # 랜딩페이지 섹션
│       ├── HeroSection.tsx
│       ├── ServiceSection.tsx
│       ├── FeatureSection.tsx
│       └── CTASection.tsx
│
├── hooks/                        # Custom Hooks
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   ├── useDraft.ts
│   ├── useQuotation.ts
│   └── useToast.ts
│
├── stores/                       # Zustand Stores
│   ├── authStore.ts
│   ├── trademarkStore.ts
│   ├── patentStore.ts
│   ├── designStore.ts
│   └── adminStore.ts
│
├── lib/                          # 유틸리티
│   ├── utils.ts                  # 공통 유틸
│   ├── cn.ts                     # classnames 헬퍼
│   ├── validation.ts             # Zod 스키마
│   ├── quotation.ts              # 견적 계산 로직
│   ├── pdf.ts                    # PDF 생성
│   └── constants.ts              # 상수
│
├── data/                         # Mock 데이터
│   ├── nice-classes.json         # NICE 분류 데이터
│   ├── locarno-classes.json      # 로카르노 분류
│   ├── countries.json            # 국가 목록
│   ├── ipc-codes.json            # IPC 분류
│   └── mock-users.json           # Mock 사용자
│
└── types/                        # TypeScript 타입
    ├── user.ts
    ├── trademark.ts
    ├── patent.ts
    ├── design.ts
    ├── quotation.ts
    └── common.ts
```

---

## 4. 핵심 컴포넌트 구현

### 4.1 Stepper 컴포넌트

```typescript
// components/common/Stepper.tsx
'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                  currentStep > step.id
                    ? 'bg-black border-black text-white'
                    : currentStep === step.id
                    ? 'border-black text-black'
                    : 'border-gray-300 text-gray-300'
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-sm font-medium',
                  currentStep >= step.id ? 'text-black' : 'text-gray-400'
                )}
              >
                {step.title}
              </span>
            </motion.div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-[2px] mx-4',
                  currentStep > step.id ? 'bg-black' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4.2 PageTransition 래퍼

```typescript
// components/common/PageTransition.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### 4.3 FileUpload 컴포넌트

```typescript
// components/forms/FileUpload.tsx
'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, File } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB
  onFilesChange: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  accept = '*',
  multiple = false,
  maxSize = 10,
  onFilesChange,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(
        (file) => file.size <= maxSize * 1024 * 1024
      );

      const newFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
      setFiles(newFiles);
      onFilesChange(newFiles);
    },
    [files, maxSize, multiple, onFilesChange]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragging ? 'border-black bg-gray-50' : 'border-gray-300',
          'hover:border-black cursor-pointer'
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-10 h-10 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          파일을 드래그하거나 클릭하여 업로드
        </p>
        <p className="mt-1 text-xs text-gray-400">
          최대 {maxSize}MB
        </p>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files || []);
            const newFiles = multiple
              ? [...files, ...selectedFiles]
              : selectedFiles.slice(0, 1);
            setFiles(newFiles);
            onFilesChange(newFiles);
          }}
        />
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((file, index) => (
              <motion.li
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-gray-500" />
                  <span className="text-sm truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 4.4 NICEClassSelector 컴포넌트

```typescript
// components/trademark/NICEClassSelector.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import niceClasses from '@/data/nice-classes.json';

interface NICEClass {
  classNumber: string;
  title: string;
  goods: { id: string; name: string }[];
}

interface NICEClassSelectorProps {
  selectedGoods: { classNumber: string; goodsId: string; name: string }[];
  onSelectionChange: (goods: { classNumber: string; goodsId: string; name: string }[]) => void;
}

export function NICEClassSelector({
  selectedGoods,
  onSelectionChange,
}: NICEClassSelectorProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = useMemo(() => {
    if (!searchQuery) return niceClasses;
    return niceClasses.filter(
      (cls) =>
        cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.goods.some((g) =>
          g.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  const currentClass = niceClasses.find((c) => c.classNumber === selectedClass);

  const toggleGoods = (classNumber: string, goodsId: string, name: string) => {
    const exists = selectedGoods.some(
      (g) => g.classNumber === classNumber && g.goodsId === goodsId
    );
    if (exists) {
      onSelectionChange(
        selectedGoods.filter(
          (g) => !(g.classNumber === classNumber && g.goodsId === goodsId)
        )
      );
    } else {
      onSelectionChange([...selectedGoods, { classNumber, goodsId, name }]);
    }
  };

  const removeGoods = (classNumber: string, goodsId: string) => {
    onSelectionChange(
      selectedGoods.filter(
        (g) => !(g.classNumber === classNumber && g.goodsId === goodsId)
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* 선택된 상품 표시 */}
      <AnimatePresence>
        {selectedGoods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-sm font-medium mb-3">
              선택된 상품 ({selectedGoods.length}개)
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedGoods.map((goods) => (
                <motion.div
                  key={`${goods.classNumber}-${goods.goodsId}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 pr-1"
                  >
                    <span className="text-xs text-gray-500">
                      [{goods.classNumber}류]
                    </span>
                    {goods.name}
                    <button
                      onClick={() => removeGoods(goods.classNumber, goods.goodsId)}
                      className="ml-1 hover:bg-gray-200 rounded p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 검색 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="상품 또는 분류 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 2뎁스 선택 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 류(Class) 목록 */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-medium text-sm border-b">
            상품 분류
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {filteredClasses.map((cls, index) => (
              <motion.button
                key={cls.classNumber}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setSelectedClass(cls.classNumber)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 text-left text-sm hover:bg-gray-50 border-b last:border-0',
                  selectedClass === cls.classNumber && 'bg-gray-100'
                )}
              >
                <span>
                  <span className="font-medium">{cls.classNumber}류</span>
                  <span className="ml-2 text-gray-600">{cls.title}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* 상품 목록 */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-medium text-sm border-b">
            {currentClass ? `${currentClass.classNumber}류 상품` : '분류를 선택하세요'}
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentClass ? (
                <motion.div
                  key={currentClass.classNumber}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {currentClass.goods.map((goods, index) => {
                    const isSelected = selectedGoods.some(
                      (g) =>
                        g.classNumber === currentClass.classNumber &&
                        g.goodsId === goods.id
                    );
                    return (
                      <motion.label
                        key={goods.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 border-b last:border-0',
                          isSelected && 'bg-gray-100'
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleGoods(
                              currentClass.classNumber,
                              goods.id,
                              goods.name
                            )
                          }
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm">{goods.name}</span>
                      </motion.label>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  왼쪽에서 분류를 선택하세요
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. 상태 관리 (Zustand)

### 5.1 인증 스토어

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'attorney' | 'corporate';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Mock 로그인
        const mockUsers = JSON.parse(
          localStorage.getItem('mock-users') || '[]'
        );
        const user = mockUsers.find(
          (u: any) => u.email === email && u.password === password
        );

        if (user) {
          set({ user: { ...user, password: undefined }, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      signup: async (userData) => {
        // Mock 회원가입
        const mockUsers = JSON.parse(
          localStorage.getItem('mock-users') || '[]'
        );
        const exists = mockUsers.some((u: any) => u.email === userData.email);

        if (exists) return false;

        const newUser = {
          ...userData,
          id: `user-${Date.now()}`,
        };
        mockUsers.push(newUser);
        localStorage.setItem('mock-users', JSON.stringify(mockUsers));
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

### 5.2 상표 출원 스토어

```typescript
// stores/trademarkStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TrademarkDraft {
  // Step 1
  trademarkType?: 'text' | 'figure' | 'combined';
  trademarkNameKo?: string;
  trademarkNameEn?: string;
  trademarkNameZh?: string;
  trademarkImage?: string;
  trademarkDescription?: string;
  hasPriority?: boolean;
  priorityCountry?: string;
  priorityDate?: string;
  priorityNumber?: string;

  // Step 2
  selectedGoods?: { classNumber: string; goodsId: string; name: string }[];
  additionalGoods?: string[];

  // Step 4
  applicant?: {
    type: 'individual' | 'corporation';
    nameKo: string;
    nameEn: string;
    nameZh?: string;
    businessNumber?: string;
    representative?: string;
    phone: string;
    email: string;
    addressKo: string;
    addressEn: string;
    addressDetail: string;
  };
}

interface TrademarkState {
  currentStep: number;
  draft: TrademarkDraft;
  applications: any[];

  setStep: (step: number) => void;
  updateDraft: (data: Partial<TrademarkDraft>) => void;
  clearDraft: () => void;
  submitApplication: () => void;
}

export const useTrademarkStore = create<TrademarkState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      draft: {},
      applications: [],

      setStep: (step) => set({ currentStep: step }),

      updateDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),

      clearDraft: () => set({ draft: {}, currentStep: 1 }),

      submitApplication: () => {
        const { draft, applications } = get();
        const newApplication = {
          id: `TM-${Date.now()}`,
          ...draft,
          status: 'submitted',
          createdAt: new Date().toISOString(),
          submittedAt: new Date().toISOString(),
        };
        set({
          applications: [...applications, newApplication],
          draft: {},
          currentStep: 1,
        });
      },
    }),
    {
      name: 'trademark-storage',
    }
  )
);
```

---

## 6. 견적 계산 로직

```typescript
// lib/quotation.ts

interface TrademarkQuotationInput {
  classCount: number;
  hasPriority: boolean;
}

interface PatentQuotationInput {
  patentType: 'invention' | 'utility';
  claimCount: number;
  drawingCount: number;
  specificationPages: number;
  hasPriority: boolean;
}

interface DesignQuotationInput {
  imageCount: number;
  hasPriority: boolean;
}

interface QuotationResult {
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  total: number;
}

// 가격 상수 (관리자 설정 가능)
const PRICES = {
  trademark: {
    baseClassFee: 500000,
    additionalClassFee: 300000,
    priorityFee: 200000,
    serviceFee: 100000,
  },
  patent: {
    inventionBaseFee: 1500000,
    utilityBaseFee: 800000,
    additionalClaimFee: 50000, // 10항 초과 시
    translationFee: 30000, // 페이지당
    drawingFee: 50000,
    priorityFee: 300000,
  },
  design: {
    baseFee: 600000,
    additionalImageFee: 30000, // 6장 초과 시
    priorityFee: 200000,
  },
  exchangeRate: 1350, // KRW per USD
};

export function calculateTrademarkQuotation(
  input: TrademarkQuotationInput
): QuotationResult {
  const items: QuotationResult['items'] = [];

  // 기본 출원료 (1류)
  items.push({
    name: '기본 출원료 (1류)',
    quantity: 1,
    unitPrice: PRICES.trademark.baseClassFee,
    total: PRICES.trademark.baseClassFee,
  });

  // 추가 류 비용
  if (input.classCount > 1) {
    const additionalClasses = input.classCount - 1;
    items.push({
      name: '추가 류 비용',
      quantity: additionalClasses,
      unitPrice: PRICES.trademark.additionalClassFee,
      total: additionalClasses * PRICES.trademark.additionalClassFee,
    });
  }

  // 우선권 주장
  if (input.hasPriority) {
    items.push({
      name: '우선권 주장',
      quantity: 1,
      unitPrice: PRICES.trademark.priorityFee,
      total: PRICES.trademark.priorityFee,
    });
  }

  // 서비스 수수료
  items.push({
    name: '서비스 수수료',
    quantity: 1,
    unitPrice: PRICES.trademark.serviceFee,
    total: PRICES.trademark.serviceFee,
  });

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return { items, subtotal, tax, total };
}

export function calculatePatentQuotation(
  input: PatentQuotationInput
): QuotationResult {
  const items: QuotationResult['items'] = [];

  // 기본 출원료
  const baseFee =
    input.patentType === 'invention'
      ? PRICES.patent.inventionBaseFee
      : PRICES.patent.utilityBaseFee;

  items.push({
    name: `기본 출원료 (${input.patentType === 'invention' ? '발명특허' : '실용신안'})`,
    quantity: 1,
    unitPrice: baseFee,
    total: baseFee,
  });

  // 추가 청구항 (10항 초과)
  if (input.claimCount > 10) {
    const additionalClaims = input.claimCount - 10;
    items.push({
      name: '추가 청구항 (10항 초과)',
      quantity: additionalClaims,
      unitPrice: PRICES.patent.additionalClaimFee,
      total: additionalClaims * PRICES.patent.additionalClaimFee,
    });
  }

  // 번역료
  items.push({
    name: '번역료',
    quantity: input.specificationPages,
    unitPrice: PRICES.patent.translationFee,
    total: input.specificationPages * PRICES.patent.translationFee,
  });

  // 도면 작성료
  if (input.drawingCount > 0) {
    items.push({
      name: '도면 작성료',
      quantity: input.drawingCount,
      unitPrice: PRICES.patent.drawingFee,
      total: input.drawingCount * PRICES.patent.drawingFee,
    });
  }

  // 우선권 주장
  if (input.hasPriority) {
    items.push({
      name: '우선권 주장',
      quantity: 1,
      unitPrice: PRICES.patent.priorityFee,
      total: PRICES.patent.priorityFee,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return { items, subtotal, tax, total };
}

export function formatCurrency(amount: number, currency: 'KRW' | 'USD' = 'KRW'): string {
  if (currency === 'USD') {
    const usdAmount = Math.round(amount / PRICES.exchangeRate);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(usdAmount);
  }
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}
```

---

## 7. PDF 생성

```typescript
// lib/pdf.ts
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface QuotationPDFData {
  applicationNumber: string;
  applicationType: 'trademark' | 'patent' | 'design';
  applicantName: string;
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  total: number;
  currency: 'KRW' | 'USD';
  date: string;
}

export async function generateQuotationPDF(data: QuotationPDFData): Promise<Blob> {
  const doc = new jsPDF();

  // 헤더
  doc.setFontSize(20);
  doc.text('China IP Pass', 105, 20, { align: 'center' });

  doc.setFontSize(16);
  doc.text('견 적 서', 105, 35, { align: 'center' });

  // 기본 정보
  doc.setFontSize(10);
  doc.text(`견적번호: ${data.applicationNumber}`, 20, 50);
  doc.text(`출원유형: ${getApplicationTypeName(data.applicationType)}`, 20, 57);
  doc.text(`신청인: ${data.applicantName}`, 20, 64);
  doc.text(`발행일: ${data.date}`, 20, 71);

  // 테이블
  const tableData = data.items.map((item) => [
    item.name,
    item.quantity.toString(),
    formatAmount(item.unitPrice, data.currency),
    formatAmount(item.total, data.currency),
  ]);

  (doc as any).autoTable({
    startY: 80,
    head: [['항목', '수량', '단가', '금액']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [0, 0, 0] },
    styles: { font: 'helvetica', fontSize: 9 },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // 합계
  doc.text(`소계: ${formatAmount(data.subtotal, data.currency)}`, 150, finalY, { align: 'right' });
  doc.text(`부가세: ${formatAmount(data.tax, data.currency)}`, 150, finalY + 7, { align: 'right' });
  doc.setFontSize(12);
  doc.text(`총계: ${formatAmount(data.total, data.currency)}`, 150, finalY + 17, { align: 'right' });

  // 푸터
  doc.setFontSize(8);
  doc.text('본 견적서는 발행일로부터 30일간 유효합니다.', 105, 280, { align: 'center' });

  return doc.output('blob');
}

function getApplicationTypeName(type: string): string {
  const names: Record<string, string> = {
    trademark: '상표 출원',
    patent: '특허 출원',
    design: '디자인 출원',
  };
  return names[type] || type;
}

function formatAmount(amount: number, currency: 'KRW' | 'USD'): string {
  if (currency === 'USD') {
    return `$${(amount / 1350).toFixed(2)}`;
  }
  return `₩${amount.toLocaleString()}`;
}
```

---

## 8. 페이지별 구현 가이드

### 8.1 랜딩페이지 (`/`)

```typescript
// app/(main)/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServiceSection } from '@/components/landing/ServiceSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { CTASection } from '@/components/landing/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceSection />
      <FeatureSection />
      <CTASection />
    </div>
  );
}
```

### 8.2 상표 출원 Step1

```typescript
// app/(main)/trademark/step1/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { Stepper } from '@/components/common/Stepper';
import { TrademarkTypeSelector } from '@/components/trademark/TrademarkTypeSelector';
import { ImageUploader } from '@/components/trademark/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTrademarkStore } from '@/stores/trademarkStore';

const trademarkSteps = [
  { id: 1, title: '상표정보' },
  { id: 2, title: '상품선택' },
  { id: 3, title: '견적확인' },
  { id: 4, title: '신청제출' },
];

const step1Schema = z.object({
  trademarkType: z.enum(['text', 'figure', 'combined']),
  trademarkNameKo: z.string().min(1, '상표명(한글)을 입력하세요'),
  trademarkNameEn: z.string().optional(),
  trademarkNameZh: z.string().optional(),
  trademarkImage: z.string().optional(),
  hasPriority: z.boolean(),
  priorityCountry: z.string().optional(),
  priorityDate: z.string().optional(),
  priorityNumber: z.string().optional(),
});

type Step1Form = z.infer<typeof step1Schema>;

export default function TrademarkStep1Page() {
  const router = useRouter();
  const { draft, updateDraft, setStep } = useTrademarkStore();

  const form = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      trademarkType: draft.trademarkType || 'text',
      trademarkNameKo: draft.trademarkNameKo || '',
      trademarkNameEn: draft.trademarkNameEn || '',
      trademarkNameZh: draft.trademarkNameZh || '',
      hasPriority: draft.hasPriority || false,
    },
  });

  const onSubmit = (data: Step1Form) => {
    updateDraft(data);
    setStep(2);
    router.push('/trademark/step2');
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Stepper steps={trademarkSteps} currentStep={1} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h1 className="text-2xl font-bold mb-6">상표 정보 입력</h1>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 상표 유형 선택 */}
            <TrademarkTypeSelector
              value={form.watch('trademarkType')}
              onChange={(value) => form.setValue('trademarkType', value)}
            />

            {/* 상표명 입력 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  상표명 (한글) <span className="text-red-500">*</span>
                </label>
                <Input
                  {...form.register('trademarkNameKo')}
                  placeholder="상표명을 입력하세요"
                />
                {form.formState.errors.trademarkNameKo && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.trademarkNameKo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  상표명 (영문)
                </label>
                <Input
                  {...form.register('trademarkNameEn')}
                  placeholder="English trademark name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  상표명 (중문)
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => {
                      // Mock 번역
                      form.setValue('trademarkNameZh', '中文商标');
                    }}
                  >
                    자동번역
                  </Button>
                </label>
                <Input
                  {...form.register('trademarkNameZh')}
                  placeholder="中文商标名称"
                />
              </div>
            </div>

            {/* 이미지 업로드 (도형/결합 상표인 경우) */}
            {form.watch('trademarkType') !== 'text' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium mb-2">
                  상표 이미지 <span className="text-red-500">*</span>
                </label>
                <ImageUploader
                  onImageChange={(image) => form.setValue('trademarkImage', image)}
                />
              </motion.div>
            )}

            {/* 우선권 주장 */}
            {/* ... 우선권 관련 필드들 ... */}

            {/* 버튼 */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                취소
              </Button>
              <Button type="submit">
                다음 단계
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
}
```

---

## 9. 개발 순서 (권장)

### Phase 1: 기반 구축
1. Next.js 프로젝트 생성 및 초기 설정
2. Tailwind CSS + shadcn/ui 설치 및 테마 설정
3. 프로젝트 구조 생성
4. 공통 컴포넌트 구현 (Button, Input, Card 등)
5. 레이아웃 컴포넌트 (Header, Footer)

### Phase 2: 인증 및 랜딩
1. 랜딩페이지 구현
2. 회원가입/로그인 페이지
3. 인증 상태 관리 (Zustand)

### Phase 3: 상표 출원 (핵심)
1. Stepper 컴포넌트
2. Step 1: 상표정보 입력
3. Step 2: 상품 선택 (NICE 분류)
4. Step 3: 견적 확인 + PDF
5. Step 4: 신청인 정보 & 제출
6. 임시저장 기능

### Phase 4: 마이페이지
1. 신청 내역 목록
2. 상세 보기
3. 임시저장 이어서 작성
4. 사용자 정보 관리

### Phase 5: 특허/디자인 출원
1. 특허 출원 플로우
2. 디자인 출원 플로우

### Phase 6: 어드민
1. 대시보드
2. 신청서 관리
3. 사용자/가격 관리

---

## 10. 실행 명령어

```bash
# 프로젝트 생성
npx create-next-app@latest china-ip-pass --typescript --tailwind --eslint --app --src-dir

# 의존성 설치
cd china-ip-pass
npm install zustand @hookform/resolvers zod react-hook-form framer-motion date-fns recharts lucide-react jspdf

# shadcn/ui 초기화
npx shadcn@latest init

# shadcn/ui 컴포넌트 추가
npx shadcn@latest add button input card dialog tabs badge table select checkbox radio-group toast

# 개발 서버 실행
npm run dev
```

---

## 11. 환경 변수

```env
# .env.local
NEXT_PUBLIC_APP_NAME="China IP Pass"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Daum 주소 API (스크립트 로드로 사용)
NEXT_PUBLIC_DAUM_POSTCODE_URL="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
```
