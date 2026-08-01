import { useScrolled } from "../hooks/useScrolled";
import { CtaButton } from "./ui/CtaButton";

/** 고정 상단 워드마크 바 — 히어로 위에선 스크림+흰 로고, 스크롤 후 오프화이트+오렌지 로고 */
export function Topbar() {
  const scrolled = useScrolled(40);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 flex items-center justify-between px-5 py-3.5 transition-[background-color,box-shadow] duration-350 md:px-8 md:py-[18px] xl:px-12 xl:py-[22px] ${
        scrolled
          ? "bg-court-bg shadow-[0_1px_0_rgba(17,17,17,0.07)]"
          : "bg-gradient-to-b from-black/35 to-transparent"
      }`}
    >
      <a className="inline-flex items-center" href="#top">
        <img
          className={`h-5 w-auto ${scrolled ? "hidden" : "block"}`}
          src="/logo_lovecourt_white.png"
          alt="러브코트"
        />
        <img
          className={`h-5 w-auto ${scrolled ? "block" : "hidden"}`}
          src="/logo_lovecourt_mainOrange.png"
          alt=""
          aria-hidden="true"
        />
      </a>
      <CtaButton variant="top">대기명단 등록하기</CtaButton>
    </header>
  );
}
