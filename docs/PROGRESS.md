**China IP Pass 개발 진행 현황**

최종 업데이트: 2026-02-26 09:10

---

**현재 개발 범위**

- 랜딩페이지 (메인 홈)
- 상표신청 페이지 (4단계 전체)
- 그 외 페이지는 "준비중" 표시

---

**작업 목록**

**1. 프로젝트 초기 설정**
- [x] 1-1. Next.js 프로젝트 생성 (App Router, TypeScript)
- [x] 1-2. Tailwind CSS 설정
- [x] 1-3. shadcn/ui 초기화 및 테마 설정 (블랙 모노톤)
- [x] 1-4. 프로젝트 폴더 구조 생성
- [x] 1-5. 필수 의존성 설치 (Zustand, React Hook Form, Zod, Framer Motion 등)
- [x] 1-6. 전역 스타일 및 폰트 설정

**2. 공통 컴포넌트**
- [x] 2-1. Header 컴포넌트 (로고, 메뉴 9개, 로그인/유저 영역)
- [x] 2-2. Footer 컴포넌트 (회사정보, 정책 링크)
- [x] 2-3. 메인 레이아웃 구성
- [x] 2-4. 모바일 네비게이션 (햄버거 메뉴, 드로어)
- [ ] 2-5. PageTransition 컴포넌트 (등장 애니메이션)
- [ ] 2-6. "준비중" 페이지 컴포넌트
- [x] 2-7. 폰트 선택 버튼 (Pretendard, MaruBuri, Noto Sans KR)

**3. shadcn/ui 컴포넌트 설치**
- [x] 3-1. Button, Input, Card
- [ ] 3-2. Select, Checkbox, Radio Group
- [ ] 3-3. Dialog (Modal), Toast
- [ ] 3-4. Tabs, Badge, Table
- [x] 3-5. Dropdown Menu (유저 메뉴용)

**4. 랜딩페이지 (홈)**
- [x] 4-1. 히어로 섹션
- [x] 4-2. 서비스 소개 섹션
- [x] 4-3. 출원 유형 카드 섹션
- [x] 4-4. 장점/특징 섹션
- [x] 4-5. CTA 섹션

**5. 인증 시스템**
- [ ] 5-1. 인증 스토어 (Zustand + LocalStorage)
- [ ] 5-2. 회원가입 페이지 (`/auth/signup`)
- [ ] 5-3. 로그인 페이지 (`/auth/login`)
- [ ] 5-4. 비밀번호 찾기 페이지 (`/auth/forgot-password`)
- [ ] 5-5. 인증 가드 (로그인 필요 페이지 보호)

**6. 상표신청 - Step 1 (상표정보)**
- [ ] 6-1. Stepper 컴포넌트
- [ ] 6-2. 상표 유형 선택 (문자/도형/결합)
- [ ] 6-3. 상표명 입력 (한글/영문/중문 + 자동번역 Mock)
- [ ] 6-4. 이미지 업로더 (도형/결합 시)
- [ ] 6-5. 우선권 주장 폼 (조건부 표시)
- [ ] 6-6. 임시저장 기능
- [ ] 6-7. 유효성 검사

**7. 상표신청 - Step 2 (상품선택)**
- [ ] 7-1. Nice 분류 데이터 (JSON)
- [ ] 7-2. Nice 분류 2뎁스 선택 UI
- [ ] 7-3. 상품 검색 기능
- [ ] 7-4. 선택된 상품 태그 표시
- [ ] 7-5. 추가 상품 직접 입력 (태그 입력)
- [ ] 7-6. 예상 비용 실시간 계산
- [ ] 7-7. 임시저장 기능

**8. 상표신청 - Step 3 (견적확인)**
- [ ] 8-1. 상표 정보 요약 표시
- [ ] 8-2. 선택 상품 목록 표시
- [ ] 8-3. 비용 상세 내역 테이블
- [ ] 8-4. 견적 계산 로직
- [ ] 8-5. PDF 견적서 생성 (원화/달러)

**9. 상표신청 - Step 4 (신청인정보 & 제출)**
- [ ] 9-1. 신청인 유형 선택 (개인/법인)
- [ ] 9-2. 신청인 정보 폼
- [ ] 9-3. 도로명주소 검색 (Daum API)
- [ ] 9-4. 영문주소 자동변환 (Mock)
- [ ] 9-5. 대리인 정보 폼 (선택)
- [ ] 9-6. 파일 업로드 컴포넌트
- [ ] 9-7. 전자서명 동의 (체크박스)
- [ ] 9-8. 최종 검토 모달
- [ ] 9-9. 제출 처리 및 완료 페이지

