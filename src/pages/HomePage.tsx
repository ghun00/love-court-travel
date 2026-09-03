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
