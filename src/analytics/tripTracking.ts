import { useEffect } from "react";

/**
 * 트립 상세 페이지 GA4 추적 — 한 곳에 모아 둠
 * - 다음 트립은 trips.ts의 해당 트립에 analyticsId만 넣으면 같은 이벤트가 나감
 * - gtag가 없거나(광고 차단 등) 오류가 나도 페이지 동작에는 영향 없음
 * - 개인정보(이름·전화·이메일)는 어떤 이벤트에도 넣지 않음
 *
 * 이벤트
 * - cta_click     { cta_location, cta_text, trip }   그로블로 실제 이동할 때
 * - inquiry_click { inquiry_location: faq|sticky, trip }  인스타그램 DM 문의 버튼 클릭
 * - scroll_depth  { percent: 25|50|75|100, trip }   페이지당 지점별 1회
 * - section_view  { section, trip }                 [data-track-section] 요소가 충분히 보였을 때 1회
 * - faq_open      { question(앞 40자), trip }        [data-track-faq] 안의 <details>를 펼칠 때
 */

type Params = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** gtag 안전 호출 — 없으면 아무것도 안 함, 오류는 조용히 무시 */
export function track(event: string, params: Params) {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", event, { ...params, transport_type: "beacon" });
  } catch {
    /* noop */
  }
}

/** 그로블 이동 버튼 클릭 — 페이지를 떠나도 유실되지 않게 beacon 전송 */
export function trackCtaClick(trip: string | undefined, location: string, text: string) {
  if (!trip) return;
  track("cta_click", { cta_location: location, cta_text: text.trim(), trip });
}

export type InquiryLocation = "faq" | "sticky";

/** "궁금한 점 물어보기" 클릭 — 같은 창에서 인스타그램 DM으로 이동하므로 cta_click과 같이 beacon 전송 */
export function trackInquiryClick(trip: string | undefined, location: InquiryLocation) {
  if (!trip) return;
  track("inquiry_click", { inquiry_location: location, trip });
}

/* ---------------------------------------------------------------- */
/* UTM 유지                                                          */
/* ---------------------------------------------------------------- */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const UTM_STORE = "lc_utm";

/**
 * 첫 진입 URL의 UTM을 세션에 기억 — 홈으로 들어와 상세로 이동해도 유지되게
 * (앱 시작 시 1회 호출. 새 UTM으로 다시 들어오면 덮어씀)
 */
export function captureUtm() {
  try {
    const q = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = q.get(k);
      if (v) utm[k] = v;
    });
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(utm));
  } catch {
    /* noop */
  }
}

function currentUtm(): Record<string, string> {
  captureUtm();
  try {
    const raw = sessionStorage.getItem(UTM_STORE);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

/** 외부 링크에 방문자의 UTM을 붙임 — UTM이 없으면 원래 주소 그대로. 링크에 이미 있는 값은 덮어쓰지 않음 */
export function withUtm(url: string): string {
  const utm = currentUtm();
  if (!Object.keys(utm).length) return url;
  try {
    const u = new URL(url);
    Object.entries(utm).forEach(([k, v]) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    });
    return u.toString();
  } catch {
    return url;
  }
}

/* ---------------------------------------------------------------- */
/* 페이지 단위 추적 (스크롤 깊이 · 섹션 도달 · FAQ 열기)                  */
/* ---------------------------------------------------------------- */
const DEPTHS = [25, 50, 75, 100] as const;

/** trip(analyticsId)이 없으면 아무것도 하지 않음 — 추적 대상 트립만 켜짐 */
export function useTripTracking(trip: string | undefined) {
  useEffect(() => {
    if (!trip || typeof window === "undefined") return;
    const cleanups: (() => void)[] = [];

    try {
      // 1) 스크롤 깊이 — passive 리스너 + rAF로 프레임당 1회만 계산
      const sent = new Set<number>();
      let ticking = false;
      const check = () => {
        ticking = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max <= 0 ? 100 : ((window.scrollY || doc.scrollTop) / max) * 100;
        DEPTHS.forEach((d) => {
          // 100%는 바닥 근처(99% 이상)면 인정
          if (!sent.has(d) && pct >= (d === 100 ? 99 : d)) {
            sent.add(d);
            track("scroll_depth", { percent: d, trip });
          }
        });
        if (sent.size === DEPTHS.length) window.removeEventListener("scroll", onScroll);
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(check);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));

      // 2) 섹션 도달 — 섹션의 50% 이상이 보이면 1회
      //    단, 화면보다 2배 이상 긴 섹션(상세 이미지 등)은 50%가 한 화면에 들어올 수 없으므로
      //    "화면의 절반 이상을 그 섹션이 채웠을 때"로 판단
      if ("IntersectionObserver" in window) {
        const vh = window.innerHeight || 1;
        document.querySelectorAll<HTMLElement>("[data-track-section]").forEach((el) => {
          const section = el.dataset.trackSection;
          if (!section) return;
          const h = el.getBoundingClientRect().height || 1;
          const threshold = Math.min(0.5, (0.5 * vh) / h);
          const io = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting && e.intersectionRatio >= threshold - 0.001)) {
                track("section_view", { section, trip });
                io.disconnect();
              }
            },
            { threshold },
          );
          io.observe(el);
          cleanups.push(() => io.disconnect());
        });
      }

      // 3) FAQ 열기 — <details>의 toggle은 버블링되지 않아 캡처 단계에서 받음
      const onToggle = (e: Event) => {
        const d = e.target;
        if (!(d instanceof HTMLDetailsElement) || !d.open || !d.closest("[data-track-faq]")) return;
        const q = (d.querySelector("summary")?.textContent ?? "").replace(/^\s*Q\.\s*/, "").trim();
        track("faq_open", { question: q.slice(0, 40), trip });
      };
      document.addEventListener("toggle", onToggle, true);
      cleanups.push(() => document.removeEventListener("toggle", onToggle, true));
    } catch {
      /* noop */
    }

    return () => cleanups.forEach((fn) => fn());
  }, [trip]);
}
