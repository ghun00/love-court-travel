import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { TestLayout } from "./pages/TestLayout";
import { HomePage } from "./pages/HomePage";
import { TripDetailPage } from "./pages/TripDetailPage";
import { BookingPage } from "./pages/BookingPage";
import { TestHome } from "./pages/TestHome";
import { TestHome2 } from "./pages/TestHome2";
import { TestHome3 } from "./pages/TestHome3";
import { TestPage1 } from "./pages/TestPage1";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<TestLayout />}>
          <Route index element={<HomePage />} />
          <Route path="trips/:id" element={<TripDetailPage />} />
          <Route path="trips/:id/book" element={<BookingPage />} />
        </Route>
        <Route path="/test-home" element={<TestHome />} />
        <Route path="/test-home2" element={<TestHome2 />} />
        <Route path="/test-home3" element={<TestHome3 />} />
        <Route path="/test-page1" element={<TestPage1 />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
