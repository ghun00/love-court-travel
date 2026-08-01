import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * 스크롤 페이드인. 뷰포트에 들어오면 visible이 true가 되고 유지된다.
 * reduced-motion이면 즉시 visible.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, visible]);

  return { ref, visible };
}

/** reveal 공통 클래스 문자열 — 컴포넌트에서 className에 합성해 사용 */
export function revealClass(visible: boolean, delay?: string) {
  return [
    "transition-[opacity,transform] duration-700 ease-out",
    delay ?? "",
    "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
  ]
    .filter(Boolean)
    .join(" ");
}
