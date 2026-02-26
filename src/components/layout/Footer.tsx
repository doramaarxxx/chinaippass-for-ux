'use client';

import Link from 'next/link';

const POLICY_LINKS = [
  { name: '개인정보 취급방침', href: '/privacy' },
  { name: '이용약관', href: '/terms' },
  { name: '보안정책', href: '/security' },
  { name: '환불정책', href: '/refund' },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 좌측: 로고 및 슬로건 */}
          <div>
            <Link href="/" className="text-xl font-bold">
              China IP Pass
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              중국 지식재산권 보호 분야에서 귀하의 믿음직한 파트너입니다.
            </p>
          </div>

          {/* 우측: 정책 링크 */}
          <div className="md:text-right">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">정책</h3>
            <ul className="space-y-2">
              {POLICY_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* 회사 정보 */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <span className="text-gray-400">(주)로앤키</span>
              <span className="mx-2">|</span>
              대표: 이성화
              <span className="mx-2">|</span>
              사업자등록번호: 815-88-03504
            </p>
            <p>
              통신판매업 신고번호: 제 2026-서울강남-00197 호
            </p>
            <p>
              전화: 02-2645-5888
              <span className="mx-2">|</span>
              계좌: 신한 140-015-724331 (주) 로앤키
            </p>
            <p>
              주소: 서울특별시 강남구 테헤란로70길 12, 402호 제이805호(대치동, H 타워)
            </p>
          </div>

          {/* 저작권 */}
          <p className="mt-6 text-xs text-gray-600">
            © 2026 China IP Pass. 모든 권리 보유.
          </p>
        </div>
      </div>
    </footer>
  );
}
