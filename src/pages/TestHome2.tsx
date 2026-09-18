import "../styles/test-home2.css";

/**
 * /test-home2 — 러브코트 홈 v2 (디자인 시안)
 *
 * 구조: 히어로 → 신뢰 스트립 → 혼자 오세요, 혼자가 아닙니다 → 러브코트 트립에서는(벤토)
 *       → 어떻게 시작하나요(3단계) → 지금 모집 중인 트립 → 대표 이야기 → FAQ → 마무리 CTA + 푸터
 *
 * 수치는 businessContext.md 실측/확정값만 사용. 미확정 항목은 "준비중"으로 표기.
 * 링크는 시안 단계라 앵커 플레이스홀더. 실제 연결 시 /test/trips/:id 로 교체.
 */

const IMG = {
  hero: "/images/hero.webp",
  move: "/images/move.webp",
  connect: "/images/connect.webp",
  remember: "/images/remember.webp",
  founder: "/images/founder.webp",
  japan: "/images/journal-japan.webp",
  vietnam: "/images/journal-vietnam.webp",
  bali: "/images/journal-bali.webp",
  tennis1: "/images/tennis 1.png",
  tennis2: "/images/tennis 2.png",
  tennis3: "/images/tennis 3.png",
  logoWhite: "/logo_lovecourt_white.png",
  logoOrange: "/logo_lovecourt_mainOrange.png",
};

const TRIP_HREF = "#trips";
const APPLY_HREF = "#trips";