**10. 상표신청 - 상태관리**
- [ ] 10-1. 상표 스토어 (Zustand)
- [ ] 10-2. 단계별 데이터 저장
- [ ] 10-3. LocalStorage 임시저장 연동

**11. 마이페이지**
- [ ] 11-1. 사이드바 레이아웃
- [ ] 11-2. 신청 내역 목록 페이지
- [ ] 11-3. 상태별 필터/탭
- [ ] 11-4. 상세보기 모달
- [ ] 11-5. 임시저장 이어서 작성
- [ ] 11-6. 내 정보 관리 페이지

**12. 준비중 페이지들**
- [x] 12-1. 회사소개 (`/about`) - ComingSoon 컴포넌트 적용
- [x] 12-2. 특허신청 (`/patent`) - ComingSoon 컴포넌트 적용
- [x] 12-3. 디자인신청 (`/design`) - ComingSoon 컴포넌트 적용
- [x] 12-4. 연차료관리 (`/annuity`) - ComingSoon 컴포넌트 적용
- [x] 12-5. 중문네이밍 (`/naming`) - ComingSoon 컴포넌트 적용
- [x] 12-6. AI IP분석 (`/ai-analysis`) - ComingSoon 컴포넌트 적용

---

**진행 기록**

| 날짜 | 작업 내용 | 상태 |
|---|---|---|
| 2026-02-26 | 기획 문서 작성 (FEATURE_SPEC, FE_IMPLEMENTATION, USER_JOURNEY, FOOTER_CONTENT) | 완료 |
| 2026-02-26 | PROGRESS.md 작업 목록 정리 | 완료 |
| 2026-02-26 | Next.js 프로젝트 생성 및 초기 설정 | 완료 |
| 2026-02-26 | Header/Footer/Layout 구현 | 완료 |
| 2026-02-26 | 랜딩페이지 구현 | 완료 |

---

**작업 상세 기록**

**2026-02-26**

- 기획 문서 5개 작성 완료
  - `FEATURE_SPEC.md`: 전체 기능 명세서
  - `FE_IMPLEMENTATION.md`: 프론트엔드 구현 가이드
  - `USER_JOURNEY.md`: 사용자 여정 8개 시나리오
  - `FOOTER_CONTENT.md`: 푸터 콘텐츠
  - `PROGRESS.md`: 작업 목록 및 진행 현황
- 헤더 메뉴 7개 확정: 회사소개, 상표신청, 특허신청, 디자인신청, 연차료관리, 중문네이밍, IP 분석 (홈은 로고 클릭으로 이동)
- 폰트 선택 기능 추가 (데모용)
  - Pretendard (CDN), MaruBuri (네이버 CDN), Noto Sans KR (Google Fonts)
  - 헤더 우측 폰트 선택 버튼
  - LocalStorage 저장으로 새로고침 후에도 유지
- 현재 Phase: 상표신청 중심 개발 (나머지는 준비중 페이지)

**2026-02-26 (오후)**

- Next.js 16.1.6 프로젝트 생성 완료
- shadcn/ui 초기화 및 Button, Dropdown Menu 컴포넌트 설치
- 의존성 설치: zustand, framer-motion, lucide-react
- 전역 스타일 설정 (globals.css에 Pretendard, MaruBuri 폰트 정의)
- 폰트 선택 기능 구현
  - `src/lib/fonts.ts`: 폰트 옵션 정의
  - `src/stores/fontStore.ts`: Zustand 스토어
  - `src/components/common/FontSelector.tsx`: 폰트 선택 드롭다운
  - `src/components/providers/FontProvider.tsx`: 폰트 적용 Provider
- Header 컴포넌트 구현 (`src/components/layout/Header.tsx`)
  - 로고, 네비게이션 메뉴 9개, 로그인/회원가입 버튼
  - 모바일 반응형 햄버거 메뉴
  - 폰트 선택 버튼
- Footer 컴포넌트 구현 (`src/components/layout/Footer.tsx`)
  - 회사 정보, 정책 링크, 저작권
- 메인 레이아웃 구성 (`src/app/layout.tsx`)
- 랜딩페이지 구현 (`src/app/page.tsx`)
  - 히어로 섹션
  - 서비스 소개 섹션 (3단계)
  - 출원 유형 카드 섹션 (상표/특허/디자인)
  - 장점/특징 섹션 (4개)
  - CTA 섹션
  - Framer Motion 애니메이션 적용

---

**다음 작업**

1. 준비중 페이지 컴포넌트 생성
2. 회원가입/로그인 페이지
3. 상표신청 Step 1 페이지
