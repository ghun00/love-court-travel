import { CtaButton } from "./ui/CtaButton";

/** 모바일 하단 고정 CTA 바 — md 이상에서는 숨김 (탑바 버튼이 담당) */
export function CtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-100 flex h-cta-bar items-stretch bg-court-green px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] md:hidden">
      <CtaButton variant="bar">대기명단 등록하기 →</CtaButton>
    </div>
  );
}
