import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/test-home.css";
import "../styles/test-home3.css";

/**
 * /test-home3 — Traw 클론(/test-home) 레이아웃 그대로 + 러브코트 카피
 * - 디자인/색/이미지/섹션 순서는 /test-home과 동일
 * - 히어로 하단 카드 스트립(5장)만 제거
 * - 한글 헤드라인은 Fraunces에 글리프가 없어 VITRO CORE로 대체 (라틴 워드마크는 Fraunces 유지)
 */

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  heroBg: U("photo-1464822759023-fed622ff2c3b", 1800),
  feature: "/images/journal-japan.webp",
  startCollage: ["/images/tennis%201.png", "/images/tennis%202.png", "/images/tennis%203.png"],
  stack: [
    U("photo-1507525428034-b723cf961d3e", 400),
    U("photo-1526772662000-3f88f10405ff", 400),
    U("photo-1506905925346-21bda4d32df4", 400),
  ],
};

const APPLY = "#trips";

export function TestHome3() {
  return (
    <div className="th th--v3">
      <Hero />
      <Everything />
      <CoreValues />
      <WhereToStart />
      <Join />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 1. 네비 + 히어로                                                   */
/* ---------------------------------------------------------------- */
function Nav() {
  const items = ["홈", "트립", "러브코트는", "후기", "문의"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`th-navbar ${scrolled ? "th-navbar--scrolled" : "th-navbar--top"}`}>
      <div className="th-container flex items-center justify-between py-4">
        <a href="#" className="th-navbar__logo" aria-label="러브코트 홈">
          <img src={scrolled ? "/logo_lovecourt_mainOrange.png" : "/logo_lovecourt_white.png"} alt="LOVE COURT" />
        </a>
        <nav className="hidden items-center gap-1.5 md:flex">
          {items.map((it, i) => (
            <a key={it} href="#" className={`th-nav-pill ${i === 0 ? "th-nav-pill--active" : ""}`}>
              {it}
            </a>
          ))}
        </nav>
        <a href="#" className="th-navbar__login">
          로그인
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="th-hero th-hero--nostrip">
      <div className="th-hero__bg" style={{ backgroundImage: `url(${IMG.heroBg})` }} />
      <Nav />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
        <h1 className="th-serif th-hero__title">
          혼자 오라고 만든
          <br />
          해외 테니스 트립
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/85 md:text-[0.95rem]">
          좋은 코트, 나와 맞는 6~8명, 그 장면을 남기는 전문 스냅 작가.
          라켓만 챙기세요. 코트 예약, 이동, 식사는 러브코트가 준비합니다.
        </p>
        <a href={APPLY} className="th-pill mt-8">
          하코네 1기 자리 잡기
        </a>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. 라켓만 챙기세요, 나머지는 포함입니다 (헤드라인 + 본문 + 사진)     */
/* ---------------------------------------------------------------- */
function Everything() {
  return (
    <section className="th-container grid items-center gap-10 py-24 md:grid-cols-2 md:gap-16 md:py-32">
      <div>
        <h2 className="th-serif th3-feature__title">
          라켓만 챙기세요.
          <br />
          나머지는 포함입니다.
        </h2>
        <p className="mt-6 text-[1.02rem] leading-relaxed text-[var(--th-muted)]">
          코트 예약, 이동, 식사, 숙소까지 전부 준비되어 있습니다. 매일 최소 2시간
          테니스가 보장되고, Day 2는 코트 3면을 통대관해 4시간을 씁니다.
        </p>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-[var(--th-muted)]">
          전문 스냅 작가가 전 일정 동행해 코트 위의 당신을 남깁니다. 테니스 외
          시간은 온전히 당신의 것 — 온천, 산책, 혼자만의 시간.
        </p>
        <a href={APPLY} className="th-pill mt-8">
          포함 사항 전체 보기
        </a>
      </div>
      <div className="th3-feature-photo">
        <img src={IMG.feature} alt="하코네 옥외 코트" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. 러브코트의 핵심 가치 (Traw How-it-works 4카드 레이아웃 유지)     */
/* ---------------------------------------------------------------- */
function CoreValues() {
  const values = [
    { k: "Court", t: "좋은 코트,\n확정된 날짜", d: "외륜산 뷰의 옥외 코트 3면을 통대관합니다. 그 코트, 그 날짜, 8자리. 혼자서는 만들 수 없는 무대." },
    { k: "Move", t: "귀찮은 건\n전부 러브코트가", d: "나리타 집결부터 전용 버스, 숙소, 코트, 식사까지. 당신은 라켓만 챙기면 됩니다." },
    { k: "Connect", t: "나와 맞는\n사람들과", d: "실력과 나잇대가 맞는 6~8명으로 한 기수를 꾸립니다. 사전 모임에서 먼저 만나고, 피날레 디너에서 다음을 약속합니다." },
    { k: "Remember", t: "그 장면 속의\n나를 남기다", d: "전문 스냅 작가가 전 일정 동행합니다. 코트 위의 당신을 1~2주 안에 보정본으로 전달합니다." },
  ];
  const icons = [
    <path key="a" d="M40 60 h160 v120 h-160 z M120 60 v120 M40 120 h160 M70 60 v120 M170 60 v120" />,
    <path key="b" d="M40 160 C 60 80, 140 40, 200 60 M 60 190 C 90 120, 150 90, 210 100 M 20 120 C 50 60, 110 30, 170 30" />,
    <path key="c" d="M70 110 a30 30 0 1 0 0.1 0 M170 110 a30 30 0 1 0 0.1 0 M30 200 c 0 -40 30 -60 60 -60 M210 200 c 0 -40 -30 -60 -60 -60" />,
    <path key="d" d="M40 80 h40 l15 -20 h50 l15 20 h40 v110 h-160 z M120 170 a35 35 0 1 0 0.1 0" />,
  ];
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="th-glow" />
      <div className="th-container relative">
        <h2 className="th-h2">러브코트의 테니스 트립에서는?</h2>
        <p className="mx-auto mt-5 max-w-md text-center text-sm text-[var(--th-muted)]">
          숙소와 코트는 누구나 예약할 수 있습니다. 혼자서는 만들 수 없는 것만 러브코트가 만듭니다.
        </p>
        <div className="th-how__grid mt-16">
          {values.map((v, i) => (
            <div className="th-how__card" key={v.k}>
              <svg viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {icons[i]}
              </svg>
              <span className="relative text-[0.72rem] font-semibold tracking-[0.12em] text-[var(--th-muted)]">{v.k.toUpperCase()}</span>
              <h3 className="th-serif relative mt-2 whitespace-pre-line text-[1.5rem] leading-tight md:text-[1.65rem]">{v.t}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-[var(--th-muted)]">{v.d}</p>
            </div>
          ))}
        </div>
        <div className="th-rule-cta mt-16">
          <a href={APPLY} className="th-pill">하코네 1기 자리 잡기</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. 어떻게 시작하나요 — FTLO "Where to Start" 오마주                */
/*    번호 원 + 세로 연결선 + 단계별 CTA / 우측 스티키 사진 콜라주      */
/* ---------------------------------------------------------------- */
function WhereToStart() {
  const steps = [
    {
      n: "1",
      t: "트립 고르기",
      d: ["지금 모집 중인 트립의 일정, 코트, 숙소, 포함 사항과 환불 규정을 상세 페이지에서 확인하세요.", "항공권은 개별 구매입니다. 나리타 오전 도착 편을 권장드려요."],
      cta: ["트립 보기", APPLY],
    },
    {
      n: "2",
      t: "자리 잡기",
      d: ["신청서를 작성하고 예약금으로 자리를 잡습니다. 정원은 6~8명.", "이후 대표가 직접 연락드려 실력과 기대를 듣고, 이번 기수와 잘 맞는지 함께 확인합니다."],
      cta: ["하코네 1기 신청하기", APPLY],
      hot: true,
    },
    {
      n: "3",
      t: "사전 모임에서 먼저 만나기",
      d: ["출국 3~4주 전 서울에서 한 번 모입니다. 가볍게 랠리를 치고 같이 갈 사람들 얼굴을 익힙니다.", "공항에서 처음 만나는 어색함은 없습니다."],
      cta: ["자주 묻는 질문", "#"],
    },
  ];
  return (
    <section className="th-container py-24 md:py-32">
      <h2 className="th-h2">어떻게 시작하나요</h2>
      <p className="mx-auto mt-5 max-w-md text-center text-sm text-[var(--th-muted)]">
        트립을 고르고, 자리를 잡고, 사전 모임에서 먼저 만납니다. 세 단계면 끝입니다.
      </p>

      <div className="th3-start mt-16">
        <ol className="th3-steps">
          {steps.map((s) => (
            <li className="th3-step" key={s.n}>
              <div className={`th3-step__num ${s.hot ? "is-hot" : ""}`}>{s.n}</div>
              <div>
                <h3 className="th-serif text-[1.5rem] leading-tight md:text-[1.8rem]">{s.t}</h3>
                {s.d.map((para) => (
                  <p key={para} className="mt-3 max-w-md text-[0.92rem] text-[var(--th-muted)]">{para}</p>
                ))}
                <a href={s.cta[1]} className={`th-pill th3-step__cta mt-5 ${s.hot ? "th3-step__cta--hot" : ""}`}>
                  {s.cta[0]}
                </a>
              </div>
            </li>
          ))}
        </ol>

        <div className="th3-collage">
          <img src={IMG.startCollage[0]} alt="" />
          <img src={IMG.startCollage[1]} alt="" />
          <img src={IMG.startCollage[2]} alt="" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. 지금 모집 중인 테니스 트립                                       */
/* ---------------------------------------------------------------- */
function Join() {
  return (
    <section id="trips" className="relative overflow-hidden py-24 md:py-32">
      <div className="th-glow" />
      <div className="th-container relative">
        <h2 className="th-h2">
          지금 모집 중인
          <br />
          테니스 트립
        </h2>

        <div className="th3-poster-wrap mt-14">
          {/* TODO: 데이터 레이어(src/data/trips.ts)의 open 트립이 아직 "bali"로 되어 있어
              상세페이지 내용이 이 포스터(하코네)와 다릅니다. bali → hakone으로 교체하거나
              새 트립 데이터를 추가한 뒤 아래 to 값을 맞춰주세요. */}
          <Link to="/test/trips/bali" className="th3-poster" aria-label="일본 하코네 테니스 트립 1기 상세보기">
            <img src={IMG.feature} alt="" />
            <div className="th3-poster__body">
              <span className="th3-poster__pin">
                <svg viewBox="0 0 24 24" fillRule="evenodd" aria-hidden>
                  <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.24 11.34 6.9 11.97a.86.86 0 0 0 1.2 0c.66-.63 6.9-6.72 6.9-11.97C19.5 5.36 16.14 2 12 2zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
                </svg>
                Japan, Hakone
              </span>
              <h3 className="th3-poster__title th-serif">
                일본 하코네
                <br />
                테니스 트립 1기
              </h3>
              <p className="th3-poster__date">2026.10.17 – 19 · 2박 3일</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. 푸터                                                            */
/* ---------------------------------------------------------------- */
function Footer() {
  const cols: Record<string, string[]> = {
    트립: ["모집 중인 트립", "준비 중인 트립", "오픈 알림"],
    러브코트: ["러브코트는", "대표 이야기", "인스타그램"],
    안내: ["자주 묻는 질문", "환불 규정", "이용약관"],
    사업자: ["통신판매업 신고", "2026-서울강동-1175", "여행사 제휴 운영"],
  };
  return (
    <footer className="th-footer">
      <svg className="th-footer__plane" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" aria-hidden>
        <path d="M30 110 L 100 90 L 60 40 L 80 34 L 130 82 L 175 70 C 190 66 194 84 180 90 L 140 104 L 130 160 L 112 166 L 104 114 L 60 126 L 52 150 L 40 152 L 38 128 L 22 118 Z" />
      </svg>
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
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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

      <div className="th-footer__wordmark">
        <span className="th-latin" aria-hidden>lovecourt</span>
        <div className="th-footer__stack">
          {IMG.stack.map((s) => (
            <img key={s} src={s} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </footer>
  );
}
