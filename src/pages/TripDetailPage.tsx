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
