# 러브코트 랜딩페이지 — React + Tailwind 전환 설계

날짜: 2026-08-01
상태: 승인됨

## 목표

기존 정적 사이트(index.html + style.css + script.js)를 유지보수하기 쉬운
Vite + React 18 + TypeScript + Tailwind CSS v4 구조로 전환한다.
**시각적 결과물과 동작은 현재와 동일해야 한다.**

## 스택

- Vite (react-ts 템플릿)
- React 18 + TypeScript
- Tailwind CSS v4 — CSS-first `@theme` 토큰 설정 (`tailwind.config` 파일 없음)
- Pretendard 폰트: 기존 CDN 링크 유지 (index.html)
- 빌드 결과물은 정적 파일 — 배포 방식 변화 없음

## 디렉터리 구조

```
love-court-travel/
├── index.html              # Vite 엔트리. 기존 title/meta/OG/GA4 슬롯 주석 유지
├── public/
│   ├── images/…            # 기존 images/ 내용 이동
│   └── logo_lovecourt_*.png
├── src/
│   ├── main.tsx
│   ├── App.tsx             # 섹션 순서 조립만 담당
│   ├── index.css           # @import "tailwindcss" + @theme 토큰 + 커스텀 CSS
│   ├── config.ts           # TALLY_FORM_URL, GA4 ID 교체 지점 한 곳
│   ├── data/
│   │   ├── values.ts       # MOVE/CONNECT/REMEMBER 패널 데이터
│   │   └── destinations.ts # JAPAN/BALI/VIETNAM 카드 데이터
│   ├── hooks/
│   │   ├── useReveal.ts    # IntersectionObserver 페이드인
│   │   ├── useScrolled.ts  # 스크롤 40px 초과 여부 (탑바)
│   │   ├── useParallax.ts  # 가치 패널 배경 translateY ±5%
│   │   └── useReducedMotion.ts
│   └── components/
│       ├── Topbar.tsx
│       ├── Hero.tsx
│       ├── ValuePanels.tsx
│       ├── Destinations.tsx
│       ├── Story.tsx
│       ├── Waitlist.tsx
│       ├── Footer.tsx
│       ├── CtaBar.tsx      # 모바일 하단 고정 바
│       └── ui/
│           ├── CtaButton.tsx  # variant: top | hero | dest | bar
│           └── BgMedia.tsx    # picture/img + onError 플레이스홀더 폴백
└── _legacy/                # 기존 style.css, script.js, 구 index.html 백업
```

## 핵심 결정

1. **반복 요소 데이터화** — 가치 3패널, 후보지 3카드는 `data/*.ts` 배열을
   map으로 렌더. 카피·이미지 교체는 데이터 파일만 수정.
2. **Tailwind 이관 범위** — 레이아웃·간격·색·타이포는 유틸리티로.
   다음은 `index.css` 커스텀 CSS로 유지:
   - kenburns / hintdrop 키프레임
   - `.img-missing` 폴백 (attr(data-file) 라벨 + 스트라이프 배경)
   - dest-pill 그라데이션 보더 (mask-composite)
   - benefits 체크마크 (::before)
3. **@theme 토큰** — `--color-court-bg: #FAF8F4`, `--color-court-green: #1F4D36`,
   `--color-clay: #FD4A01`, `--color-ink: #111111`, `--color-placeholder: #B8B0A4`,
   `--color-near-black: #14120F`. radius 16px, CTA 바 높이 64px.
4. **동작 보존 목록** (전부 재현):
   - 스크롤 리빌 페이드인 + dest 카드 스태거(0.12s/0.24s)
   - 탑바: 히어로 위 스크림+흰 로고 → 스크롤 후 오프화이트+오렌지 로고
   - 가치 패널 배경 패럴랙스 (rAF 스로틀)
   - 히어로 ken-burns, scroll-hint
   - 앵커 스무스 스크롤
   - prefers-reduced-motion: 모든 애니메이션·패럴랙스 비활성
   - Tally iframe: config URL이 http로 시작하면 임베드, 아니면 안내문
   - 이미지 onError 시 웜그레이 플레이스홀더 + 파일명 라벨
   - 모바일(<768px): 하단 고정 CTA 바, body padding-bottom
5. **레거시 정리** — 전환 검증 후 기존 3파일을 `_legacy/`로 이동.

## 검증

- `npm run build` 성공 + `npm run dev`로 실제 렌더 확인
- 뷰포트 390px / 768px / 1200px에서 기존과 시각적 동일성 비교
- reduced-motion, 이미지 누락 폴백 동작 확인
