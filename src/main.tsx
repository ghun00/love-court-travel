import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./index.css";
import { captureUtm } from "./analytics/tripTracking";

// 첫 진입 URL의 UTM을 세션에 기억 — 그로블 링크로 넘길 때 사용
captureUtm();

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// 이 주소로 프리렌더된 HTML이면 hydrate. 폴백(다른 경로의 index.html)이나 dev 서버의 빈 root는 새로 렌더
if (root.dataset.path === location.pathname) hydrateRoot(root, app);
else createRoot(root).render(app);
