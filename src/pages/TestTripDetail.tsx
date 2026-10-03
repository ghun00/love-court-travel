import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getTrip, type TripRoom } from "../data/trips";
import { Footer, Nav } from "./TestPage1";
import "../styles/test-home.css";
import "../styles/test-home3.css";
import "../styles/test-page1.css";
import "../styles/test-trip-detail.css";

/**
 * /test-page1/trips/:id — 트립 상세 (test-page1 스킨)
 * - 클투: 상단 가로 대표 이미지 → 좌 제목·본문 / 우 sticky 예약 카드
 * - 강조 타이포(Vitro Core) 없이 산세리프 + 흰 배경 + 회색 정보 박스로 담백하게
 * - 모바일: 이미지 → 제목 → 예약 카드 → 본문 (grid-area로 배치)
 * - 본문: 제공 사항(solosholidays What's included) → 기본 정보 박스 → 상세 이미지 1장 → 후기
 */

const DETAIL_IMG = (id: string) => `/images/detail-${id}.png`;

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

const REVIEWS = [
  { name: "지윤", meta: "30대 · 혼자 참여", rating: 5, text: "혼자 가는 게 제일 걱정이었는데 첫날 랠리 한 번에 다 풀렸어요. 코트 뷰는 사진보다 실물이 훨씬 좋아요." },
  { name: "현우", meta: "30대 · 친구와 참여", rating: 5, text: "코트 예약, 이동, 식사를 하나도 신경 안 썼어요. 테니스만 치다 왔는데 스냅 사진까지 남았습니다." },
  { name: "소영", meta: "20대 · 혼자 참여", rating: 5, text: "실력 비슷한 사람들끼리 묶어 줘서 게임이 정말 재밌었어요. 다음 기수도 바로 신청하려고요." },
  { name: "민재", meta: "40대 · 혼자 참여", rating: 4, text: "온천하고 테니스 조합이 최고였어요. 일정이 조금만 더 길었으면 좋겠다는 게 유일한 아쉬움." },
];

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export function TestTripDetail() {
  const { id = "" } = useParams();
  const trip = getTrip(id);
  const rooms = trip?.rooms;

  // 목록에서 카드 클릭으로 들어오면 이전 스크롤 위치가 남으므로 맨 위에서 시작
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!trip || trip.status !== "open" || !rooms?.length) {
    return (
      <div className="th th--v3 th--p1 td-root">
        <Nav solid />
        <div className="td-empty th-container">
          <p>준비 중인 트립입니다.</p>
          <Link to="/test-page1" className="th-pill th-pill--dark mt-6">
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
        <div className="td-hero">
          <img src={`/images/${trip.heroImage}`} alt={`${trip.destination} 트립 대표 이미지`} />
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

          <BookingCard tripId={trip.id} rooms={rooms} deposit={trip.depositAmount ?? 0} />

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
              <DetailImage src={DETAIL_IMG(trip.id)} />
            </Section>

            <Section id="reviews" title="후기">
              <div className="td-reviews__head">
                <Stars value={4.8} />
                <strong>4.8</strong>
                <span>예시 후기 · 1기 이후 실제 후기로 교체</span>
              </div>
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
function BookingCard({ tripId, rooms, deposit }: { tripId: string; rooms: TripRoom[]; deposit: number }) {
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

        <Link
          to={room ? `/test/trips/${tripId}/book?room=${room.id}` : "#"}
          className="td-book__cta"
          onClick={(e) => {
            if (room) return;
            e.preventDefault();
            setNeedRoom(true);
          }}
        >
          지금 신청하기
        </Link>
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

/** 상세 설명 이미지 1장 — 파일이 아직 없으면 세로로 긴 자리표시 */
function DetailImage({ src }: { src: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return (
      <div className="td-detail-ph">
        <span>상세 설명 이미지 (세로로 긴 1장)</span>
        <code>public{src}</code>
      </div>
    );
  }
  return <img className="td-detail-img" src={src} alt="트립 상세 설명" loading="lazy" onError={() => setMissing(true)} />;
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
