import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { TestLayout } from "./pages/TestLayout";
import { HomePage } from "./pages/HomePage";
import { TripDetailPage } from "./pages/TripDetailPage";
import { BookingPage } from "./pages/BookingPage";
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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
