import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import App from "./App";
import { TestPage1 } from "./pages/TestPage1";
import { TestTripDetail } from "./pages/TestTripDetail";
import "./index.css";

function LegacyTripRedirect() {
  const { id } = useParams();
  return <Navigate to={`/trips/${id}`} replace />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage1 />} />
        <Route path="/trips/:id" element={<TestTripDetail />} />
        <Route path="/foam" element={<App />} />
        {/* 예전 시안 주소로 들어온 경우 새 주소로 */}
        <Route path="/test-page1" element={<Navigate to="/" replace />} />
        <Route path="/test-page1/trips/:id" element={<LegacyTripRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
