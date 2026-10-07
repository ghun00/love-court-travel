import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import "../styles/test-home.css";
import "../styles/test-home3.css";
import "../styles/test-page1.css";

/**
 * /test-page1 — 클투(cltoo.com) 스토어프런트 구조 + /test-home3 스킨
 * - 히어로(test-home3 카피 유지 + NOW OPEN 배너) → 가치 섹션(히어로 바로 아래)
 *   → 모집 중인 트립 3카드 → FAQ → 푸터
 * - Nav / Hero 배경 / Footer는 TestHome3에서 복사 (세 테스트 페이지 모두 비교용 시안)
 */

const IMG = {
  heroBg: "/images/hero-hakone.png",
};

const TRIPS_ANCHOR = "#trips";

/** 앵커 클릭 시 부드럽게 스크롤 (고정 네비 높이는 scroll-margin-top으로 보정) */
function scrollToAnchor(e: MouseEvent<HTMLAnchorElement>) {
  const id = e.currentTarget.getAttribute("href")?.slice(1);
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

type TripCard = {
  id: string;
  status: "open" | "coming";
  place: string;
  name: string;
  dates: string;
  price?: string;
  priceNote?: string;
  img: string;
  to?: string;
};

const TRIP_CARDS: TripCard[] = [
  {
    id: "hakone",
    status: "open",
    place: "일본 하코네",
    name: "하코네 테니스 트립 1기",
    dates: "2026.10.17 – 19 (2박 3일)",
    price: "얼리버드 149만 원",
    priceNote: "정가 169만 원, 항공권 별도",
    img: "/images/poster-hakone-1.png",
    to: "/test-page1/trips/hakone",
  },
  {
    id: "bali",
    status: "coming",
    place: "인도네시아 발리",
    name: "발리 테니스 트립",
    dates: "일정 준비 중",
    img: "/images/poster-bali.png",
  },
  {
    id: "vietnam",
    status: "coming",
    place: "베트남",
    name: "베트남 테니스 트립",
    dates: "일정 준비 중",
    img: "/images/poster-danang.png",
  },
];

export function TestPage1() {
  // 상세 페이지 네비에서 /test-page1#trips 로 들어온 경우 해당 섹션으로 이동
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <div className="th th--v3 th--p1">
      <Hero />
      <Values />
      <Trips />
      <Faq />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 1. 네비 + 히어로 (+ NOW OPEN 배너)                                  */
/* ---------------------------------------------------------------- */
/** solid: 히어로가 없는 페이지(트립 상세 등)에서 처음부터 흰 배경으로 고정 */
export function Nav({ solid = false }: { solid?: boolean }) {
  // 상세 페이지에서는 앵커가 없으므로 /test-page1로 이동 후 해당 섹션으로
  const base = solid ? "/test-page1" : "";
  const items: [string, string][] = [
    ["홈", solid ? "/test-page1" : "#"],
    ["테니스 트립", `${base}#trips`],
    ["FAQ", `${base}#faq`],
  ];
  const [scrolledState, setScrolled] = useState(false);
  const scrolled = solid || scrolledState;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`th-navbar ${scrolled ? "th-navbar--scrolled" : "th-navbar--top"}`}>
      <div className="th-container flex items-center justify-between py-4">
        <a href={solid ? "/test-page1" : "#"} className="th-navbar__logo" aria-label="러브코트 홈">
          <img src={scrolled ? "/logo_lovecourt_mainOrange.png" : "/logo_lovecourt_white.png"} alt="LOVE COURT" />
        </a>
        <nav className="p1-nav hidden md:flex">
          {items.map(([label, href], i) => (
            <a
              key={label}
              href={href}
              onClick={href.startsWith("#") && href !== "#" ? scrollToAnchor : undefined}
              className={`p1-nav__link ${i === (solid ? 1 : 0) ? "p1-nav__link--active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="th-hero p1-hero">
      <div className="th-hero__bg" style={{ backgroundImage: `url(${IMG.heroBg})` }} />
      <Nav />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-5 text-center p1-hero__body">
        <h1 className="th-serif th-hero__title">
          혼자 오라고 만든
          <br />
          해외 테니스 트립
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/85 md:max-w-xl md:text-lg">
          해외의 좋은 코트에서 치고, 혼자 온 사람들과 친구가 되고, 그 순간을 사진으로 가져가요.
          라켓만 챙기세요. 나머지는 러브코트가 준비할게요.
        </p>

        <a href={TRIPS_ANCHOR} onClick={scrollToAnchor} className="th-pill mt-8">
          모집중 트립 보기
        </a>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. 가치 섹션 — 히어로 바로 아래 독립 섹션, 아이콘 + 제목 + 한 문장 4칸 */
/* ---------------------------------------------------------------- */
const ICON_PROPS = {
  width: 44,
  height: 44,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const VALUE_ICONS = {
  // 위에서 본 테니스 코트
  court: (
    <svg {...ICON_PROPS}>
      <rect x="8" y="6" width="32" height="36" rx="1.5" />
      <path d="M13 6v36M35 6v36M8 24h32M13 15h22M13 33h22M24 15v18" />
    </svg>
  ),
  // 전용 차량
  move: (
    <svg {...ICON_PROPS}>
      <path d="M6 32V16a3 3 0 0 1 3-3h22l8 8h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M6 32a2 2 0 0 0 2 2h3M19 34h10" />
      <path d="M6 21h33M18 13v8M29 13v8" />
      <circle cx="15" cy="34" r="3.5" />
      <circle cx="33" cy="34" r="3.5" />
    </svg>
  ),
  // 한 기수로 모이는 사람들
  connect: (
    <svg {...ICON_PROPS}>
      <circle cx="24" cy="16" r="5" />
      <path d="M15 38v-3a9 9 0 0 1 18 0v3" />
      <circle cx="11" cy="20" r="3.5" />
      <path d="M4 36v-2a7 7 0 0 1 9-6.7" />
      <circle cx="37" cy="20" r="3.5" />
      <path d="M44 36v-2a7 7 0 0 0-9-6.7" />
    </svg>
  ),
  // 스냅 카메라
  remember: (
    <svg {...ICON_PROPS}>
      <path d="M6 17a3 3 0 0 1 3-3h6l3-4h12l3 4h6a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" />
      <circle cx="24" cy="25" r="7" />
      <path d="M36 19h1" />
    </svg>
  ),
};

function Values() {
  const values: { k: keyof typeof VALUE_ICONS; label: string; t: string; d: string }[] = [
    {
      k: "court",
      label: "Court",
      t: "좋은 코트, 확정된 시간",
      d: "코트 전용 대관이 확정된 트립만 모집해요. 도착하면 라켓만 꺼내세요.",
    },
    {
      k: "move",
      label: "Move",
      t: "귀찮은 건 전부 러브코트가",
      d: "공항 집결부터 차량, 숙소, 식사까지 모두 준비할게요. 여러분은 라켓만 들고 오세요.",
    },
    {
      k: "connect",
      label: "Connect",
      t: "혼자 와도 괜찮은 여행",
      d: "실력 및 조건이 맞는 분들과 함께 여행을 떠나요. 혼자 와서 함께가 될 수 있어요.",
    },
    {
      k: "remember",
      label: "Remember",
      t: "그 장면 속의 나를 남겨요",
      d: "전문 스포츠 스냅 작가가 동행해요. 여러분의 ‘테생샷’을 책임질게요.",
    },
  ];
  return (
    <section className="p1-values" aria-labelledby="p1-values-title">
      <div className="th-container">
        <h2 id="p1-values-title" className="th-serif p1-values__title">
          왜 러브코트 트립인가요?
        </h2>
        <div className="p1-values__grid">
          {values.map((v) => (
            <div className="p1-values__item" key={v.k}>
              <span className="p1-values__icon">{VALUE_ICONS[v.k]}</span>
              <span className="p1-values__k">{v.label}</span>
              <h3 className="th-serif p1-values__t">{v.t}</h3>
              <p className="p1-values__d">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. 모집 중인 테니스 트립 — 클투 패키지 행                             */
/* ---------------------------------------------------------------- */
function Trips() {
  return (
    <section id="trips" className="relative overflow-hidden py-20 md:py-28">
      <div className="th-glow" />
      <div className="th-container relative">
        <div className="p1-row-head">
          <h2 className="th-serif p1-row-head__title">모집 중인 테니스 트립</h2>
        </div>

        <ul className="p1-cards">
          {TRIP_CARDS.map((t) => (
            <li key={t.id}>
              <TripCardView trip={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TripCardView({ trip }: { trip: TripCard }) {
  const open = trip.status === "open";
  const body = (
    <>
      <div className={`p1-card__photo ${open ? "" : "is-coming"}`}>
        <img src={trip.img} alt="" loading="lazy" />
        <span className={`p1-badge ${open ? "p1-badge--open" : "p1-badge--coming"}`}>
          {open ? "모집 중" : "준비 중"}
        </span>
      </div>
    </>
  );

  return open && trip.to ? (
    <Link to={trip.to} className="p1-card p1-card--open" aria-label={`${trip.name} 상세보기`}>
      {body}
    </Link>
  ) : (
    <article className="p1-card">{body}</article>
  );
}

/* ---------------------------------------------------------------- */
/* 4. FAQ — 예약 직전 불안 4가지                                        */
/* ---------------------------------------------------------------- */
function Faq() {
  const groups = [
    {
      title: "참가 관련",
      items: [
        {
          q: "정말 혼자 가도 괜찮을까요?",
          a: "그럼요! 러브코트는 혼자 오는 분들을 위해 만든 트립이에요. 참가자 대부분이 혼자 오기 때문에, 낯선 무리에 혼자 끼는 기분은 걱정하지 않으셔도 돼요. 출국 전 단톡방과 사전 모임에서 미리 인사를 나누니까, 떠나는 날엔 이미 아는 얼굴들과 함께해요.",
        },
        {
          q: "참가 연령대가 정해져 있나요?",
          a: "네, 트립마다 참가 연령대를 정해두고 있어요. 각 트립 상세페이지에서 확인해 주세요.",
        },
        {
          q: "참가자 성비는 어떻게 되나요?",
          a: "성비는 기수와 트립마다 달라요. 트립별 구성이 궁금하시면 편하게 문의해 주세요.",
        },
        {
          q: "친구나 연인과 함께 신청할 수 있나요?",
          a: "친구와 함께라면 신청할 수 있어요! 다만 커플 신청은 아쉽지만 받지 않고 있어요. 혼자 온 분들이 중심이 되는 트립이기 때문이에요.",
        },
        {
          q: "테니스 실력이 어느 정도여야 하나요?",
          a: "트립마다 권장 실력을 '입문 / 랠리 가능 / 게임 가능'으로 나눠 상세페이지에 안내하고 있어요. 내 실력이 어디에 해당하는지 애매하다면 신청 전에 편하게 물어봐 주세요.",
        },
      ],
    },
    {
      title: "예약 · 결제",
      items: [
        {
          q: "예약금은 얼마인가요?",
          a: "예약금은 30만 원이에요. 자리는 선착순으로 마감되니, 마음이 정해졌다면 빠르게 신청해 주세요.",
        },
        {
          q: "최소 출발 인원이 있나요?",
          a: "최소 출발 인원은 기수마다 달라요. 신청 전에 각 트립 상세페이지에서 꼭 확인해 주세요.",
        },
        {
          q: "항공권은 언제 사면 되나요?",
          a: "트립 진행이 확정되고 잔금 결제를 마친 뒤에 구매해 주세요. 예약금 결제 단계에서는 항공권을 사지 않으셔도 돼요.",
        },
        {
          q: "취소하면 환불받을 수 있나요?",
          a: "취소 시점에 따른 환불 규정이 있어요. 예약금 결제 화면, 각 트립 상세페이지, 그리고 페이지 하단의 이용약관에서 확인할 수 있어요.",
        },
      ],
    },
    {
      title: "트립 진행",
      items: [
        {
          q: "숙소는 어떻게 배정되나요?",
          a: "기본은 2인 1실이에요. 트립에 따라 1인실 업그레이드 옵션이 있는 경우도 있으니, 상세페이지에서 확인해 주세요.",
        },
        {
          q: "레슨이나 코칭도 받을 수 있나요?",
          a: "레슨과 코칭 포함 여부는 트립마다 달라요. 상세페이지의 포함 사항에서 확인해 주세요.",
        },
        {
          q: "장비는 무엇을 챙겨야 하나요?",
          a: "라켓, 테니스화, 운동복만 챙겨 주세요. 테니스공은 러브코트가 준비해요.",
        },
        {
          q: "비가 오면 어떻게 되나요?",
          a: "우천으로 테니스를 진행하지 못하는 경우를 대비한 환불 규정이 마련되어 있어요. 자세한 내용은 이용약관에서 확인해 주세요.",
        },
        {
          q: "보험은 따로 들어야 하나요?",
          a: "러브코트가 참가자 보험을 적용하고 있어요.",
        },
        {
          q: "외국어를 못 해도 괜찮을까요?",
          a: "괜찮아요! 투어 리더가 트립 내내 함께하면서 이동과 식사를 챙겨요.",
        },
      ],
    },
    {
      title: "사진",
      items: [
        {
          q: "스냅 사진은 언제 받을 수 있나요?",
          a: "트립이 끝난 뒤 3주 이내에 보정본을 전달해 드리는 것이 원칙이에요.",
        },
      ],
    },
  ];
  return (
    <section id="faq" className="th-container py-20 md:py-28">
      <div className="p1-faq">
        <h2 className="th-serif p1-row-head__title">자주 묻는 질문</h2>
        {groups.map((g) => (
          <div className="p1-faq__group" key={g.title}>
            <h3 className="p1-faq__group-title">{g.title}</h3>
            {g.items.map((it) => (
              <details className="p1-faq__item" key={it.q}>
                <summary>
                  <span>Q. {it.q}</span>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M4 8l6 6 6-6" />
                  </svg>
                </summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. 푸터 (+ 사업자 정보)                                             */
/* ---------------------------------------------------------------- */
const BIZ_ROWS: [string, string][][] = [
  [["대표", "한지훈"], ["개인정보책임관리자", "한지훈"]],
  [["사업자등록번호", "481-11-03110"], ["관광사업자등록번호", "제2026-000006호"], ["통신판매업신고", "2026-경기하남-1633"]],
  [["주소", "경기도 하남시 미사대로 550, 10층 C10-0001호,1003호"]],
  [["메일", "gks3628@gmail.com"], ["연락처", "010-2439-3628"]],
];

export function Footer() {
  const cols: Record<string, string[]> = {
    트립: ["모집 중인 트립", "준비 중인 트립", "오픈 알림"],
    러브코트: ["러브코트는", "대표 이야기", "인스타그램"],
    안내: ["자주 묻는 질문", "환불 규정", "이용약관"],
  };
  return (
    <footer className="th-footer">
      <div className="th-container relative grid gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">다음 트립 오픈 알림</h3>
          <p className="mt-2 max-w-[280px] text-[0.68rem] text-[var(--th-muted)]">
            이번 일정이 안 맞아도 괜찮아요. 다음 기수 오픈 소식을 먼저 보내드립니다.
          </p>
          <form className="th-footer__input mt-6" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="이메일 주소" aria-label="이메일" />
            <button type="submit" className="th-pill th-pill--lime text-[0.68rem]">알림 받기</button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {Object.entries(cols).map(([h, links]) => (
            <div key={h}>
              <span className="block text-[0.6rem] text-[var(--th-muted)]">{h}</span>
              <ul className="mt-3 space-y-2 text-[0.8rem]">
                {links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="th-container relative p1-biz">
        <strong className="p1-biz__name">프라이데이랩</strong>
        <dl className="p1-biz__list">
          {BIZ_ROWS.map((row, i) => (
            <div key={i} className="p1-biz__row">
              {row.map(([k, v]) => (
                <div key={k} className="p1-biz__item">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </div>
          ))}
        </dl>
        <span className="p1-biz__copy">© Love Court 2026</span>
      </div>

    </footer>
  );
}
