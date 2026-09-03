import { Link, Outlet } from "react-router-dom";
import { getOpenTrip } from "../data/trips";

/** Phase 1 와이어프레임 공용 레이아웃 — 회색 골격. Phase 2에서 실제 Topbar/Footer로 교체 */
export function TestLayout() {
  const open = getOpenTrip();
  const ctaTo = open ? `/test/trips/${open.id}` : "/test";
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
