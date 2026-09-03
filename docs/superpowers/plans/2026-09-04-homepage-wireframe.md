# 홈페이지 전환 Phase 1 — 와이어프레임 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/test` 경로 아래에 새 홈페이지(홈·트립 상세·예약 플로우)의 그레이스케일 와이어프레임을 실제 라우팅·데이터 구조 위에 구축한다. 대표 확인 후 Phase 2(비주얼 디자인)에서 스타일만 교체한다.

**Architecture:** 기존 랜딩(`/`)은 손대지 않는다. `react-router-dom`을 추가해 `/test/*`에 새 페이지 3개를 붙이고, 모든 트립 정보는 `src/data/trips.ts` 단일 파일에서 읽는다. 와이어프레임 전용 UI 킷(`src/components/wf/`)으로 회색 박스·배지·주석을 표준화해, Phase 2에서 이 킷과 페이지 스타일만 교체하면 되게 한다.

**Tech Stack:** React 18 + Vite 6 + Tailwind 4 (기존 유지). 신규 의존성은 `react-router-dom` 하나만.

**스펙:** `docs/superpowers/specs/2026-09-04-homepage-redesign-design.md`

## Global Constraints

- 기존 랜딩(`/`) 관련 파일(App.tsx 및 기존 컴포넌트)은 수정 금지 — main.tsx의 라우터 감싸기만 예외.
- 신규 의존성은 `react-router-dom`만. 다른 라이브러리 추가 금지.
- 가격·일정 등 미확정 수치는 임의 기입 금지 — `○○만 원`, `2026년 ○월 예정` 형태 플레이스홀더 사용 (기존 프로젝트 규칙).
- 모바일 390px 우선. 데스크톱은 확장.
- 이 프로젝트는 테스트 인프라(vitest 등)가 없고 수명이 짧은 마케팅 사이트다. 와이어프레임 단계에서 테스트 러너를 추가하지 않는다. 각 태스크의 검증은 ① `npm run build` (tsc 타입체크 포함) ② dev 서버 + 브라우저 확인(390px/데스크톱)으로 한다.
- 커밋은 태스크 단위. 메시지는 한국어(기존 히스토리 관례).
- 와이어프레임 톤: 회색 계열만 사용(`bg-neutral-*`, `border-neutral-*`), 사진 자리는 대시 보더 박스 + 라벨. 브랜드 컬러는 Phase 2에서.

---

### Task 1: 라우터 도입 + `/test` 골격

**Files:**
- Modify: `package.json` (react-router-dom 추가 — npm install로)
- Modify: `src/main.tsx`
- Create: `src/pages/TestLayout.tsx`
- Create: `src/pages/HomePage.tsx` (임시 스텁, Task 3에서 본 구현)

**Interfaces:**
- Produces: 라우트 구조 `/` → 기존 App, `/test` → TestLayout(Outlet), `/test`(index) → HomePage. 이후 태스크는 TestLayout의 `<Route>` 자식으로 페이지를 추가한다.
- Produces: `TestLayout` — 와이어프레임 공용 상단바(로고 텍스트 + "트립 예약하기" 버튼 자리) + 하단 모바일 고정 CTA 바 + 푸터 자리. 상단/하단 CTA는 `Link to={ctaTo}` — Task 6에서 확정 트립 상세로 연결.

- [ ] **Step 1: react-router-dom 설치**

```bash
npm install react-router-dom
```

- [ ] **Step 2: main.tsx를 라우터로 감싸기**

```tsx
// src/main.tsx 전체 교체
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { TestLayout } from "./pages/TestLayout";
import { HomePage } from "./pages/HomePage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<TestLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
```

- [ ] **Step 3: TestLayout 작성**

