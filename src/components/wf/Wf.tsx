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
