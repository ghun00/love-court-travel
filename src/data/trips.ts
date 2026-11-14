export type TripStatus = "open" | "coming";

export interface TripDay {
  day: number;
  title: string;
  detail: string;
}

export interface TripRoom {
  id: "twin" | "single";
  label: string;
  /** 1인 기준 결제 금액 (원) */
  price: number;
  /** 정가 — 할인 중일 때 취소선 표기 */
  listPrice?: number;
  /** 선택 불가 (마감 등) */
  disabled?: boolean;
}

/** 제공 사항 아이콘 — 실제 SVG는 TestTripDetail의 OFFER_ICONS */
export type OfferIcon =
  | "bus" | "hotel" | "onsen" | "pool" | "court" | "coach" | "breakfast"
  | "drink" | "dinner" | "camera" | "shield" | "host";

export interface TripOffer {
  icon: OfferIcon;
  /** 일반 글씨 */
  text?: string;
  /** text 뒤에 굵게 붙는 강조 문구 */
  em?: string;
  /** 작은 보조 설명 (예: "조식 포함") */
  sub?: string;
}

/** 상세 페이지(/trips/:id) 전용 콘텐츠 — 트립마다 다른 부분은 전부 여기서 관리 */
export interface TripDetail {
  /** 상단 대표 이미지. banner: 문구가 박힌 2:1 배너(잘리지 않게 원본 비율) */
  hero: { src: string; banner?: boolean };
  /**
   * 코드로 그리는 대표 영역 — 있으면 hero 이미지 대신 노출 (hero는 공유·검색 썸네일로만 사용)
   * 배경 사진 여러 장이 번갈아 바뀌고, 문구는 HTML이라 모바일에서도 크게 보임
   */
  cover?: {
    /** 배경 사진 — 순서대로 교차 */
    slides: string[];
    /** 타이틀 위 작은 위치 표기 (예: "Vietnam, Danang") */
    eyebrow: string;
    /** 타이틀 — 줄 단위 배열 (모바일에서 줄바꿈 위치 고정, PC는 한 줄) */
    title: string[];
    /** 타이틀 아래 일정 */
    sub: string;
  };
  /** 세로로 긴 상세 이미지를 잘라 순서대로 (w·h는 레이아웃 시프트 방지용) */
  images: { src: string; w: number; h: number }[];
  /** 제공 사항 아이콘 그리드 */
  offers: TripOffer[];
  /** 기본 정보 박스 [항목, 내용, 보조 안내(선택 — 내용 오른쪽에 작은 회색 글씨)] */
  info: [string, string, string?][];
  /** 예약 안내(기획여행 표시사항)의 "포함 내역" 한 줄 */
  includedSummary: string;
  /** 결제 페이지(그로블 등) — 없으면 신청 버튼이 "신청 오픈 예정"으로 잠김 */
  applyUrl?: string;
  /**
   * 영상 폴더(src/assets/reels/<id>/)가 비어 있을 때만 쓰는 자리표시 표지
   * — 실제 영상은 폴더에 넣으면 자동으로 노출됨
   */
  reelPlaceholders?: string[];
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
  /** 객실 옵션 — 있으면 상세·신청 페이지가 금액을 숫자로 계산 */
  rooms?: TripRoom[];
  /** 계약금 (원) — rooms와 함께 잔금 계산에 사용 */
  depositAmount?: number;
  /** 할인 표기 라벨 — rooms[].listPrice가 있을 때 금액 옆에 노출 (예: "1기 한정 할인") */
  priceBadge?: string;
  /** 상세 페이지 콘텐츠 — 없으면 상세는 "준비 중" */
  detail?: TripDetail;
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
    id: "hakone",
    status: "open",
    name: "하코네 테니스 트립 1기",
    destination: "일본 하코네",
    duration: "2박 3일",
    dates: "2026.11.07 – 09",
    capacity: 8,
    spotsLeft: 5,
    deposit: "30만 원",
    totalPrice: "149만 원부터 (항공권 제외)",
    heroImage: "hero-hakone.png",
    summary:
      "외륜산 뷰 옥외 코트 3면 통대관, 온천 료칸 2박, 전 일정 스냅 작가 동행. 혼자 오라고 만든 6~8명의 테니스 여행.",
    days: [],
    included: [],
    excluded: ["항공권", "개인 경비"],
    refundPolicy: ["[환불 규정 — 대표 확정 전 게시 불가, 결제 오픈 전 필수]"],
    rooms: [
      { id: "twin", label: "2인 1실", price: 1_490_000, listPrice: 1_690_000 },
      { id: "single", label: "1인 1실", price: 1_790_000, disabled: true },
    ],
    depositAmount: 300_000,
    priceBadge: "얼리버드",
    detail: {
      hero: { src: "/images/detail-hakone-hero.webp", banner: true },
      images: [
        { src: "/images/detail-hakone-1.webp", w: 1000, h: 3789 },
        { src: "/images/detail-hakone-2.webp", w: 1000, h: 10112 },
        { src: "/images/detail-hakone-3.webp", w: 1000, h: 7167 },
        { src: "/images/detail-hakone-4.webp", w: 1000, h: 12868 },
      ],
      offers: [
        { icon: "bus", text: "나리타 ↔ 호텔 전용 버스" },
        { icon: "hotel", text: "센고쿠하라 프린스 2박", sub: "조식 포함" },
        { icon: "onsen", em: "온천 및 사우나 무제한 이용" },
        { icon: "court", text: "코트 이용 보장" },
        { icon: "drink", text: "웰컴 디너 + ", em: "음료 무제한" },
        { icon: "dinner", text: "피날레 디너" },
        { icon: "camera", em: "전문 작가의 스냅 촬영" },
        { icon: "shield", text: "여행자보험 전원 가입" },
        { icon: "host", text: "전담 투어 리더 동행" },
      ],
      info: [
        ["여행 일정", "2026.11.07 – 09 2박 3일"],
        ["여행 도시", "일본 하코네"],
        ["집결 장소", "나리타 공항 터미널 2 1층 Central Gate | Info 부스 앞"],
        ["집결 시간", "오전 11시 10분까지 (오전 10시 40분 이전 도착편 권장)"],
        ["참가 인원", "최소 6명 ~ 최대 8명 선착순 모집"],
        ["참가 나이", "20대 - 30대"],
        ["참가 레벨", "랠리를 지속할 수 있고 준수한 수준의 서브 및 리턴을 구사할 수 있는 실력"],
        ["항공권", "불포함 (개별 구매)"],
      ],
      includedSummary:
        "나리타 공항 ↔ 호텔 전용 버스, 숙박 2박(조식 포함), 웰컴 디너·피날레 디너, 코트 이용, 스냅 촬영, 여행자보험, 투어 리더 동행",
      applyUrl: "https://www.groble.im/products/nSdBPJ",
      // TODO(대표 제공): 자리 확인용 임시 사진 — src/assets/reels/hakone/ 에 영상을 넣으면 대체됨
      reelPlaceholders: [
        "/images/reel-sample-1.webp",
        "/images/reel-sample-2.webp",
        "/images/reel-sample-3.webp",
      ],
    },
  },
  {
    id: "danang",
    status: "open",
    name: "다낭 테니스 트립 1기",
    destination: "베트남 다낭",
    duration: "2박 3일",
    dates: "2027.01.23 – 25",
    capacity: 8,
    spotsLeft: 8,
    deposit: "30만 원",
    totalPrice: "89만 원 (1기 할인가, 정가 99만 원 · 항공권 제외)",
    heroImage: "detail-danang-hero.webp",
    summary:
      "다낭 논느억 해변의 5성급 퓨전 리조트 2박, 현지 코치 레슨과 소셜 테니스, 전 일정 스냅 작가 동행. 혼자 오라고 만든 6~8명의 테니스 여행.",
    days: [],
    included: [],
    excluded: ["왕복 항공권", "여행자 보험", "개인 경비(스파 등)"],
    refundPolicy: [],
    rooms: [{ id: "twin", label: "2인 1실", price: 890_000, listPrice: 990_000 }],
    depositAmount: 300_000,
    priceBadge: "1기 한정 할인",
    detail: {
      hero: { src: "/images/detail-danang-hero.webp", banner: true },
      cover: {
        slides: ["/images/detail-danang-cover-1.webp", "/images/detail-danang-cover-2.webp"],
        eyebrow: "Vietnam, Danang",
        title: ["베트남, 다낭", "테니스 트립 1기"],
        sub: "2027년 1월 23일 - 25일 | 2박 3일",
      },
      images: [
        { src: "/images/detail-danang-1.webp", w: 1000, h: 2703 },
        { src: "/images/detail-danang-2.webp", w: 1000, h: 5352 },
        { src: "/images/detail-danang-3.webp", w: 1000, h: 4857 },
        { src: "/images/detail-danang-4.webp", w: 1000, h: 3235 },
        { src: "/images/detail-danang-5.webp", w: 1000, h: 5389 },
        { src: "/images/detail-danang-6.webp", w: 1000, h: 3234 },
        { src: "/images/detail-danang-7.webp", w: 1000, h: 2754 },
        { src: "/images/detail-danang-8.webp", w: 1000, h: 7810 },
        { src: "/images/detail-danang-9.webp", w: 1000, h: 2432 },
        { src: "/images/detail-danang-10.webp", w: 1000, h: 11328 },
      ],
      offers: [
        { icon: "bus", text: "공항 픽업·샌딩 차량" },
        { icon: "hotel", text: "5성급 퓨전 리조트 2박", sub: "조식 포함" },
        { icon: "coach", em: "현지 코치 레슨" },
        { icon: "court", em: "테니스 10시간" },
        { icon: "pool", em: "수영장 및 사우나 무제한" },
        { icon: "drink", text: "웰컴 디너 + ", em: "음료 무제한" },
        { icon: "dinner", text: "피날레 디너 + ", em: "음료 무제한" },
        { icon: "camera", em: "전문 작가의 스냅 촬영" },
        { icon: "host", text: "전담 투어 리더 동행" },
      ],
      info: [
        ["여행 일정", "2027.01.23 (토) – 25 (월) 2박 3일"],
        ["여행 도시", "베트남 다낭"],
        ["숙소", "Fusion Resort Da Nang (5성급) · 트윈 베드 스위트룸"],
        ["집결 장소", "다낭 국제공항 Star Cafe 앞"],
        ["집결 시간", "오후 2시까지 (오후 1시 15분 이전 도착편 권장)"],
        ["참가 인원", "최소 6명 ~ 최대 8명 선착순 모집"],
        ["참가 나이", "무관"],
        [
          "참가 레벨",
          "랠리를 이어 갈 수 있고, 가벼운 친선 경기를 진행할 수 있는 정도의 실력",
          "※ 비슷한 실력끼리 즐길 수 있도록 실력에 따라 레슨 그룹과 파트너가 정해질 수 있어요.",
        ],
        ["항공권", "불포함 (개별 구매)"],
      ],
      includedSummary:
        "공항 픽업·샌딩 차량, 5성급 리조트 숙박 2박(조식 포함), 현지 코치 레슨, 테니스 10시간(코트 이용 포함), 수영장·사우나 이용, 웰컴 디너·피날레 디너(음료 무제한), 스냅 촬영, 투어 리더 동행",
      applyUrl: "https://www.groble.im/products/ny9KPJ",
    },
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

/** 상세 페이지에서 예약까지 가능한 트립 — 상세 노출·sitemap·프리렌더 기준 */
export function isBookable(trip: Trip): boolean {
  return trip.status === "open" && !!trip.rooms?.length && !!trip.detail;
}

export function getOpenTrip(): Trip | undefined {
  return TRIPS.find((t) => t.status === "open");
}
