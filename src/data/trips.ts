export type TripStatus = "open" | "coming";

export interface TripDay {
  day: number;
  title: string;
  detail: string;
}

export interface Trip {
  id: string;
  status: TripStatus;
  /** 트립명 (예: "발리 테니스 트립 1기") */
  name: string;
  /** 목적지 표기 (예: "발리, 인도네시아") */
  destination: string;
  /** 미확정 시 플레이스홀더 (예: "○박 ○일") — 임의 수치 금지 */
  duration: string;
  /** 미확정 시 "2026년 ○월 예정" */
  dates: string;
  capacity: number;
  spotsLeft: number;
  /** 계약금 표기 — 미확정 시 "○○만 원" */
  deposit: string;
  /** 총액 표기 — 미확정 시 "○○○만 원 (항공권 제외)" */
  totalPrice: string;
  /** images/ 기준 파일명 — 없으면 와이어프레임 박스로 표시 */
  heroImage: string;
  summary: string;
  days: TripDay[];
  included: string[];
  excluded: string[];
  refundPolicy: string[];
}

export const TRIPS: Trip[] = [
  {
    id: "bali",
    status: "open",
    name: "발리 테니스 트립 1기",
    destination: "발리, 인도네시아",
    duration: "○박 ○일",
    dates: "2026년 ○월 예정",
    capacity: 8,
    spotsLeft: 8,
    deposit: "○○만 원",
    totalPrice: "○○○만 원 (항공권 제외)",
    heroImage: "journal-bali.webp",
    summary:
      "좋은 코트, 매일 2시간의 테니스, 스냅 작가가 남기는 당신의 장면. 혼자 오라고 만든 소규모 테니스 여행.",
    days: [
      { day: 1, title: "도착 & 웰컴 랠리", detail: "[일정 상세 — 대표 제공]" },
      { day: 2, title: "오전 테니스 · 오후 자유시간", detail: "[일정 상세 — 대표 제공]" },
      { day: 3, title: "스냅 촬영 데이", detail: "[일정 상세 — 대표 제공]" },
      { day: 4, title: "마무리 게임 & 출국", detail: "[일정 상세 — 대표 제공]" },
    ],
    included: [
      "숙소 (전 일정)",
      "코트 대여 · 매일 최소 2시간 테니스",
      "전문 스냅 작가 동행 및 보정본",
      "현지 이동 차량",
      "[포함사항 — 대표 확정]",
    ],
    excluded: ["항공권", "여행자 보험", "[불포함사항 — 대표 확정]"],
    refundPolicy: [
      "[환불 규정 — 대표 확정 전 게시 불가, 결제 오픈 전 필수]",
    ],
  },
  {
    id: "japan",
    status: "coming",
    name: "일본 테니스 트립",
    destination: "일본",
    duration: "준비중",
    dates: "준비중",
    capacity: 8,
    spotsLeft: 8,
    deposit: "",
    totalPrice: "",
    heroImage: "journal-japan.webp",
    summary: "다음 시즌 준비중",
    days: [],
    included: [],
    excluded: [],
    refundPolicy: [],
  },
  {
    id: "vietnam",
    status: "coming",
    name: "베트남 테니스 트립",
    destination: "베트남",
    duration: "준비중",
    dates: "준비중",
    capacity: 8,
    spotsLeft: 8,
    deposit: "",
    totalPrice: "",
    heroImage: "journal-vietnam.webp",
    summary: "다음 시즌 준비중",
    days: [],
    included: [],
    excluded: [],
    refundPolicy: [],
  },
];

export function getTrip(id: string): Trip | undefined {
  return TRIPS.find((t) => t.id === id);
}

export function getOpenTrip(): Trip | undefined {
  return TRIPS.find((t) => t.status === "open");
}