```tsx
// src/pages/TestLayout.tsx
import { Link, Outlet } from "react-router-dom";

/** Phase 1 와이어프레임 공용 레이아웃 — 회색 골격. Phase 2에서 실제 Topbar/Footer로 교체 */
export function TestLayout() {
  const ctaTo = "/test"; // Task 6에서 확정 트립 상세 경로로 교체
  return (
    <div className="min-h-screen bg-white pb-16 font-sans text-neutral-900 md:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-neutral-300 bg-white px-5 py-3">
        <Link to="/test" className="text-sm font-bold tracking-wide">
          LOVE COURT [로고]
        </Link>
        <Link
          to={ctaTo}
          className="hidden border border-neutral-400 px-4 py-2 text-xs md:block"
        >
          트립 예약하기
        </Link>
      </header>
      <main className="pt-12">
        <Outlet />
      </main>
      <footer className="border-t border-neutral-300 px-5 py-8 text-xs text-neutral-500">
        [푸터: 로고 · 인스타그램 · 카피라이트]
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-300 bg-white p-3 md:hidden">
        <Link
          to={ctaTo}
          className="block w-full border border-neutral-500 bg-neutral-100 py-3 text-center text-sm font-bold"
        >
          트립 예약하기 →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: HomePage 스텁 작성**

```tsx
// src/pages/HomePage.tsx
export function HomePage() {
  return <div className="p-5">와이어프레임 홈 (Task 3에서 구현)</div>;
}
```

- [ ] **Step 5: 빌드 검증**

Run: `npm run build`
Expected: 에러 없이 성공.

- [ ] **Step 6: 브라우저 검증**

Run: `npm run dev` (백그라운드) 후 브라우저에서 확인:
- `http://localhost:5173/` → 기존 랜딩이 그대로 나오는지
- `http://localhost:5173/test` → 스텁 + 상단바/하단 CTA 바가 나오는지

- [ ] **Step 7: 커밋**

```bash
git add package.json package-lock.json src/main.tsx src/pages/
git commit -m "라우터 도입: /test 경로에 새 홈페이지 골격 추가 (기존 랜딩 유지)"
```

---

### Task 2: 트립 데이터 모델 + 와이어프레임 UI 킷

**Files:**
- Create: `src/data/trips.ts`
- Create: `src/components/wf/Wf.tsx`

**Interfaces:**
- Produces: `Trip`, `TripDay`, `TripStatus` 타입과 `TRIPS`, `getTrip(id)`, `getOpenTrip()` — 아래 시그니처 그대로. 이후 모든 페이지가 이것만 읽는다.
- Produces: `WfImg({ label, className? })`, `WfBadge({ tone, children })`, `WfNote({ children })` — 와이어프레임 표준 부품.

- [ ] **Step 1: trips.ts 작성**

```ts
// src/data/trips.ts
export type TripStatus = "open" | "coming";

export interface TripDay {
  day: number;
  title: string;
  detail: string;
}

export interface Trip {
  id: string;
  status: TripStatus;
  /** 트립명 (예: "발리 테니스 트립 1기") */
  name: string;
  /** 목적지 표기 (예: "발리, 인도네시아") */
  destination: string;
  /** 미확정 시 플레이스홀더 (예: "○박 ○일") — 임의 수치 금지 */
  duration: string;
  /** 미확정 시 "2026년 ○월 예정" */
  dates: string;
  capacity: number;
  spotsLeft: number;
  /** 계약금 표기 — 미확정 시 "○○만 원" */
  deposit: string;
  /** 총액 표기 — 미확정 시 "○○○만 원 (항공권 제외)" */
  totalPrice: string;
  /** images/ 기준 파일명 — 없으면 와이어프레임 박스로 표시 */
  heroImage: string;
  summary: string;
  days: TripDay[];
  included: string[];
  excluded: string[];
  refundPolicy: string[];
}

export const TRIPS: Trip[] = [
  {
    id: "bali",
    status: "open",
    name: "발리 테니스 트립 1기",
    destination: "발리, 인도네시아",
    duration: "○박 ○일",
    dates: "2026년 ○월 예정",
    capacity: 8,
    spotsLeft: 8,
    deposit: "○○만 원",
    totalPrice: "○○○만 원 (항공권 제외)",
    heroImage: "journal-bali.webp",
    summary:
      "좋은 코트, 매일 2시간의 테니스, 스냅 작가가 남기는 당신의 장면. 혼자 오라고 만든 소규모 테니스 여행.",
    days: [
      { day: 1, title: "도착 & 웰컴 랠리", detail: "[일정 상세 — 대표 제공]" },
      { day: 2, title: "오전 테니스 · 오후 자유시간", detail: "[일정 상세 — 대표 제공]" },
      { day: 3, title: "스냅 촬영 데이", detail: "[일정 상세 — 대표 제공]" },
      { day: 4, title: "마무리 게임 & 출국", detail: "[일정 상세 — 대표 제공]" },
    ],
    included: [
      "숙소 (전 일정)",
      "코트 대여 · 매일 최소 2시간 테니스",
      "전문 스냅 작가 동행 및 보정본",
      "현지 이동 차량",
      "[포함사항 — 대표 확정]",
    ],
    excluded: ["항공권", "여행자 보험", "[불포함사항 — 대표 확정]"],
    refundPolicy: [
      "[환불 규정 — 대표 확정 전 게시 불가, 결제 오픈 전 필수]",
    ],
  },
  {
    id: "japan",
    status: "coming",
    name: "일본 테니스 트립",
    destination: "일본",
    duration: "준비중",
    dates: "준비중",
    capacity: 8,
    spotsLeft: 8,
    deposit: "",
    totalPrice: "",
    heroImage: "journal-japan.webp",
    summary: "다음 시즌 준비중",
    days: [],
    included: [],
    excluded: [],
    refundPolicy: [],
  },
  {
    id: "vietnam",
    status: "coming",
    name: "베트남 테니스 트립",
    destination: "베트남",
    duration: "준비중",
    dates: "준비중",
    capacity: 8,
    spotsLeft: 8,
    deposit: "",
    totalPrice: "",
    heroImage: "journal-vietnam.webp",
    summary: "다음 시즌 준비중",
    days: [],
    included: [],
    excluded: [],
    refundPolicy: [],
  },
];

export function getTrip(id: string): Trip | undefined {
  return TRIPS.find((t) => t.id === id);
}

export function getOpenTrip(): Trip | undefined {
  return TRIPS.find((t) => t.status === "open");
}
```

