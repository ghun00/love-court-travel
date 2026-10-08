import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LegalSlug } from "../../data/company";

/* ---------------------------------------------------------------- */
/* 문서 공통 조각                                                      */
/* ---------------------------------------------------------------- */

/** 조문 — 제목 + 항(ol). 항이 하나면 번호 없이 문단으로 */
export function Article({ n, title, children }: { n?: number; title: string; children: ReactNode }) {
  return (
    <section className="lg-art">
      <h3 className="lg-art__title">{n ? `제${n}조 (${title})` : title}</h3>
      {children}
    </section>
  );
}

/** 문서 안 큰 묶음 (예: "1장 총칙", "러브코트 특약") */
export function Part({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section className="lg-part" id={id}>
      <h2 className="lg-part__title">{title}</h2>
      {children}
    </section>
  );
}

export function Ol({ children }: { children: ReactNode }) {
  return <ol className="lg-ol">{children}</ol>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="lg-ul">{children}</ul>;
}

/** 표 — 첫 행은 머리글 */
export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="lg-table">
      <table>
        <thead>
          <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 미확정 값 — 오픈 전 반드시 채울 것 */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="lg-todo">[확인 필요: {children}]</mark>;
}

/** 값이 있으면 그대로, 없으면 Todo */
export function Val({ v, label }: { v: string | null | undefined; label: string }) {
  return v ? <>{v}</> : <Todo>{label}</Todo>;
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="lg-link">
      {children}
    </a>
  );
}

export function DocLink({ to, children }: { to: LegalSlug; children: ReactNode }) {
  return (
    <Link to={`/legal/${to}`} className="lg-link">
      {children}
    </Link>
  );
}
