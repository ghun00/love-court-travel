/**
 * 사업자·여행업 표시 정보 — 푸터와 약관/방침 문서가 모두 여기서 읽습니다.
 * 값이 null이면 화면에 "확인 필요" 표시가 뜹니다. 오픈 전에 모두 채워 주세요.
 */
export const COMPANY = {
  name: "프라이데이랩",
  brand: "러브코트",
  ceo: "한지훈",
  privacyOfficer: "한지훈",
  bizNo: "481-11-03110",
  /** 관광진흥법 — 여행업 등록번호와 등록관청 */
  tourRegNo: "제2026-000006호",
  tourRegOffice: "경기도 하남시" as string | null,
  mailOrderNo: "2026-경기하남-1633",
  address: "경기도 하남시 미사대로 550, 10층 C10-0001호,1003호",
  email: "gks3628@gmail.com",
  phone: "010-2439-3628",
  /** 상담·취소 접수 시간 */
  hours: "평일 10:00–18:00 (주말·공휴일 휴무)",
  hosting: "Vercel Inc.",
};

/** 공정위 사업자정보 확인 — 사업자등록번호(숫자만)로 조회 */
export const FTC_BIZ_URL = `https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${COMPANY.bizNo.replace(/-/g, "")}`;

/** 외교부 해외안전여행 */
export const SAFETY_URL = "https://www.0404.go.kr";

/**
 * 관광진흥법 제9조 — 보증보험(또는 공제·영업보증금).
 * 기획여행을 하려면 영업보증과 별도로 기획여행 보증이 필요합니다.
 */
export type Guarantee = {
  insurer: string | null; // 예: "서울보증보험" / "한국관광협회중앙회 공제"
  policyNo: string | null;
  amount: string | null; // 예: "2억 원"
  period: string | null; // 예: "2026.01.01 – 2026.12.31"
  /** 피보험자 — 여행자 피해 보상은 이 기관을 통해 지급 */
  insured: string;
  /** 증권 사본 PDF (public/ 기준) */
  pdf?: string;
};

const SGI = "서울보증보험";
const PERIOD = "2026.09.11 – 2027.09.10";
const INSURED = "(사)경기도관광협회";

export const GUARANTEES: { business: Guarantee; planned: Guarantee } = {
  business: {
    insurer: SGI,
    policyNo: "제100-000-2026-0659-8525호",
    amount: "3,000만 원",
    period: PERIOD,
    insured: INSURED,
    pdf: "/insurance/business-guarantee.pdf",
  },
  planned: {
    insurer: SGI,
    policyNo: "제100-000-2026-0659-9437호",
    amount: "2억 원",
    period: PERIOD,
    insured: INSURED,
    pdf: "/insurance/planned-tour-guarantee.pdf",
  },
};

/** 약관·방침 시행일 */
export const LEGAL_EFFECTIVE_DATE = "2026년 10월 9일";

export const LEGAL_DOCS = [
  { slug: "terms", label: "이용약관" },
  { slug: "privacy", label: "개인정보처리방침" },
  { slug: "travel-terms", label: "여행이용약관" },
  { slug: "refund", label: "취소·환불 규정" },
  { slug: "insurance", label: "보증보험" },
] as const;

export type LegalSlug = (typeof LEGAL_DOCS)[number]["slug"];