export function TestHome2() {
  return (
    <div className="lc">
      <Hero />
      <TrustStrip />
      <SoloNotAlone />
      <Values />
      <WhereToStart />
      <Trips />
      <Founder />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 1. 네비 + 히어로                                                   */
/* ---------------------------------------------------------------- */
function Nav() {
  const items: [string, string][] = [
    ["홈", "#"],
    ["트립", "#trips"],
    ["러브코트는", "#about"],
    ["FAQ", "#faq"],
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="lc-container flex items-center justify-between py-5">
        <a href="#" className="block h-6 w-auto">
          <img src={IMG.logoWhite} alt="LOVE COURT" className="h-full w-auto" />
        </a>
        <nav className="hidden items-center gap-1.5 md:flex">
          {items.map(([label, href], i) => (
            <a key={label} href={href} className={`lc-nav-pill ${i === 0 ? "lc-nav-pill--active" : ""}`}>
              {label}
            </a>
          ))}
        </nav>
        <a
          href="https://instagram.com/love_court.kr"
          target="_blank"
          rel="noreferrer"
          className="lc-nav-pill"
          aria-label="인스타그램"
        >
          @love_court.kr
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="lc-hero">
      <div className="lc-hero__bg" style={{ backgroundImage: `url(${IMG.hero})` }} />
      <Nav />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
        <span className="lc-hero__badge">
          <i />
          일본 하코네 1기 · 2026.10.17 – 19 · 모집 중
        </span>
        <h1 className="lc-display lc-hero__title mt-6">
          혼자 오라고 만든
          <br />
          해외 테니스 트립
        </h1>
        <p className="mt-6 max-w-md text-[0.95rem] text-white/85 md:text-[1.05rem]">
          좋은 코트, 나와 맞는 6~8명, 그 장면을 남기는 전문 스냅 작가.
          <br className="hidden md:block" />
          라켓만 챙기세요. 나머지는 러브코트가 준비합니다.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a href={APPLY_HREF} className="lc-btn lc-btn--primary">
            하코네 1기 자리 잡기
          </a>
          <a href={TRIP_HREF} className="lc-btn lc-btn--ghost">
            트립 둘러보기
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. 신뢰 스트립                                                     */
/* ---------------------------------------------------------------- */
function TrustStrip() {
  const stats: [string, string][] = [
    ["159명", "대기명단 등록 (2026.09 기준)"],
    ["74%", "혼자 또는 동행 미정으로 신청"],
    ["18.5만", "인스타그램 30일 조회"],
    ["답사 완료", "2026.08 하코네 코트·숙소·식당 실측"],
  ];
  return (
    <section className="lc-container">
      <div className="lc-trust">
        {stats.map(([v, l]) => (
          <div key={l}>
            <b>{v}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. 혼자 오세요, 혼자가 아닙니다 (FTLO: Travel Solo, Not Alone)     */
/* ---------------------------------------------------------------- */
function SoloNotAlone() {
  return (
    <section id="about" className="lc-container grid items-center gap-12 py-24 md:grid-cols-2 md:gap-16 md:py-32">
      <div>
        <span className="lc-eyebrow">혼자 오는 사람을 위해</span>
        <h2 className="lc-h2 mt-4">
          혼자 오세요.
          <br />
          혼자가 아닙니다.
        </h2>
        <p className="mt-7 text-[1.02rem] leading-relaxed text-[var(--lc-muted)]">
          러브코트는 혼자 여행 가고 싶지만 혼자라서 못 하는 게 많은 사람을 위해
          만들었습니다. 좋은 코트를 찾아 떠나는 6~8명의 소규모 해외 테니스 트립.
          실력과 나잇대가 맞는 사람들로 한 기수를 꾸립니다.
        </p>
        <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--lc-muted)]">
          출국 전 서울 사전 모임에서 처음 랠리를 치고, 마지막 밤 피날레 디너에서는
          다음 트립을 같이 얘기하게 됩니다. 이동, 숙소, 코트 예약, 식사는 전부
          러브코트가 맡습니다. 당신은 코트에 서기만 하면 됩니다.
        </p>
        <a href={TRIP_HREF} className="lc-btn lc-btn--green mt-9">
          지금 모집 중인 트립 보기
        </a>
      </div>
      <div className="lc-collage">
        <img src={IMG.connect} alt="" />
        <img src={IMG.move} alt="" />
        <img src={IMG.remember} alt="" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. 러브코트 트립에서는 (벤토)                                       */
/* ---------------------------------------------------------------- */
function Values() {
  const included = [
    "나리타 집결 → 전용 버스 이동",
    "코트 통대관 · 매일 최소 2시간",
    "숙소 2박 · 조식 포함",
    "웰컴 디너 · 피날레 디너",
    "노천 온천 무제한",
    "서울 사전 모임 (Day 0)",
    "전문 스냅 작가 동행 · 보정본 전달",
    "전담 호스트 · 조 편성",
  ];
  const days: [string, number, boolean][] = [
    ["Day 0", 40, true],
    ["Day 1", 55, true],
    ["Day 2", 100, true],
    ["Day 3", 0, false],
  ];
  return (
    <section className="bg-[var(--lc-bg-2)] py-24 md:py-32">
      <div className="lc-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="lc-eyebrow">러브코트가 만드는 것</span>
          <h2 className="lc-h2 mt-4">러브코트 테니스 트립에서는</h2>
          <p className="mt-5 text-[var(--lc-muted)]">
            숙소와 코트는 누구나 예약할 수 있습니다. 혼자서는 만들 수 없는 것만
            러브코트가 만듭니다. 나와 맞는 사람들, 그리고 그 장면 속의 나.
          </p>
        </div>

        <div className="lc-bento mt-14 grid gap-4">
          {/* 숫자 안심 */}
          <div className="lc-card lc-card--green lc-bento__stat flex flex-col justify-between p-7">
            <div>
              <span className="text-xs font-medium text-white/70">혼자 신청해도 괜찮을까요?</span>
              <div className="lc-display mt-3 text-[3.2rem] leading-none">74%</div>
              <p className="mt-2 text-sm text-white/80">
                대기명단 159명 중 118명이 혼자, 또는 동행 미정으로 신청했습니다.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>게임 가능</span>
                <span>89%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[89%] rounded-full bg-[var(--lc-orange)]" />
              </div>
              <p className="mt-3 text-xs text-white/70">
                실력·나잇대가 맞는 사람끼리 한 기수를 꾸립니다.
              </p>
            </div>
          </div>

          {/* 스냅 */}
          <div className="lc-card lc-card--img lc-bento__snap">
            <img src={IMG.remember} alt="" />
            <div className="lc-card__caption">
              <span className="text-xs font-medium text-white/70">스냅</span>
              <h3 className="lc-display mt-1 text-2xl">테생샷, 이번 기회에</h3>
              <p className="mt-2 max-w-sm text-sm text-white/80">
                전문 스냅 작가가 전 일정 동행합니다. 코트 위의 당신을 남기고,
                1~2주 안에 보정본으로 전달합니다.
              </p>
            </div>
          </div>

          {/* 포함 밀도 */}
          <div className="lc-card lc-bento__list p-7">
            <div className="grid gap-6 md:grid-cols-[200px_1fr]">
              <div>
                <span className="text-xs font-medium text-[var(--lc-muted)]">포함 사항</span>
                <h3 className="lc-display mt-1 text-2xl">귀찮은 건 전부 러브코트가</h3>
                <p className="mt-2 text-sm text-[var(--lc-muted)]">
                  코트 예약, 이동, 식사. 라켓만 챙기세요.
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {included.map((t) => (
                  <li key={t} className="lc-check">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 코트 보장 + 자유시간 */}
          <div className="lc-card lc-card--green lc-bento__free flex flex-col justify-between p-7">
            <div>
              <span className="text-xs font-medium text-white/70">코트</span>
              <h3 className="lc-display mt-1 text-2xl">여행 내내 코트가 보장됩니다</h3>
              <p className="mt-2 text-sm text-white/80">
                매일 최소 2시간. Day 2는 4시간 블록. 나머지 시간은 온전히 당신의 것.
              </p>
            </div>
            <div className="lc-court-bars mt-8">
              {days.map(([d, h, on]) => (
                <div key={d} className={on ? "is-on" : ""} style={{ height: `${Math.max(h, 6)}%` }}>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. 어떻게 시작하나요 (FTLO: Where to Start)                        */
/* ---------------------------------------------------------------- */
function WhereToStart() {
  const steps = [
    {
      n: "1",
      t: "트립 고르기",
      d: "지금 모집 중인 트립의 일정, 코트, 숙소, 포함 사항과 환불 규정을 상세 페이지에서 확인하세요. 항공권은 개별 구매, 나머지는 전부 포함입니다.",
      cta: ["트립 보기", TRIP_HREF, "lc-btn--outline"],
    },
    {
      n: "2",
      t: "자리 잡기",
      d: "신청서를 작성하고 예약금으로 자리를 잡습니다. 이후 대표가 직접 연락드려 실력과 기대를 듣고, 이번 기수와 잘 맞는지 함께 확인합니다. 어울리지 않는 조합이면 솔직하게 말씀드립니다.",
      cta: ["하코네 1기 신청하기", APPLY_HREF, "lc-btn--primary"],
      hot: true,
    },
    {
      n: "3",
      t: "사전 모임에서 먼저 만나기",
      d: "출국 3~4주 전 서울에서 한 번 모입니다. 가볍게 랠리를 치고, 같이 갈 사람들 얼굴을 익히고, 스냅 리허설도 합니다. 공항에서 처음 만나는 어색함이 없습니다.",
      cta: ["자주 묻는 질문", "#faq", "lc-btn--outline"],
    },
  ];
  return (
    <section className="lc-container grid gap-14 py-24 md:grid-cols-[1fr_0.9fr] md:gap-20 md:py-32">
      <div>
        <span className="lc-eyebrow">신청 방법</span>
        <h2 className="lc-h2 mt-4">어떻게 시작하나요</h2>
        <p className="mt-5 max-w-md text-[var(--lc-muted)]">
          트립을 고르고, 자리를 잡고, 사전 모임에서 먼저 만납니다. 세 단계면 끝입니다.
        </p>
        <div className="lc-steps mt-12">
          {steps.map((s) => (
            <div className="lc-step" key={s.n}>
              <div className={`lc-step__num ${s.hot ? "is-hot" : ""}`}>{s.n}</div>
              <div>
                <h3 className="lc-display text-[1.35rem]">{s.t}</h3>
                <p className="mt-2 max-w-md text-[0.95rem] text-[var(--lc-muted)]">{s.d}</p>
                <a href={s.cta[1]} className={`lc-btn lc-btn--sm mt-4 ${s.cta[2]}`}>
                  {s.cta[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lc-sticky hidden md:block">
        <div className="lc-collage">
          <img src={IMG.tennis1} alt="" />
          <img src={IMG.tennis2} alt="" />
          <img src={IMG.tennis3} alt="" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. 지금 모집 중인 트립                                             */
/* ---------------------------------------------------------------- */
function Trips() {
  return (
    <section id="trips" className="relative overflow-hidden bg-[var(--lc-bg-2)] py-24 md:py-32">
      <div className="lc-glow" />
      <div className="lc-container relative">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="lc-eyebrow">트립</span>
            <h2 className="lc-h2 mt-4">지금 모집 중인 테니스 트립</h2>
          </div>
          <p className="max-w-xs text-sm text-[var(--lc-muted)]">
            한 기수 6~8명. 최소 인원 미달 시 전액 환불됩니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a href="#" className="lc-poster">
            <span className="lc-poster__badge lc-poster__badge--hot">모집중 · 8자리</span>
            <img src={IMG.japan} alt="" />
            <div className="lc-poster__body">
              <span className="text-xs text-white/70">Japan · Hakone</span>
              <h3 className="lc-poster__title mt-1">
                일본 하코네
                <br />
                테니스 트립 1기
              </h3>
              <p className="mt-2 text-sm text-white/85">2026.10.17 – 19 · 2박 3일</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/70">얼리버드 149만 원 · 항공 불포함</span>
                <span className="lc-btn lc-btn--white lc-btn--sm">자세히 보기</span>
              </div>
            </div>
          </a>

          <a href="#" className="lc-poster lc-poster--coming">
            <span className="lc-poster__badge lc-poster__badge--muted">준비중</span>
            <img src={IMG.vietnam} alt="" />
            <div className="lc-poster__body">
              <span className="text-xs text-white/70">Vietnam · Da Nang</span>
              <h3 className="lc-poster__title mt-1">
                베트남 다낭
                <br />
                테니스 트립
              </h3>
              <p className="mt-2 text-sm text-white/85">일정 준비중</p>
              <div className="mt-4">
                <span className="lc-btn lc-btn--ghost lc-btn--sm">오픈 알림 받기</span>
              </div>
            </div>
          </a>

          <a href="#" className="lc-poster lc-poster--coming">
            <span className="lc-poster__badge lc-poster__badge--muted">준비중</span>
            <img src={IMG.bali} alt="" />
            <div className="lc-poster__body">
              <span className="text-xs text-white/70">Indonesia · Ubud</span>
              <h3 className="lc-poster__title mt-1">
                발리 우붓
                <br />
                테니스 트립
              </h3>
              <p className="mt-2 text-sm text-white/85">일정 준비중</p>
              <div className="mt-4">
                <span className="lc-btn lc-btn--ghost lc-btn--sm">오픈 알림 받기</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 7. 대표 이야기 (후기 자리 — 1기 후 실제 후기로 교체)                 */
/* ---------------------------------------------------------------- */
function Founder() {
  return (
    <section className="lc-container py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="lc-eyebrow">호스트</span>
        <h2 className="lc-h2 mt-4">
          극 내향인이
          <br />
          혼자 발리에 갔다가 만든 트립
        </h2>
      </div>
      <div className="lc-founder__stage mt-10">
        <div className="lc-founder__side lc-founder__side--l">
          <img src={IMG.move} alt="" />
        </div>
        <div className="lc-founder__main">
          <img src={IMG.founder} alt="러브코트 대표" />
        </div>
        <div className="lc-founder__side lc-founder__side--r">
          <img src={IMG.connect} alt="" />
        </div>
      </div>
      <blockquote className="mx-auto mt-8 max-w-xl text-center text-[1.1rem] leading-relaxed">
        &ldquo;처음 혼자 간 발리에서, 코트 옆자리에 앉은 사람과 두 시간을 쳤습니다.
        여행에서 남은 건 풍경이 아니라 그 두 시간이었어요. 그 경험을 혼자 오는
        사람에게 안전하게 만들어주고 싶었습니다.&rdquo;
      </blockquote>
      <p className="mt-4 text-center text-sm text-[var(--lc-muted)]">러브코트 대표 · 1기 호스트</p>
      <p className="mx-auto mt-10 max-w-xl text-center text-xs text-[var(--lc-muted)]">
        [시안 메모] 이 섹션은 1기 종료 후 참가자 후기로 교체합니다. 인용문은 대표 확정 전 초안입니다.
      </p>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 8. FAQ                                                             */
/* ---------------------------------------------------------------- */
function Faq() {
  const items: [string, string][] = [
    [
      "혼자 신청해도 괜찮나요?",
      "네. 대기명단의 74%가 혼자 또는 동행 미정으로 신청했습니다. 출국 전 서울 사전 모임에서 먼저 만나기 때문에 공항에서 처음 보는 일은 없습니다.",
    ],
    [
      "실력이 어느 정도여야 하나요?",
      "복식 게임이 가능한 정도면 충분합니다. 신청 후 대표가 직접 연락드려 실력을 여쭙고, 비슷한 사람끼리 조를 짭니다. 빡센 경기가 아니라 소셜 매치 톤입니다.",
    ],
    [
      "항공권은 포함인가요?",
      "항공권은 개별 구매입니다. 나리타 오전 도착 편을 권장드리며, 앞뒤로 개인 일정을 붙이거나 현지 합류도 가능합니다. 항공 외 이동·숙소·코트·식사는 포함입니다.",
    ],
    [
      "환불 규정은 어떻게 되나요?",
      "[대표 확정 전 게시 불가 · 결제 오픈 전 필수] 최소 인원 6명 미달 시 전액 환불됩니다. 세부 규정은 트립 상세 페이지의 환불 규정을 확인해 주세요.",
    ],
  ];
  return (
    <section id="faq" className="lc-container--narrow py-8 md:py-16">
      <span className="lc-eyebrow">자주 묻는 질문</span>
      <h2 className="lc-h2 mt-4">자주 묻는 질문</h2>
      <div className="lc-faq mt-10">
        {items.map(([q, a], i) => (
          <details key={q} open={i === 0}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 9. 마무리 CTA                                                      */
/* ---------------------------------------------------------------- */
function FinalCta() {
  return (
    <section className="lc-container py-24">
      <div className="lc-final">
        <div className="lc-final__bg" style={{ backgroundImage: `url(${IMG.hero})` }} />
        <div className="relative z-10 grid gap-8 p-10 md:grid-cols-[1fr_auto] md:items-center md:p-14">
          <div>
            <span className="text-sm font-semibold text-white/70">첫 번째 기수</span>
            <h2 className="lc-h2 mt-3 text-white">
              첫 번째 트립,
              <br />
              코트에서 만나요
            </h2>
            <p className="mt-4 max-w-md text-white/80">
              일본 하코네 1기 · 2026.10.17 – 19 · 6~8명. 자리가 차면 다음 기수는 2027년입니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a href={APPLY_HREF} className="lc-btn lc-btn--primary">
              하코네 1기 자리 잡기
            </a>
            <a href="#" className="lc-btn lc-btn--ghost">
              2기 오픈 알림 받기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 10. 푸터                                                           */
/* ---------------------------------------------------------------- */
function Footer() {
  const cols: Record<string, string[]> = {
    트립: ["모집 중인 트립", "준비 중인 트립", "오픈 알림"],
    러브코트: ["러브코트는", "대표 이야기", "인스타그램"],
    안내: ["자주 묻는 질문", "환불 규정", "이용약관", "개인정보처리방침"],
  };
  return (
    <footer className="lc-footer border-t border-[var(--lc-line)]">
      <div className="lc-container grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <img src={IMG.logoOrange} alt="LOVE COURT" className="h-6 w-auto" />
          <p className="mt-5 max-w-sm text-sm text-[var(--lc-muted)]">
            러브코트는 혼자 오는 사람을 위한 소규모 해외 테니스 트립입니다. 한 기수
            6~8명, 좋은 코트, 전문 스냅 작가 동행. 커뮤니티가 자산이고 트립은 그
            정점입니다.
          </p>
          <h3 className="mt-8 text-lg font-semibold">다음 트립 오픈 알림</h3>
          <p className="mt-1 text-sm text-[var(--lc-muted)]">
            이번 일정이 안 맞아도 괜찮아요. 다음 기수 오픈 소식을 먼저 보내드립니다.
          </p>
          <form className="lc-footer__input mt-4" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="이메일 주소" aria-label="이메일" />
            <button type="submit" className="lc-btn lc-btn--primary lc-btn--sm">
              알림 받기
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(cols).map(([h, links]) => (
            <div key={h}>
              <span className="block text-xs font-semibold text-[var(--lc-muted)]">{h}</span>
              <ul className="mt-3 space-y-2 text-sm">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-[var(--lc-orange)]">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="lc-container mt-14 flex flex-col gap-2 border-t border-[var(--lc-line)] pt-6 text-xs text-[var(--lc-muted)] md:flex-row md:justify-between">
        <span>© 2026 LOVE COURT. All rights reserved.</span>
        <span>통신판매업 신고 2026-서울강동-1175 · 여행업 등록 여행사 제휴 운영</span>
      </div>

      <div className="lc-footer__wordmark">
        <span aria-hidden>LOVE COURT</span>
        <div className="lc-footer__ball" aria-hidden />
      </div>
    </footer>
  );
}
