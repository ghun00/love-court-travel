import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeo } from "./seo";

function setMeta(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/** 클라이언트 라우트 이동 시 탭 제목·주요 메타 갱신 (최초 진입 값은 프리렌더 HTML이 담당) */
export function useSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getSeo(pathname);
    document.title = seo.title;
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('link[rel="canonical"]', "href", seo.url);
  }, [pathname]);
}
