import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// 빌드 결과물은 프리렌더된 HTML이 들어 있어 hydrate, dev 서버는 빈 root라 새로 렌더
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
