import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * 가치 패널 배경 패럴랙스.
 * 반환된 ref를 배경 요소에 달면, 부모 패널이 화면을 통과하는 비율에 따라
 * translateY를 최대 ±5% 이동시킨다. reduced-motion이면 비활성.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const bg = ref.current;
    if (!bg || reducedMotion) return;

    let ticking = false;

    function update() {
      ticking = false;
      if (!bg || !bg.parentElement) return;
      const vh = window.innerHeight;
      const rect = bg.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh + rect.height);
      bg.style.transform = `translateY(${(progress * -10).toFixed(2)}%)`;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      bg.style.transform = "";
    };
  }, [reducedMotion]);

  return ref;
}
