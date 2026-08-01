import type { ReactNode } from "react";

const VARIANT_CLASSES = {
  /** 데스크톱 우상단 버튼 */
  top: "hidden md:inline-block px-[22px] py-[10px] text-[0.9rem]",
  /** 히어로 중앙 버튼 */
  hero: "inline-block px-9 py-[15px] text-[1.05rem]",
  /** 후보지 섹션 버튼 */
  dest: "inline-block px-8 py-[14px] text-base",
  /** 모바일 하단 바 버튼 — 배경은 바가 담당 */
  bar: "flex flex-1 items-center justify-center rounded-xl bg-transparent text-base hover:bg-white/8",
} as const;

interface CtaButtonProps {
  variant: keyof typeof VARIANT_CLASSES;
  href?: string;
  className?: string;
  children: ReactNode;
}

export function CtaButton({
  variant,
  href = "#waitlist",
  className = "",
  children,
}: CtaButtonProps) {
  const base =
    variant === "bar"
      ? "text-white font-bold text-center no-underline"
      : "rounded-full bg-court-green text-white font-bold text-center no-underline transition-[transform,background-color] duration-200 hover:bg-court-green-dark motion-reduce:transition-none";

  return (
    <a
      href={href}
      className={`${base} focus-visible:outline-3 focus-visible:outline-clay focus-visible:outline-offset-3 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
