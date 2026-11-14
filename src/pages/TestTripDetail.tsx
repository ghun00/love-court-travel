import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getTrip, isBookable, type OfferIcon, type Trip, type TripDetail, type TripRoom } from "../data/trips";
import { COMPANY, GUARANTEES, SAFETY_URL } from "../data/company";
import { FaqGroups, Footer, Nav } from "./TestPage1";
import "../styles/test-home.css";
import "../styles/test-home3.css";
import "../styles/test-page1.css";
import "../styles/test-trip-detail.css";
import "../styles/legal.css";

/**
 * /trips/:id — 트립 상세 (test-page1 스킨)
 * - 클투: 상단 가로 대표 이미지 → 좌 제목·본문 / 우 sticky 예약 카드
 * - 강조 타이포(Vitro Core) 없이 산세리프 + 흰 배경 + 회색 정보 박스로 담백하게
 * - 모바일: 이미지 → 제목 → 본문. 예약 카드는 하단 고정 바 "신청하기" → 아래에서 올라오는 옵션 창(2단계)
 * - 제공 사항 아래: 세로(9:16) 영상 3개 — 누르면 그 자리에서 재생
 * - 본문: 제공 사항(solosholidays What's included) → 기본 정보 박스 → 상세 이미지 1장 → 후기 → FAQ(홈과 동일)
 */

/** 제공 사항 아이콘 (24×24 stroke) — trips.ts의 offers[].icon 키로 선택 */
const OFFER_ICONS: Record<OfferIcon, ReactNode> = {
  bus: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 18v3M16 18v3M8 14.5h.01M16 14.5h.01" />
    </>
  ),
  hotel: <path d="M3 20V9l9-5 9 5v11M3 20h18M9 20v-5h6v5M8 11h.01M12 11h.01M16 11h.01" />,
  onsen: (
    <>
      <path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4M16 3c-1 1.5 1 2.5 0 4" />
      <path d="M3 13c0 4 4 7 9 7s9-3 9-7c0-1-.6-1.5-1.5-1.5h-15C3.6 11.5 3 12 3 13z" />
    </>
  ),
  pool: (
    <path d="M3 17c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M3 21c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 8h8M8 12h8" />
  ),
  court: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M12 5v14M3 9h18M3 15h18M7 9v6M17 9v6" />
    </>
  ),
  coach: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M5.5 5.5l7 7M12.5 5.5l-7 7M13 13l7 7" />
      <circle cx="19" cy="5" r="2" />
    </>
  ),
  breakfast: <path d="M4 10h13v3a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-3zM17 11h1.5a2.5 2.5 0 0 1 0 5H16M8 3v4M12 3v4" />,
  drink: <path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3zM12 14v7M8 21h8M7.5 7h9" />,
  dinner: <path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 8h3" />,
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  shield: <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5" />,
  host: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8M12 13l-1.5 3 1.5 1.5 1.5-1.5L12 13" />
    </>
  ),
};

/**
 * 세로 영상(9:16) — src/assets/reels/<트립 id>/ 폴더에 넣으면 자동으로 노출
 * - 영상: 파일명 순서대로 (01.mp4, 02.mp4 …)
 * - 표지: 같은 이름의 이미지(01.jpg / 01.webp …)가 있으면 사용, 없으면 영상 첫 프레임
 */
type Reel = { poster?: string; src?: string };
const REEL_FILES = import.meta.glob("../assets/reels/*/*.{mp4,webm,jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function reelsFor(trip: Trip): Reel[] {
  const dir = `../assets/reels/${trip.id}/`;
  const files = Object.keys(REEL_FILES).filter((k) => k.startsWith(dir));
  const base = (k: string) => k.slice(dir.length).replace(/\.[^.]+$/, "");
  const videos = files.filter((k) => /\.(mp4|webm)$/i.test(k)).sort();
  if (videos.length) {
    return videos.map((v) => {
      const poster = files.find((k) => k !== v && base(k) === base(v));
      return { src: REEL_FILES[v], poster: poster && REEL_FILES[poster] };
    });
  }
  return (trip.detail?.reelPlaceholders ?? []).map((poster) => ({ poster }));
}

const SECTIONS = [
  { id: "info", label: "기본 정보" },
  { id: "detail", label: "상세 설명" },
  { id: "reviews", label: "후기" },
  { id: "trip-faq", label: "FAQ" },
  { id: "terms", label: "예약 안내" },
] as const;

type Review = { name: string; meta: string; rating: number; text: string };

