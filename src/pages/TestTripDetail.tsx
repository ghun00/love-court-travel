import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getTrip, isBookable, type TripRoom } from "../data/trips";
import { Footer, Nav } from "./TestPage1";
import "../styles/test-home.css";
import "../styles/test-home3.css";
import "../styles/test-page1.css";
import "../styles/test-trip-detail.css";

/**
 * /trips/:id — 트립 상세 (test-page1 스킨)
 * - 클투: 상단 가로 대표 이미지 → 좌 제목·본문 / 우 sticky 예약 카드
 * - 강조 타이포(Vitro Core) 없이 산세리프 + 흰 배경 + 회색 정보 박스로 담백하게
 * - 모바일: 이미지 → 제목 → 예약 카드 → 본문 (grid-area로 배치)
 * - 본문: 제공 사항(solosholidays What's included) → 기본 정보 박스 → 상세 이미지 1장 → 후기
 */

/** 상단 대표 배너 — 문구가 박힌 2:1 이미지라 잘리지 않게 비율 그대로 노출 (없으면 trip.heroImage) */
const DETAIL_HERO: Record<string, string> = {
  hakone: "/images/detail-hakone-hero.webp",
};

/** 상세 설명 이미지 — 세로로 긴 원본을 잘라 순서대로 이어 붙임 (w·h는 레이아웃 시프트 방지용) */
const DETAIL_IMGS: Record<string, { src: string; w: number; h: number }[]> = {
  hakone: [
    { src: "/images/detail-hakone-1.webp", w: 1000, h: 3789 },
    { src: "/images/detail-hakone-2.webp", w: 1000, h: 10112 },
    { src: "/images/detail-hakone-3.webp", w: 1000, h: 7167 },
    { src: "/images/detail-hakone-4.webp", w: 1000, h: 12868 },
  ],
};

const SECTIONS = [
  { id: "info", label: "기본 정보" },
  { id: "detail", label: "상세 설명" },
  { id: "reviews", label: "후기" },
] as const;

/** 제공 사항 — t 안의 <b>는 강조 포인트, sub는 괄호 보조 설명 */
const OFFERS: { icon: ReactNode; t: ReactNode; sub?: string }[] = [
  {
    // 버스
    icon: (
      <>
        <rect x="4" y="3" width="16" height="15" rx="2" />
        <path d="M4 10h16M8 18v3M16 18v3M8 14.5h.01M16 14.5h.01" />
      </>
    ),
    t: "나리타 ↔ 호텔 전용 버스",
  },
  {
    // 호텔
    icon: <path d="M3 20V9l9-5 9 5v11M3 20h18M9 20v-5h6v5M8 11h.01M12 11h.01M16 11h.01" />,
    t: "센고쿠하라 프린스 2박",
    sub: "조식 포함",
  },
  {
    // 온천
    icon: (
      <>
        <path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4M16 3c-1 1.5 1 2.5 0 4" />
        <path d="M3 13c0 4 4 7 9 7s9-3 9-7c0-1-.6-1.5-1.5-1.5h-15C3.6 11.5 3 12 3 13z" />
      </>
    ),
    t: <b>온천 및 사우나 무제한 이용</b>,
  },
  {
    // 코트
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M12 5v14M3 9h18M3 15h18M7 9v6M17 9v6" />
      </>
    ),
    t: "코트 이용 보장",
  },
  {
    // 잔
    icon: <path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3zM12 14v7M8 21h8M7.5 7h9" />,
    t: (
      <>
        웰컴 디너 + <b>음료 무제한</b>
      </>
    ),
  },
  {
    // 디너
    icon: <path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 8h3" />,
    t: "피날레 디너",
  },
  {
    // 카메라
    icon: (
      <>
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    t: <b>전문 작가의 스냅 촬영</b>,
  },
  {
    // 방패
    icon: <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5" />,
    t: "여행자보험 전원 가입",
  },
  {
    // 호스트
    icon: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8M12 13l-1.5 3 1.5 1.5 1.5-1.5L12 13" />
      </>
    ),
    t: "전담 투어 리더 동행",
  },
];

