import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { TRIPS } from "./data/trips";
import { getIndexablePaths, getSeo, SITE_URL } from "./seo/seo";
import { renderHead } from "./seo/head";

/** scripts/prerender.mjs 전용 — 경로 하나를 HTML 조각(head, body)으로 렌더 */
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: renderHead(getSeo(url)) };
}

export const indexablePaths = getIndexablePaths(TRIPS);
export const prerenderPaths = [...indexablePaths, "/foam"];
export { SITE_URL };