- [ ] **Step 2: 와이어프레임 킷 작성**

```tsx
// src/components/wf/Wf.tsx
import type { ReactNode } from "react";

/** 사진 자리 — 대시 보더 회색 박스 + 라벨 */
export function WfImg({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed border-neutral-300 bg-neutral-100 text-xs text-neutral-400 ${className}`}
    >
      [사진: {label}]
    </div>
  );
}

/** 상태 배지 — open=모집중(진한 테두리), coming=준비중(연한 회색) */
export function WfBadge({ tone, children }: { tone: "open" | "coming"; children: ReactNode }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[11px] font-bold ${
        tone === "open"
          ? "border border-neutral-800 text-neutral-900"
          : "border border-neutral-300 bg-neutral-100 text-neutral-400"
      }`}
    >
      {children}
    </span>
  );
}

/** 와이어프레임 주석 — 실제 페이지에는 없을 설명 텍스트 */
export function WfNote({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-[11px] italic text-neutral-400">✎ {children}</p>;
}
```

- [ ] **Step 3: 빌드 검증**

Run: `npm run build`
Expected: 성공 (미사용 export 경고 없음 — Vite는 미사용을 에러로 보지 않음).

- [ ] **Step 4: 커밋**

```bash
git add src/data/trips.ts src/components/wf/
git commit -m "트립 데이터 모델(trips.ts) + 와이어프레임 UI 킷 추가"
```

---

### Task 3: 홈 와이어프레임 (7섹션)

**Files:**
- Modify: `src/pages/HomePage.tsx` (스텁 교체)

**Interfaces:**
- Consumes: `TRIPS`, `getOpenTrip()` (`src/data/trips.ts`), `WfImg`, `WfBadge`, `WfNote` (`src/components/wf/Wf.tsx`)
- Produces: 홈에서 확정 트립 카드 → `/test/trips/{id}` 링크 (Task 4의 상세 페이지가 받는 경로)

- [ ] **Step 1: HomePage 본 구현**

스펙 §3의 7섹션을 그레이스케일로 구현. 전체 코드:

```tsx
// src/pages/HomePage.tsx 전체 교체
import { Link } from "react-router-dom";
import { TRIPS, getOpenTrip } from "../data/trips";
import { WfImg, WfBadge, WfNote } from "../components/wf/Wf";

const VALUES = [
  { title: "전문 스냅 작가 동행", desc: "코트 위의 당신을 전문 작가가 남깁니다. 보정본 제공." },
  { title: "귀찮은 건 전부 러브코트가", desc: "코트 예약, 이동, 식사 — 라켓만 챙기세요." },
  { title: "매일 최소 2시간 테니스", desc: "여행 내내 코트가 보장됩니다." },
  { title: "자유시간 보장", desc: "테니스 외 시간은 온전히 당신의 것." },
];

const FAQS = [
  { q: "혼자 가도 어색하지 않나요?", a: "[답변 — 대표 확정. 방향: 참가자 대부분이 혼자 옵니다]" },
  { q: "테니스를 잘 못 쳐도 되나요?", a: "[답변 — 대표 확정. 방향: 구력별 조 구성]" },
  { q: "환불 규정이 어떻게 되나요?", a: "[답변 — 환불 규정 확정 후 기입]" },
  { q: "항공권도 포함인가요?", a: "[답변 — 대표 확정. 방향: 항공권 불포함 명시]" },
];

export function HomePage() {
  const open = getOpenTrip();
  const coming = TRIPS.filter((t) => t.status === "coming");

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* 1. 히어로 */}
      <section className="relative my-4">
        <WfImg label="히어로 — 기존 hero.webp 재사용" className="h-[70vh] w-full" />
        <div className="absolute inset-x-4 bottom-4 border border-neutral-400 bg-white/90 p-4">
          <p className="text-lg font-bold">
            혼자 와도 되는 게 아니라,
            <br />
            혼자 오라고 만든 테니스 여행
          </p>
          <WfNote>히어로 카피 초안 — 최종은 대표 확정</WfNote>
          {open && (
            <Link
              to={`/test/trips/${open.id}`}
              className="mt-3 block border border-neutral-800 p-3"
            >
              <WfBadge tone="open">NOW OPEN</WfBadge>
              <span className="ml-2 text-sm font-bold">
                {open.name} · {open.duration} · {open.capacity}자리
              </span>
              <span className="float-right text-sm">→</span>
            </Link>
          )}
        </div>
      </section>

      {/* 2. 가치 카드 4개 */}
      <section className="my-10">
        <h2 className="mb-4 text-xl font-bold">러브코트 트립에서는</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-neutral-300 p-4">
              <div className="mb-2 h-8 w-8 border border-dashed border-neutral-300 text-center text-xs leading-8 text-neutral-400">
                icon
              </div>
              <h3 className="font-bold">{v.title}</h3>
              <p className="text-sm text-neutral-600">{v.desc}</p>
            </div>
          ))}
        </div>
        <WfNote>카피 초안 — 최종은 대표 확정. 스냅 작가 동행이 항상 첫 번째.</WfNote>
      </section>

      {/* 3. 트립 프로그램 */}
      <section className="my-10">
        <h2 className="mb-4 text-xl font-bold">트립 프로그램</h2>
        {open && (
          <Link
            to={`/test/trips/${open.id}`}
            className="mb-4 block border-2 border-neutral-800"
          >
            <WfImg label={open.heroImage} className="h-48 w-full" />
            <div className="p-4">
              <WfBadge tone="open">모집중</WfBadge>
              <h3 className="mt-1 text-lg font-bold">{open.name}</h3>
              <p className="text-sm text-neutral-600">
                {open.destination} · {open.duration} · {open.dates}
              </p>
              <p className="mt-1 text-sm font-bold">계약금 {open.deposit}</p>
              <p className="mt-2 text-sm underline">자세히 보기 →</p>
            </div>
          </Link>
        )}
        <div className="grid grid-cols-2 gap-3">
          {coming.map((t) => (
            <div key={t.id} className="border border-neutral-200 opacity-60">
              <WfImg label={`${t.heroImage} (디새추레이트)`} className="h-28 w-full" />
              <div className="p-3">
                <WfBadge tone="coming">준비중</WfBadge>
                <h3 className="mt-1 text-sm font-bold">{t.name}</h3>
                <button className="mt-2 border border-neutral-300 px-2 py-1 text-xs">
                  오픈 알림 받기
                </button>
              </div>
            </div>
          ))}
        </div>
        <WfNote>준비중 카드는 상세 페이지 없음. "오픈 알림 받기"는 Phase 2에서 간단 폼 연결.</WfNote>
      </section>

      {/* 4. 스냅 섹션 */}
      <section className="my-10">
        <h2 className="mb-1 text-xl font-bold">여행이 끝나도 남는 장면</h2>
        <p className="mb-4 text-sm text-neutral-600">[카피 초안 — "친구들이 물어볼 사진" 방향]</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <WfImg key={n} label={`스냅 ${n} — 촬영 후 교체`} className="aspect-3/4" />
          ))}
        </div>
      </section>

      {/* 5. 대표 스토리 */}
      <section className="my-10 border border-neutral-300 p-4 md:flex md:gap-6">
        <WfImg label="founder.webp — 코트에서" className="h-48 md:w-1/3" />
        <div className="mt-3 md:mt-0 md:w-2/3">
          <h2 className="text-xl font-bold">왜 이 여행을 만들었나요?</h2>
          <p className="mt-2 text-sm text-neutral-600">
            [기존 내향인 스토리 축약본 — 02 기획안 §4 원문에서 발췌, 대표 확정]
          </p>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="my-10">
        <h2 className="mb-4 text-xl font-bold">자주 묻는 질문</h2>
        {FAQS.map((f) => (
          <details key={f.q} className="border-b border-neutral-200 py-3">
            <summary className="cursor-pointer text-sm font-bold">{f.q}</summary>
            <p className="mt-2 text-sm text-neutral-600">{f.a}</p>
          </details>
        ))}
      </section>

      {/* 7. 마무리 CTA */}
      <section className="my-10 border border-neutral-400 p-8 text-center">
        <h2 className="text-xl font-bold">첫 번째 트립, 코트에서 만나요</h2>
        {open && (
          <Link
            to={`/test/trips/${open.id}`}
            className="mt-4 inline-block border border-neutral-800 px-6 py-3 text-sm font-bold"
          >
            {open.name} 자세히 보기 →
          </Link>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: 빌드 검증**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 브라우저 검증**

`http://localhost:5173/test`에서 390px 뷰포트 기준:
- 7섹션이 순서대로 렌더
- 확정 트립 카드 클릭 시 `/test/trips/bali`로 이동(404여도 라우팅 이동 자체 확인 — Task 4 전)
- 준비중 카드 2개는 링크 없음

- [ ] **Step 4: 커밋**

```bash
git add src/pages/HomePage.tsx
git commit -m "와이어프레임: 홈 7섹션 (히어로·가치·프로그램·스냅·스토리·FAQ·CTA)"
```

---

### Task 4: 트립 상세 와이어프레임

**Files:**
- Create: `src/pages/TripDetailPage.tsx`
- Modify: `src/main.tsx` (라우트 1줄 추가)

**Interfaces:**
- Consumes: `getTrip(id)`, `Trip` (`src/data/trips.ts`), `WfImg`, `WfBadge`, `WfNote`
- Produces: 예약 CTA → `/test/trips/{id}/book` 링크 (Task 5가 받는 경로)

- [ ] **Step 1: TripDetailPage 작성**

스펙 §4의 8개 블록. `status !== "open"`이거나 없는 id면 홈으로 안내.

```tsx
// src/pages/TripDetailPage.tsx
import { Link, useParams } from "react-router-dom";
import { getTrip } from "../data/trips";
import { WfImg, WfBadge, WfNote } from "../components/wf/Wf";

export function TripDetailPage() {
  const { id } = useParams();
  const trip = id ? getTrip(id) : undefined;

  if (!trip || trip.status !== "open") {
    return (
      <div className="p-8 text-center">
        <p>준비중인 트립입니다.</p>
        <Link to="/test" className="underline">홈으로 →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24">
      {/* 1. 상단 */}
      <section className="relative my-4">
        <WfImg label={trip.heroImage} className="h-[50vh] w-full" />
        <div className="mt-3">
          <WfBadge tone="open">모집중 · {trip.capacity}자리 중 {trip.spotsLeft}자리</WfBadge>
          <h1 className="mt-2 text-2xl font-bold">{trip.name}</h1>
          <p className="text-sm text-neutral-600">
            {trip.destination} · {trip.duration} · {trip.dates}
          </p>
          <p className="mt-2 font-bold">계약금 {trip.deposit}</p>
          <p className="text-sm text-neutral-600">총 {trip.totalPrice}</p>
        </div>
      </section>

      {/* 2. 이 트립에서 하는 것 */}
      <section className="my-8">
        <h2 className="mb-3 text-lg font-bold">이 트립에서 하는 것</h2>
        <p className="mb-3 text-sm text-neutral-600">{trip.summary}</p>
        {trip.days.map((d) => (
          <details key={d.day} className="border-b border-neutral-200 py-2">
            <summary className="cursor-pointer text-sm font-bold">
              Day {d.day} — {d.title}
            </summary>
            <p className="mt-1 text-sm text-neutral-600">{d.detail}</p>
          </details>
        ))}
        <WfNote>일정 상세는 대표 제공 후 기입</WfNote>
      </section>

      {/* 3. 포함/불포함 */}
      <section className="my-8 grid grid-cols-2 gap-4">
        <div className="border border-neutral-300 p-3">
          <h3 className="mb-2 text-sm font-bold">포함</h3>
          <ul className="list-disc pl-4 text-sm text-neutral-600">
            {trip.included.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
        <div className="border border-neutral-300 p-3">
          <h3 className="mb-2 text-sm font-bold">불포함</h3>
          <ul className="list-disc pl-4 text-sm text-neutral-600">
            {trip.excluded.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </section>

      {/* 4. 코트 & 숙소 */}
      <section className="my-8">
        <h2 className="mb-3 text-lg font-bold">코트 & 숙소</h2>
        <div className="grid grid-cols-3 gap-2">
          <WfImg label="코트 1" className="aspect-square" />
          <WfImg label="코트 2" className="aspect-square" />
          <WfImg label="숙소" className="aspect-square" />
        </div>
        <p className="mt-2 text-sm text-neutral-600">[코트·숙소 설명 — 대표 제공]</p>
      </section>

      {/* 5. 스냅 안내 */}
      <section className="my-8 border border-neutral-300 p-4">
        <h2 className="mb-2 text-lg font-bold">스냅 촬영 안내</h2>
        <p className="text-sm text-neutral-600">
          [작가 동행 일수, 제공 컷 수, 보정본 매수 등 구체 조건 — 대표 확정]
        </p>
      </section>

      {/* 6. 모집 조건 */}
      <section className="my-8">
        <h2 className="mb-2 text-lg font-bold">모집 조건</h2>
        <ul className="list-disc pl-4 text-sm text-neutral-600">
          <li>정원 {trip.capacity}명 소규모</li>
          <li>[구력 조건 — 대표 확정]</li>
          <li>[혼자 참가 관련 안내 — 대표 확정]</li>
        </ul>
      </section>

      {/* 7. 환불 규정 */}
      <section className="my-8 border-2 border-neutral-400 p-4">
        <h2 className="mb-2 text-lg font-bold">환불 규정</h2>
        <ul className="list-disc pl-4 text-sm text-neutral-600">
          {trip.refundPolicy.map((r) => <li key={r}>{r}</li>)}
        </ul>
        <WfNote>결제 오픈 전 필수 확정 항목 — 이 블록은 결제 전 반드시 노출 위치 유지</WfNote>
      </section>

      {/* 8. 예약 CTA (하단 고정) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-400 bg-white p-3">
        <Link
          to={`/test/trips/${trip.id}/book`}
          className="mx-auto block max-w-3xl border border-neutral-800 bg-neutral-100 py-3 text-center text-sm font-bold"
        >
          계약금 {trip.deposit}으로 자리 잡기 →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 라우트 추가**

`src/main.tsx`의 `<Route path="/test">` 자식에 추가:

```tsx
<Route path="trips/:id" element={<TripDetailPage />} />
```

import 추가: `import { TripDetailPage } from "./pages/TripDetailPage";`

- [ ] **Step 3: 빌드 검증**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 4: 브라우저 검증**

- `/test/trips/bali` → 8블록 렌더, 하단 고정 예약 CTA 표시
- `/test/trips/japan` → "준비중인 트립입니다" + 홈 링크
- `/test/trips/없는id` → 동일 폴백

- [ ] **Step 5: 커밋**

```bash
git add src/pages/TripDetailPage.tsx src/main.tsx
git commit -m "와이어프레임: 트립 상세 페이지 (일정·포함사항·환불규정·예약 CTA)"
```

---

### Task 5: 예약 플로우 와이어프레임 (3스텝)

**Files:**
- Create: `src/pages/BookingPage.tsx`
- Modify: `src/main.tsx` (라우트 1줄 추가)

**Interfaces:**
- Consumes: `getTrip(id)` (`src/data/trips.ts`), `WfNote`
- Produces: 없음 (플로우 종착점)

- [ ] **Step 1: BookingPage 작성**

로컬 state 스텝 머신. 신청 데이터는 와이어프레임 단계에선 저장하지 않음(Phase 2에서 Tally 연결). 결제 버튼은 비활성 + 카카오 안내 버튼이 진행.

```tsx
// src/pages/BookingPage.tsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTrip } from "../data/trips";
import { WfNote } from "../components/wf/Wf";

type Step = 1 | 2 | 3;

export function BookingPage() {
  const { id } = useParams();
  const trip = id ? getTrip(id) : undefined;
  const [step, setStep] = useState<Step>(1);
  const [agreed, setAgreed] = useState(false);

  if (!trip || trip.status !== "open") {
    return (
      <div className="p-8 text-center">
        <p>예약 가능한 트립이 아닙니다.</p>
        <Link to="/test" className="underline">홈으로 →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-6">
      {/* 스텝 인디케이터 */}
      <ol className="mb-6 flex gap-2 text-xs">
        {(["신청 정보", "결제", "완료"] as const).map((label, i) => (
          <li
            key={label}
            className={`flex-1 border-b-4 pb-1 text-center ${
              step >= i + 1 ? "border-neutral-800 font-bold" : "border-neutral-200 text-neutral-400"
            }`}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="space-y-4"
        >
          <h1 className="text-xl font-bold">{trip.name} 신청</h1>
          {[
            ["이름", "text", true],
            ["연락처 (카카오톡 ID 또는 전화번호)", "text", true],
            ["인스타그램 핸들 (선택)", "text", false],
          ].map(([label, type, required]) => (
            <label key={label as string} className="block text-sm">
              <span className="font-bold">{label as string}</span>
              <input
                type={type as string}
                required={required as boolean}
                className="mt-1 w-full border border-neutral-300 p-2"
              />
            </label>
          ))}
          <fieldset className="text-sm">
            <legend className="font-bold">테니스는 어느 정도 치세요?</legend>
            {["이제 시작 (6개월 미만)", "랠리는 주고받아요", "게임이 가능해요"].map((o) => (
              <label key={o} className="mt-1 block">
                <input type="radio" name="level" required className="mr-2" />
                {o}
              </label>
            ))}
          </fieldset>
          <fieldset className="text-sm">
            <legend className="font-bold">누구와 함께 오시나요?</legend>
            {["혼자요", "친구랑 둘이서"].map((o) => (
              <label key={o} className="mt-1 block">
                <input type="radio" name="party" required className="mr-2" />
                {o}
              </label>
            ))}
          </fieldset>
          <WfNote>Phase 2에서 이 폼 제출을 Tally로 수집 연결</WfNote>
          <button type="submit" className="w-full border border-neutral-800 bg-neutral-100 py-3 font-bold">
            다음 — 결제로 →
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">계약금 결제</h1>
          <div className="border border-neutral-300 p-4 text-sm">
            <p className="font-bold">{trip.name}</p>
            <p className="text-neutral-600">
              {trip.destination} · {trip.duration} · {trip.dates}
            </p>
            <hr className="my-2 border-neutral-200" />
            <p className="flex justify-between">
              <span>계약금</span>
              <span className="font-bold">{trip.deposit}</span>
            </p>
            <p className="flex justify-between text-neutral-500">
              <span>총액 (잔금은 일정 확정 후)</span>
              <span>{trip.totalPrice}</span>
            </p>
          </div>
          <label className="block text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-2"
            />
            환불 규정 및 이용 약관에 동의합니다
          </label>
          <button
            disabled
            className="w-full cursor-not-allowed border border-neutral-300 py-3 text-neutral-400"
          >
            카드로 결제하기 (PG 연동 예정)
          </button>
          <button
            disabled={!agreed}
            onClick={() => setStep(3)}
            className="w-full border border-neutral-800 bg-neutral-100 py-3 font-bold disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
          >
            카카오톡으로 결제 안내 받기 →
          </button>
          <WfNote>PG 연동 시 "카드로 결제하기" 활성화, 카카오 버튼은 백업으로 유지 여부 결정</WfNote>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 py-8 text-center">
          <h1 className="text-xl font-bold">신청 완료!</h1>
          <p className="text-sm text-neutral-600">
            계약금 결제 안내를 카카오톡으로 보내드릴게요.
            <br />
            자리는 결제 순으로 확정됩니다.
          </p>
          <p className="text-sm">
            [인스타그램 팔로우 유도 — @love_court.kr]
          </p>
          <Link to="/test" className="inline-block border border-neutral-400 px-6 py-2 text-sm">
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 라우트 추가**

`src/main.tsx`의 `<Route path="/test">` 자식에 추가:

```tsx
<Route path="trips/:id/book" element={<BookingPage />} />
```

import 추가: `import { BookingPage } from "./pages/BookingPage";`

- [ ] **Step 3: 빌드 검증**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 4: 브라우저 검증**

`/test/trips/bali/book`에서:
- Step 1: 필수 입력 비우고 제출 → 브라우저 기본 validation에 막힘. 채우고 제출 → Step 2.
- Step 2: 약관 미동의 시 카카오 버튼 비활성. 동의 → 클릭 → Step 3. "카드로 결제하기"는 항상 비활성.
- Step 3: 완료 화면 + 홈 링크.

- [ ] **Step 5: 커밋**

```bash
git add src/pages/BookingPage.tsx src/main.tsx
git commit -m "와이어프레임: 예약 3스텝 플로우 (신청 정보 → 결제 자리 → 완료)"
```

---

### Task 6: 동선 마감 + 전체 점검

**Files:**
- Modify: `src/pages/TestLayout.tsx` (CTA를 확정 트립 상세로 연결)

**Interfaces:**
- Consumes: `getOpenTrip()` (`src/data/trips.ts`)

- [ ] **Step 1: TestLayout CTA 연결**

`src/pages/TestLayout.tsx`에서:

```tsx
import { getOpenTrip } from "../data/trips";
```

를 추가하고 `const ctaTo = "/test";` 줄을 다음으로 교체:

```tsx
const open = getOpenTrip();
const ctaTo = open ? `/test/trips/${open.id}` : "/test";
```

- [ ] **Step 2: 빌드 검증**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 전체 동선 브라우저 점검 (390px + 데스크톱)**

- `/` 기존 랜딩 무변화 확인 (최우선)
- `/test` 홈 → 히어로 배너/프로그램 카드/마무리 CTA/상단·하단 고정 CTA 전부 → `/test/trips/bali` 도달
- 상세 → 예약 CTA → `/test/trips/bali/book` → 3스텝 완주
- 상세/예약에서 브라우저 새로고침 시 정상 렌더 (Vite dev SPA fallback)
- 390px에서 가로 스크롤 없음

- [ ] **Step 4: 커밋**

```bash
git add src/pages/TestLayout.tsx
git commit -m "와이어프레임: 전역 CTA를 확정 트립 상세로 연결, 전체 동선 점검"
```

- [ ] **Step 5: 대표 리뷰 요청**

`/test` 주소를 공유하고 와이어프레임 확인 요청. 피드백 반영 후 Phase 2(비주얼 디자인) 별도 계획 수립.

---

## Phase 2 예고 (이 계획 범위 밖)

와이어프레임 승인 후 별도 계획으로: 브랜드 토큰 적용(오프화이트·딥그린·오렌지), 실제 사진 삽입, Topbar/Footer 실물 교체, Tally 수집 연결, GA4 퍼널 이벤트, 준비중 카드 "오픈 알림 받기" 폼, 배포 환경 SPA fallback 설정.