/** 실제 후기 — 1기 진행 후 채움. 비어 있으면 "아직 후기가 없어요" 안내 */
const REVIEWS: Review[] = [];

const avg = REVIEWS.length ? REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length : 0;

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

/** 정가 대비 할인율 (%) — 소수점 버림 */
const discountRate = (r: TripRoom) =>
  r.listPrice ? Math.floor(((r.listPrice - r.price) / r.listPrice) * 100) : 0;

/** 1인 상품가 — 할인 중이면 [라벨 · 정가 취소선] → [할인율 · 할인가] */
function PriceTag({ room, badge }: { room: TripRoom; badge?: string }) {
  const sale = !!room.listPrice && room.listPrice > room.price;
  return (
    <div className="td-price">
      {sale && (
        <p className="td-price__was">
          {badge && <em>{badge}</em>}
          <s aria-label={`정가 ${won(room.listPrice!)}`}>{won(room.listPrice!)}</s>
        </p>
      )}
      <p className="td-price__now">
        {sale && <i>{discountRate(room)}%</i>}
        <strong>{won(room.price)}</strong>
      </p>
      <p className="td-price__note">1인 · {room.label} 기준 · 항공권 별도</p>
    </div>
  );
}

export function TestTripDetail() {
  const { id = "" } = useParams();
  const trip = getTrip(id);
  const rooms = trip?.rooms;

  // 모바일: 하단 "신청하기" → 옵션 창(바텀 시트) 열림 여부
  const [sheetOpen, setSheetOpen] = useState(false);

  // 목록에서 카드 클릭으로 들어오면 이전 스크롤 위치가 남으므로 맨 위에서 시작
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSheetOpen(false);
  }, [id]);

  // 옵션 창이 열려 있는 동안: 뒤 화면 스크롤 잠금 · Esc로 닫기 · PC 폭으로 넓어지면 닫기
  useEffect(() => {
    if (!sheetOpen) return;
    const close = () => setSheetOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const wide = window.matchMedia("(min-width: 900px)");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
    };
  }, [sheetOpen]);

  const detail = trip?.detail;

  if (!trip || !isBookable(trip) || !rooms?.length || !detail) {
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
        {detail.cover ? (
          <TripCover cover={detail.cover} />
        ) : (
          <div className={detail.hero.banner ? "td-hero td-hero--banner" : "td-hero"}>
            <img src={detail.hero.src} alt={`${trip.name} 대표 이미지`} />
          </div>
        )}

        {/* PC: [제목 | 카드] / [본문 | 카드]  ·  모바일: 제목 → 카드 → 본문
            코드 대표 영역(cover)이면 제목이 그 안에 있으므로 별도 제목 줄은 생략 */}
        <div className={detail.cover ? "td-layout td-layout--cover" : "td-layout"}>
          {!detail.cover && (
            <header className="td-head">
              <h1 className="td-head__title">{trip.name}</h1>
              <p className="td-head__sub">
                <span>{trip.duration}</span>
                <i aria-hidden />
                <span>{trip.destination}</span>
              </p>
            </header>
          )}

          <BookingCard
            key={trip.id}
            rooms={rooms}
            badge={trip.priceBadge}
            applyUrl={detail.applyUrl}
            deposit={trip.depositAmount ?? 0}
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
          />

          <main className="td-main">
            {/* Highlight — 제목 바로 아래 세로 영상 캐러셀 (PC에서도 예약 카드가 첫 화면에 남도록 본문 맨 위) */}
            <Reels key={trip.id} reels={reelsFor(trip)} />

            {/* 제공 사항 — 탭 위에 고정 노출 (solosholidays What's included) */}
            <section className="td-offer-sec" aria-labelledby="offer-title">
              <h2 id="offer-title" className="td-section__title">제공 사항</h2>
              <ul className="td-offers">
                {detail.offers.map((o, i) => (
                  <li key={i} className="td-offer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {OFFER_ICONS[o.icon]}
                    </svg>
                    <p>
                      {o.text}
                      {o.em && <b>{o.em}</b>}
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
                <InfoList rows={detail.info} />
                <p className="td-note">※ 모집은 인원이 차면 조기 마감될 수 있습니다.</p>
              </div>
            </Section>

            <Section id="detail" title="상세 설명">
              <DetailImages images={detail.images} />
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

            <Section id="trip-faq" title="자주 묻는 질문">
              <div className="td-faq">
                <FaqGroups />
              </div>
            </Section>

            <Section id="terms" title="예약 안내">
              <TripNotice trip={trip} />
            </Section>
          </main>
        </div>
      </div>
      <Footer />

      {/* 모바일 전용 — 하단 고정 신청 바 + 옵션 창 뒤 어두운 배경 (PC에서는 CSS로 숨김) */}
      <div className={sheetOpen ? "td-dim is-open" : "td-dim"} onClick={() => setSheetOpen(false)} aria-hidden />
      <div className="td-bar">
        {/* 할인가는 "신청하기" → 옵션 창에서 옵션을 고르면 노출. 바에는 지금 낼 금액(예약금)만 */}
        <div className="td-bar__price">
          <p>
            <small>예약금</small>
            <b>{won(trip.depositAmount ?? 0)}</b>
          </p>
          <span>잔금은 출발 확정 후 결제합니다</span>
        </div>
        <button type="button" className="td-bar__btn" aria-haspopup="dialog" aria-expanded={sheetOpen}
          onClick={() => setSheetOpen(true)}>
          신청하기
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 대표 영역 — 배경 사진 교차 + HTML 타이틀 (모바일 4:5 풀폭, PC 가로형)     */
/* ---------------------------------------------------------------- */
const COVER_INTERVAL = 5000;

function TripCover({ cover }: { cover: NonNullable<TripDetail["cover"]> }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (cover.slides.length < 2) return;
    // 움직임 줄이기 설정이면 첫 장만 고정
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % cover.slides.length), COVER_INTERVAL);
    return () => window.clearInterval(t);
  }, [cover.slides.length]);

  return (
    <div className="td-cover">
      {cover.slides.map((src, i) => (
        <img key={src} src={src} alt="" className={i === active ? "is-active" : ""}
          loading={i === 0 ? "eager" : "lazy"} />
      ))}
      <div className="td-cover__text">
        <p className="td-cover__eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zm0-9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
          {cover.eyebrow}
        </p>
        <h1 className="td-cover__title">
          {cover.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="td-cover__sub">{cover.sub}</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 세로 영상 — 누르면 그 자리에서 재생, 다른 영상은 멈춤                    */
/* ---------------------------------------------------------------- */
function Reels({ reels }: { reels: Reel[] }) {
  // 크게 보기(팝업)로 열린 영상 번호 + 확대가 시작될 카드 위치
  const [open, setOpen] = useState<{ index: number; origin: string } | null>(null);
  const track = useRef<HTMLUListElement>(null);
  if (!reels?.length) return null;

  // PC 화살표 — 카드 한 장(+간격)씩 이동
  const slide = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: "smooth" });
  };

  const show = (index: number, e: MouseEvent<HTMLButtonElement>) => {
    // 누른 카드 중심에서 팝업이 커져 나오도록 transform-origin 지정
    // (팝업은 화면 정중앙에 고정 크기로 뜨므로, 화면 중앙 대비 카드 중심의 차이만큼 이동)
    const r = e.currentTarget.getBoundingClientRect();
    const dx = r.left + r.width / 2 - window.innerWidth / 2;
    const dy = r.top + r.height / 2 - window.innerHeight / 2;
    setOpen({ index, origin: `calc(50% + ${dx}px) calc(50% + ${dy}px)` });
  };

  const playable = reels.some((r) => r.src);

  return (
    <section className="td-hl" aria-labelledby="hl-title">
      <div className="td-hl__head">
        <h2 id="hl-title" className="td-hl__title">Highlight</h2>
        {reels.length > 3 && (
          <div className="td-hl__nav">
            <button type="button" aria-label="이전 영상" onClick={() => slide(-1)}>
              <svg viewBox="0 0 20 20" aria-hidden><path d="M12.5 4.5L7 10l5.5 5.5" /></svg>
            </button>
            <button type="button" aria-label="다음 영상" onClick={() => slide(1)}>
              <svg viewBox="0 0 20 20" aria-hidden><path d="M7.5 4.5L13 10l-5.5 5.5" /></svg>
            </button>
          </div>
        )}
      </div>
      <ul ref={track} className="td-reels" aria-label="트립 하이라이트 영상">
        {reels.map((r, i) => (
          <li key={r.src ?? r.poster} className="td-reel">
            {r.poster ? (
              <img src={r.poster} alt="" loading="lazy" />
            ) : (
              // 표지가 없으면 첫 프레임(#t=0.1)을 표지로
              <video src={`${r.src}#t=0.1`} muted playsInline preload="metadata" />
            )}
            {r.src && (
              <button type="button" className="td-reel__btn" aria-haspopup="dialog"
                aria-label={`하이라이트 영상 ${i + 1} 크게 보기`} onClick={(e) => show(i, e)}>
                <span aria-hidden />
              </button>
            )}
          </li>
        ))}
      </ul>
      {open && playable && (
        <ReelViewer reels={reels.filter((r) => r.src)} start={reels.slice(0, open.index).filter((r) => r.src).length}
          origin={open.origin} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}

/** 하이라이트 영상 크게 보기 — 카드에서 커져 나오는 팝업, 소리 켜고 자동 재생 */
function ReelViewer({ reels, start, origin, onClose }: {
  reels: Reel[];
  start: number;
  /** 확대 애니메이션 시작점 (화면 좌표) */
  origin: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(start);
  const [closing, setClosing] = useState(false);
  // 영상 실제 가로/세로 비율 — 4:5 영상도 검은 여백 없이 맞춤 (불러오기 전엔 9:16)
  const [ratio, setRatio] = useState(9 / 16);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const reel = reels[index];
  const many = reels.length > 1;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + reels.length) % reels.length);
  // 닫힐 때도 카드 쪽으로 줄어들며 사라지게 — 애니메이션 끝난 뒤 언마운트
  const close = () => setClosing(true);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setClosing(true);
      else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % reels.length);
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + reels.length) % reels.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
  }, [reels.length]);

  return (
    <div className={closing ? "td-viewer is-closing" : "td-viewer"} role="dialog" aria-modal="true"
      aria-label={`하이라이트 영상 ${index + 1} / ${reels.length}`}
      onAnimationEnd={(e) => closing && e.target === e.currentTarget && onClose()}
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null || !many) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}>
      <div className="td-viewer__stage" style={{ transformOrigin: origin, "--ar": ratio } as CSSProperties}>
        <video key={reel.src} src={reel.src} poster={reel.poster} autoPlay playsInline controls
          controlsList="nodownload noplaybackrate" disablePictureInPicture
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
          }}
          onEnded={() => many && go(1)} />
      </div>
      <button ref={closeBtn} type="button" className="td-viewer__close" aria-label="닫기" onClick={close}>
        <svg viewBox="0 0 20 20" aria-hidden><path d="M5 5l10 10M15 5L5 15" /></svg>
      </button>
      {many && (
        <>
          <button type="button" className="td-viewer__arrow td-viewer__arrow--prev" aria-label="이전 영상" onClick={() => go(-1)}>
            <svg viewBox="0 0 20 20" aria-hidden><path d="M12.5 4.5L7 10l5.5 5.5" /></svg>
          </button>
          <button type="button" className="td-viewer__arrow td-viewer__arrow--next" aria-label="다음 영상" onClick={() => go(1)}>
            <svg viewBox="0 0 20 20" aria-hidden><path d="M7.5 4.5L13 10l-5.5 5.5" /></svg>
          </button>
          <p className="td-viewer__count" aria-hidden>{index + 1} / {reels.length}</p>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 예약 카드 — 클투식 옵션 버튼. 총액 대신 "지금 결제 금액(예약금)"을 전면에 */
/* ---------------------------------------------------------------- */
function BookingCard({ rooms, badge, applyUrl, deposit, open, onClose }: {
  rooms: TripRoom[];
  badge?: string;
  /** 결제 페이지 — 없으면 신청 버튼 잠금 (오픈 예정) */
  applyUrl?: string;
  deposit: number;
  /** 모바일 옵션 창 열림 여부 — PC에서는 항상 보이므로 영향 없음 */
  open: boolean;
  onClose: () => void;
}) {
  // 기본은 미선택 — 선택 전에는 잔금 대신 안내 문구, 신청 버튼은 선택을 먼저 요구
  const [roomId, setRoomId] = useState<TripRoom["id"] | null>(null);
  const [needRoom, setNeedRoom] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [needAgree, setNeedAgree] = useState(false);
  const room = rooms.find((r) => r.id === roomId);
  const extra = room ? room.price - rooms[0].price : 0;

  return (
    <aside className={open ? "td-book is-open" : "td-book"} aria-label="예약">
      <div className="td-book__card">
        <button type="button" className="td-book__close" aria-label="옵션 선택 닫기" onClick={onClose}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
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
          {/* 옵션을 고르면 그 옵션의 1인 상품가(할인 전·후)가 아래에 나타남 */}
          {room && <PriceTag key={room.id} room={room} badge={badge} />}
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

        <label className="td-agree">
          <input type="checkbox" checked={agreed} onChange={(e) => {
            setAgreed(e.target.checked);
            setNeedAgree(false);
          }} />
          <span>
            (필수) <Link to="/legal/travel-terms" target="_blank">여행이용약관·러브코트 특약</Link>과{" "}
            <Link to="/legal/refund" target="_blank">취소·환불 규정</Link>을 확인했으며 동의합니다.
          </span>
        </label>
        {needAgree && <p className="td-opt__need">약관과 취소·환불 규정에 동의해 주세요.</p>}

        {!applyUrl ? (
          <button type="button" className="td-book__cta" disabled>
            신청 오픈 예정
          </button>
        ) : (
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="td-book__cta"
          onClick={(e) => {
            if (room && agreed) return;
            e.preventDefault();
            setNeedRoom(!room);
            setNeedAgree(!agreed);
          }}
        >
          지금 신청하기
        </a>
        )}
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------------- */
/* 예약 안내 — 관광진흥법 시행규칙 제21조 기획여행 광고 표시사항              */
/* ---------------------------------------------------------------- */
function TripNotice({ trip }: { trip: Trip }) {
  const g = GUARANTEES.planned;
  const rows: [string, ReactNode][] = [
    ["여행사", `${COMPANY.name} (${COMPANY.brand}) · ${COMPANY.address}`],
    [
      "여행업 등록",
      <>
        {COMPANY.tourRegNo} · 등록관청 {COMPANY.tourRegOffice}
      </>,
    ],
    ["여행일정·주요 여행지", `${trip.dates} ${trip.duration} · ${trip.destination} (상세 일정은 상세 설명 참고)`],
    ["여행경비", `${trip.totalPrice} · 1인 기준, 2인 1실`],
    ["포함 내역", trip.detail?.includedSummary ?? ""],
    ["불포함 내역", `${trip.excluded.join(", ")}, 일정표에 없는 식사`],
    ["최저 출발인원", "6명 (여행 개시 21일 전 판단, 미달 시 전액 환불)"],
    [
      "일정 변경",
      "일정을 변경해야 할 때는 해당 일정 시작 전 변경 내용과 비용을 알리고 여행자의 서면(카카오톡·문자 포함) 동의를 받습니다. 긴급한 경우 사후에 설명합니다.",
    ],
    [
      "여행경보",
      <>
        출발 전 외교부 해외안전여행에서 여행지의 최신 여행경보 단계를 확인해 주세요 ·{" "}
        <a href={SAFETY_URL} target="_blank" rel="noopener noreferrer" className="lg-link">
          해외안전여행 바로가기
        </a>
      </>,
    ],
    [
      "보증보험",
      <>
        {g.insurer} 기획여행 보증보험 {g.amount} 가입 ·{" "}
        <Link to="/legal/insurance" className="lg-link">
          가입 내역
        </Link>
      </>,
    ],
  ];

  return (
    <div className="td-info td-info--wide">
      <InfoList rows={rows} />
      <p className="td-note">
        ※ 출발 확정(잔금 결제) 이후 취소 시 특별약관에 따른 취소 수수료가 적용되며 청약철회가 제한됩니다.{" "}
        <Link to="/legal/refund" className="lg-link">
          취소·환불 규정 전체 보기
        </Link>
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 섹션 탭 — sticky 앵커 + 현재 섹션 하이라이트                          */
/* ---------------------------------------------------------------- */
function SectionTabs() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    // 콜백에는 "바뀐" 섹션만 들어오므로, 현재 걸쳐 있는 섹션을 따로 기억해 두고
    // 그중 가장 위(먼저 나오는) 섹션을 활성으로 — 짧은 섹션(후기)을 지나도 탭이 따라오게
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        const hit = SECTIONS.find((s) => visible.has(s.id));
        if (hit) setActive(hit.id);
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

/** 상세 설명 이미지 — 세로로 긴 원본을 잘라 순서대로 이어 붙임 */
function DetailImages({ images }: { images: TripDetail["images"] }) {
  return (
    <div>
      {images.map((img, i) => (
        <img key={img.src} className="td-detail-img" src={img.src} width={img.w} height={img.h}
          alt={i === 0 ? "트립 상세 설명" : ""} loading="lazy" decoding="async" />
      ))}
    </div>
  );
}

/** 회색 정보 박스의 [항목, 내용] 목록 — 기본 정보·예약 안내 공용 */
function InfoList({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl>
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
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