type Review = { name: string; meta: string; rating: number; text: string };

/** 실제 후기 — 1기 진행 후 채움. 비어 있으면 "아직 후기가 없어요" 안내 */
const REVIEWS: Review[] = [];

/** 신청은 그로블 상품 페이지에서 결제 — 새 창으로 */
const APPLY_URL = "https://www.groble.im/products/nSdBPJ";

const avg = REVIEWS.length ? REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length : 0;

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export function TestTripDetail() {
  const { id = "" } = useParams();
  const trip = getTrip(id);
  const rooms = trip?.rooms;

  // 목록에서 카드 클릭으로 들어오면 이전 스크롤 위치가 남으므로 맨 위에서 시작
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!trip || !isBookable(trip) || !rooms?.length) {
    return (
      <div className="th th--v3 th--p1 td-root">
        <Nav solid />
        <div className="td-empty th-container">
          <p>준비 중인 트립입니다.</p>
          <Link to="/" className="th-pill th-pill--dark mt-6">
            모집 중인 트립 보기
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="th th--v3 th--p1 td-root">
      <Nav solid />
      <div className="th-container td-page">
        <div className={DETAIL_HERO[trip.id] ? "td-hero td-hero--banner" : "td-hero"}>
          <img src={DETAIL_HERO[trip.id] ?? `/images/${trip.heroImage}`} alt={`${trip.name} 대표 이미지`} />
        </div>

        {/* PC: [제목 | 카드] / [본문 | 카드]  ·  모바일: 제목 → 카드 → 본문 */}
        <div className="td-layout">
          <header className="td-head">
            <h1 className="td-head__title">{trip.name}</h1>
            <p className="td-head__sub">
              <span>{trip.duration}</span>
              <i aria-hidden />
              <span>{trip.destination}</span>
            </p>
          </header>

          <BookingCard rooms={rooms} deposit={trip.depositAmount ?? 0} />

          <main className="td-main">
            {/* 제공 사항 — 탭 위에 고정 노출 (solosholidays What's included) */}
            <section className="td-offer-sec" aria-labelledby="offer-title">
              <h2 id="offer-title" className="td-section__title">제공 사항</h2>
              <ul className="td-offers">
                {OFFERS.map((o, i) => (
                  <li key={i} className="td-offer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {o.icon}
                    </svg>
                    <p>
                      {o.t}
                      {o.sub && <small>{o.sub}</small>}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="td-note">※ 불포함: {trip.excluded.join(", ")}</p>
            </section>

            <SectionTabs />

            <Section id="info" title="기본 정보">
              <div className="td-info">
                <dl>
                  {[
                    ["여행 일정", `${trip.dates} ${trip.duration}`],
                    ["여행 도시", trip.destination],
                    ["집결 장소", "나리타 공항 터미널 2 1층 Central Gate | Info 부스 앞"],
                    ["집결 시간", "오전 11시 10분까지 (오전 10시 40분 이전 도착편 권장)"],
                    ["참가 인원", `최소 6명 ~ 최대 ${trip.capacity}명 선착순 모집`],
                    ["참가 나이", "20대 - 30대"],
                    ["참가 레벨", "랠리를 지속할 수 있고 준수한 수준의 서브 및 리턴을 구사할 수 있는 실력"],
                    ["항공권", "불포함 (개별 구매)"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="td-note">※ 모집은 인원이 차면 조기 마감될 수 있습니다.</p>
              </div>
            </Section>

            <Section id="detail" title="상세 설명">
              <DetailImages id={trip.id} />
            </Section>

            <Section id="reviews" title="후기">
              <div className="td-reviews__head">
                <Stars value={avg} />
                <strong>{REVIEWS.length ? avg.toFixed(1) : "0.0"}</strong>
                <span>후기 {REVIEWS.length}개</span>
              </div>
              {REVIEWS.length ? (
                <ul className="td-reviews">
                  {REVIEWS.map((r) => (
                    <li key={r.name} className="td-review">
                      <Stars value={r.rating} />
                      <p>{r.text}</p>
                      <span className="td-review__who">
                        <b>{r.name}</b> {r.meta}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="td-reviews__empty">아직 등록된 후기가 없어요.</p>
              )}
            </Section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 예약 카드 — 클투식 옵션 버튼. 총액 대신 "지금 결제 금액(예약금)"을 전면에 */
/* ---------------------------------------------------------------- */
function BookingCard({ rooms, deposit }: { rooms: TripRoom[]; deposit: number }) {
  // 기본은 미선택 — 선택 전에는 잔금 대신 안내 문구, 신청 버튼은 선택을 먼저 요구
  const [roomId, setRoomId] = useState<TripRoom["id"] | null>(null);
  const [needRoom, setNeedRoom] = useState(false);
  const room = rooms.find((r) => r.id === roomId);
  const extra = room ? room.price - rooms[0].price : 0;

  return (
    <aside className="td-book" aria-label="예약">
      <div className="td-book__card">
        <h2 className="td-book__h">옵션 선택</h2>
        <p className="td-book__warn">※ 객실 옵션은 잔금 결제 전까지 변경할 수 있어요.</p>

        <div className="td-opt">
          <span className="td-opt__label" id="opt-room">숙박 옵션</span>
          <div className="td-opt__btns" role="radiogroup" aria-labelledby="opt-room">
            {rooms.map((r) => (
              <button key={r.id} type="button" role="radio" aria-checked={r.id === roomId} disabled={r.disabled}
                className={r.id === roomId ? "is-active" : ""} onClick={() => {
                  setRoomId(r.id);
                  setNeedRoom(false);
                }}>
                {r.label}
              </button>
            ))}
          </div>
          {needRoom && <p className="td-opt__need">숙박 옵션을 선택해 주세요.</p>}
          {room && extra > 0 && (
            <p className="td-opt__extra">
              {room.label} : <b>+{won(extra)}</b>
            </p>
          )}
        </div>

        <div className="td-book__row td-book__row--rest">
          <span>잔금</span>
          {room ? (
            <strong>{won(room.price - deposit)}</strong>
          ) : (
            <span className="td-book__pending">옵션 선택 후 확인</span>
          )}
        </div>
        <p className="td-book__warn">※ 잔금은 트립 출발 확정 후에 결제합니다.</p>

        <div className="td-book__row td-book__row--now">
          <span>지금 결제 금액</span>
          <strong>{won(deposit)}</strong>
        </div>
        <div className="td-book__row td-book__row--sub">
          <span>예약금</span>
          <span>{won(deposit)}</span>
        </div>
        <p className="td-book__fine">※ 최소 인원 6명이 모이지 않으면 예약금은 100% 환불됩니다.</p>

        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="td-book__cta"
          onClick={(e) => {
            if (room) return;
            e.preventDefault();
            setNeedRoom(true);
          }}
        >
          지금 신청하기
        </a>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------------- */
/* 섹션 탭 — sticky 앵커 + 현재 섹션 하이라이트                          */
/* ---------------------------------------------------------------- */
function SectionTabs() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="td-tabs" aria-label="상세 섹션">
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} onClick={(e) => go(e, s.id)}
          className={active === s.id ? "is-active" : ""}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}

function Section(props: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={props.id} className="td-section">
      <h2 className="td-section__title">{props.title}</h2>
      {props.children}
    </section>
  );
}

/** 상세 설명 이미지 — 등록 전이면 세로로 긴 자리표시 */
function DetailImages({ id }: { id: string }) {
  const imgs = DETAIL_IMGS[id];
  if (!imgs?.length) {
    return (
      <div className="td-detail-ph">
        <span>상세 설명 이미지 (세로로 긴 1장)</span>
        <code>public/images/detail-{id}-*.webp</code>
      </div>
    );
  }
  return (
    <div>
      {imgs.map((img, i) => (
        <img key={img.src} className="td-detail-img" src={img.src} width={img.w} height={img.h}
          alt={i === 0 ? "트립 상세 설명" : ""} loading="lazy" />
      ))}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="td-stars" aria-label={`별점 ${value}점`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden className={value >= i + 0.75 ? "is-on" : ""}>
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}
