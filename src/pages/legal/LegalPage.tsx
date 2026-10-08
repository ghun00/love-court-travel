import { useEffect, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Footer, Nav } from "../TestPage1";
import { LEGAL_DOCS, LEGAL_EFFECTIVE_DATE, type LegalSlug } from "../../data/company";
import { TermsDoc } from "./TermsDoc";
import { PrivacyDoc } from "./PrivacyDoc";
import { TravelTermsDoc } from "./TravelTermsDoc";
import { RefundDoc } from "./RefundDoc";
import { InsuranceDoc } from "./InsuranceDoc";
import "../../styles/test-home.css";
import "../../styles/test-home3.css";
import "../../styles/test-page1.css";
import "../../styles/test-trip-detail.css";
import "../../styles/legal.css";

/**
 * /legal/:doc — 약관·방침 문서 (클투 /legal/* 구조)
 * - 상단 문서 탭 → 제목·시행일 → 본문. 문서 내용은 각 *Doc.tsx에.
 * - 미확정 값은 <Todo>로 노란 표시 — 오픈 전에 모두 없어져야 함.
 */
const DOCS: Record<LegalSlug, { title: string; body: () => ReactNode }> = {
  terms: { title: "이용약관", body: TermsDoc },
  privacy: { title: "개인정보처리방침", body: PrivacyDoc },
  "travel-terms": { title: "여행이용약관", body: TravelTermsDoc },
  refund: { title: "취소·환불 규정", body: RefundDoc },
  insurance: { title: "보증보험 가입 안내", body: InsuranceDoc },
};

export function LegalPage() {
  const { doc = "" } = useParams();
  const entry = DOCS[doc as LegalSlug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [doc]);

  if (!entry) return <Navigate to="/legal/terms" replace />;
  const Body = entry.body;

  return (
    <div className="th th--v3 th--p1 td-root">
      <Nav solid />
      <div className="th-container lg-page">
        <nav className="lg-tabs" aria-label="약관 및 정책">
          {LEGAL_DOCS.map((d) => (
            <Link key={d.slug} to={`/legal/${d.slug}`} className={d.slug === doc ? "is-active" : ""}
              aria-current={d.slug === doc ? "page" : undefined}>
              {d.label}
            </Link>
          ))}
        </nav>
        <article className="lg-doc">
          <h1 className="lg-doc__title">{entry.title}</h1>
          <p className="lg-doc__date">시행일 {LEGAL_EFFECTIVE_DATE}</p>
          <Body />
        </article>
      </div>
      <Footer />
    </div>
  );
}
