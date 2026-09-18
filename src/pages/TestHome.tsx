import "../styles/test-home.css";

/**
 * /test-home — Traw 랜딩 페이지 클론 (Dribbble shot 27035008)
 * 레이아웃·비주얼 리듬 재현용. 카피/이미지/구조는 추후 러브코트 기준으로 치환.
 */

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  heroBg: U("photo-1464822759023-fed622ff2c3b", 1800),
  strip: [
    U("photo-1551632811-561732d1e306"),
    U("photo-1527684651001-731c474bbb5a"),
    U("photo-1501554728187-ce583db33af7"),
    U("photo-1486870591958-9b9d0d1dda99"),
    U("photo-1533240332313-0db49b459ad6"),
  ],
  verified: U("photo-1530789253388-582c481c54b0"),
  safer: U("photo-1436491865332-7a61a109cc05"),
  matchBg: U("photo-1470770903676-69b98201ea1c", 1800),
  matchMain: U("photo-1551698618-1dfe5d97d256"),
  matchSecond: U("photo-1473625247510-8ceb1760943f"),
  thumbs: [
    U("photo-1502680390469-be75c86b636f", 300),
    U("photo-1508672019048-805c876b67e2", 300),
    U("photo-1520250497591-112f2f40a3f4", 300),
  ],
  feedbackMain: U("photo-1522163182402-834f871fd851"),
  feedbackSides: [
    U("photo-1519681393784-d120267933ba", 400),
    U("photo-1483729558449-99ef09a8c325", 400),
    U("photo-1476514525535-07fb3b4ae5f1", 400),
    U("photo-1500534314209-a25ddb2bd429", 400),
  ],
  fan: [
    U("photo-1493246507139-91e8fad9978e"),
    U("photo-1454496522488-7a8e488e8606"),
    U("photo-1469474968028-56623f02e42e"),
    U("photo-1441974231531-c6227db76b6e"),
  ],
  stack: [
    U("photo-1507525428034-b723cf961d3e", 400),
    U("photo-1526772662000-3f88f10405ff", 400),
    U("photo-1506905925346-21bda4d32df4", 400),
  ],
};

export function TestHome() {
  return (
    <div className="th">
      <Hero />
      <Everything />
      <HowItWorks />
      <Match />
      <Feedback />
      <Join />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 1. 네비 + 히어로                                                   */
/* ---------------------------------------------------------------- */
function Nav() {
  const items = ["Home", "Tour Mates", "Destinations", "Reviews", "Contact Us"];
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="th-container flex items-center justify-between py-6">
        <a href="#" className="th-serif text-2xl italic text-white">
          travo
        </a>
        <nav className="hidden items-center gap-1.5 md:flex">
          {items.map((it, i) => (
            <a
              key={it}
              href="#"
              className={`th-nav-pill ${i === 0 ? "th-nav-pill--active" : ""}`}
            >
              {it}
            </a>
          ))}
        </nav>
        <span className="h-9 w-9 overflow-hidden rounded-full border-2 border-white/70 bg-white/40">
          <img src={U("photo-1500648767791-00dcc994a43e", 120)} alt="" className="h-full w-full object-cover" />
        </span>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="th-hero">
      <div className="th-hero__bg" style={{ backgroundImage: `url(${IMG.heroBg})` }} />
      <Nav />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pt-40 text-center md:pt-44">
        <h1 className="th-serif th-hero__title">
          Your Next Journey
          <br />
          Starts Here
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/85 md:text-[0.95rem]">
          Plan your next trip with confidence and ease. Connect with like-minded
          travelers, match your schedule and travel style, and turn simple plans
          into meaningful journeys.
        </p>
        <a href="#" className="th-pill mt-8">
          Get Started
        </a>
      </div>

      <div className="th-strip">
        <svg className="th-strip__swoosh" viewBox="0 0 640 320" fill="none" aria-hidden>
          <path
            d="M20 220 C 120 320, 420 290, 560 140 C 620 70, 560 20, 480 60"
            stroke="url(#th-swoosh)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="th-swoosh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#f2f26a" />
              <stop offset="1" stopColor="#b7ef3c" />
            </linearGradient>
          </defs>
        </svg>
        <div className="th-strip__track">
          {IMG.strip.map((src, i) => (
            <div className="th-strip__card" key={i}>
              <img src={src} alt="" loading={i > 2 ? "lazy" : undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. Everything You Need In One Service (벤토)                       */
/* ---------------------------------------------------------------- */
function Everything() {
  const bars = [
    20, 32, 28, 40, 36, 52, 44, 60, 48, 70, 56, 64, 80, 62, 90, 72, 66, 58, 50, 46,
    38, 30, 34, 26, 44, 52, 40, 36, 30, 24, 28, 22, 34, 42, 38, 30,
  ];
  const rows = [
    { d: "Thu", n: "7", t: "Highland Hikers", s: "18% checkins confirmed", tag: "In Progress", dark: true },
    { d: "Fri", n: "19", t: "Amalfi Express", s: "85% travelers confirmed", tag: "Upcoming", red: true },
    { d: "Sat", n: "31", t: "City Explorers", s: "38% travelers confirmed", tag: "Upcoming" },
  ];
  return (
    <section className="th-container py-24 md:py-32">
      <h2 className="th-h2">
        Everything You Need
        <br />
        In One Service
      </h2>

      <div className="th-bento mx-auto mt-14 grid max-w-[820px] gap-3">
        {/* Travel Costing */}
        <div className="th-card th-bento__costing p-6">
          <h3 className="text-[0.95rem] font-medium">Travel Costing</h3>
          <p className="mt-1.5 max-w-[210px] text-xs text-[var(--th-muted)]">
            Coordinate travel plans effortlessly. Input your ideal dates, dream
            destinations
          </p>
          <div className="relative mt-4">
            <div className="absolute right-[38%] top-0 rounded-md border border-[var(--th-line)] bg-white px-2.5 py-1.5 text-[0.62rem] shadow-sm">
              <span className="block text-[var(--th-muted)]">Total Spend</span>
              <span className="font-medium">
                $10,236 <span className="text-red-500">↓</span>
              </span>
            </div>
            <div className="th-bars">
              {bars.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className={i > 8 && i < 16 ? "is-lime" : ""}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[0.6rem] text-[var(--th-muted)]">
              <span>Day 1</span>
              <span>Day 2</span>
              <span>Day 3</span>
              <span>Day 4</span>
            </div>
          </div>
        </div>

        {/* Verified People */}
        <div className="th-card th-card--img th-bento__verified min-h-[260px]">
          <span className="th-card__icon">✿</span>
          <img src={IMG.verified} alt="" />
          <div className="th-card__caption">
            <h3 className="text-[0.95rem] font-medium">Verified People</h3>
            <p className="mt-1 text-xs text-white/80">
              No more traveling with strangers you don&apos;t know. Connect,
              communicate, and build trust.
            </p>
          </div>
        </div>

        {/* Travel Safer */}
        <div className="th-card th-card--img th-bento__safer min-h-[240px] bg-[#1b1c1e]">
          <span className="th-card__icon">⬡</span>
          <img src={IMG.safer} alt="" className="opacity-70" />
          <div className="th-card__caption">
            <h3 className="text-[0.95rem] font-medium">Travel Safer</h3>
            <p className="mt-1 text-xs text-white/75">
              We ensure safer travels through verified profiles, transparent
              interactions
            </p>
          </div>
        </div>

        {/* Traveling List */}
        <div className="th-card th-bento__list p-6">
          <h3 className="text-[0.95rem] font-medium">Traveling List</h3>
          <p className="mt-1.5 max-w-[210px] text-xs text-[var(--th-muted)]">
            Connect with confidence on our secure platform. Get to know fellow
            travelers
          </p>
          <div className="mt-5 flex flex-col gap-2 md:ml-auto md:max-w-[340px]">
            {rows.map((r) => (
              <div className="th-row" key={r.t}>
                <div className="text-center leading-none">
                  <span className="block text-[0.55rem] text-[var(--th-muted)]">{r.d}</span>
                  <span className={`block text-sm font-medium ${r.red ? "text-red-500" : ""}`}>{r.n}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="th-avatars"><i /><i /><i /></div>
                  <span className="text-[0.6rem] text-[var(--th-muted)]">+</span>
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="block truncate font-medium">{r.t}</span>
                  <span className="block truncate text-[0.58rem] text-[var(--th-muted)]">{r.s}</span>
                </div>
                <span
                  className={`th-tag ${
                    r.dark ? "bg-[var(--th-ink)] text-white" : "bg-[#f0f1ee] text-[var(--th-muted)]"
                  }`}
                >
                  {r.tag}
                </span>
                <span className="whitespace-nowrap text-[0.6rem] text-[var(--th-muted)]">⊕ ✎</span>
              </div>
            ))}
            <span className="pl-1 text-[0.6rem] text-[var(--th-muted)]">View all →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. How It Works                                                    */
/* ---------------------------------------------------------------- */
function HowItWorks() {
  const steps = [
    { t: "Find Travelers\nLike You", d: "Explore verified travelers based on destination, interests, and compatibility." },
    { t: "Message Your\nMatch", d: "Start a conversation with your matched traveler to discuss plans, preferences" },
    { t: "Start On\nThe Time", d: "Chat, like profiles, and connect before you travel - no pressure, no surprises." },
    { t: "Trusted Travelers\nLike You", d: "Explore verified travelers based on destination, interests, and compatibility." },
  ];
  const icons = [
    <path key="a" d="M80 40 C 30 80, 40 160, 90 180 C 130 195, 170 150, 150 110 C 135 80, 100 70, 80 40 Z M 120 60 c 0 -12 10 -22 22 -22 s 22 10 22 22 c 0 20 -22 40 -22 40 s -22 -20 -22 -40 z" />,
    <path key="b" d="M40 160 C 60 80, 140 40, 200 60 M 60 190 C 90 120, 150 90, 210 100 M 20 120 C 50 60, 110 30, 170 30" />,
    <path key="c" d="M30 200 L 100 40 L 130 120 L 160 30 L 220 200 M 60 200 L 60 120 M 200 200 L 200 100" />,
    <path key="d" d="M120 20 L 135 90 L 210 105 L 135 120 L 120 200 L 105 120 L 30 105 L 105 90 Z M 60 40 l 8 20 M 190 170 l -8 -20" />,
  ];
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="th-glow" />
      <div className="th-container relative">
        <h2 className="th-h2">How It Works</h2>
        <div className="th-how__grid mt-16">
          {steps.map((s, i) => (
            <div className="th-how__card" key={s.t}>
              <svg viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {icons[i]}
              </svg>
              <h3 className="relative whitespace-pre-line text-[0.95rem] font-medium leading-tight">{s.t}</h3>
              <p className="relative mt-2 text-xs text-[var(--th-muted)]">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="th-rule-cta mt-16">
          <a href="#" className="th-pill">Get Started</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. Match Based On Compatibility                                    */
/* ---------------------------------------------------------------- */
function Match() {
  return (
    <section className="th-match">
      <div className="th-match__bg" style={{ backgroundImage: `url(${IMG.matchBg})` }} />
      <div className="th-container relative">
        <h2 className="th-h2">
          Match Based On
          <br />
          Compatibility
        </h2>
        <div className="mt-6 text-center">
          <a href="#" className="th-pill">Find Travelers</a>
        </div>

        <div className="th-match__stage">
          {/* 좌: 정보 카드 */}
          <div className="th-glass w-full max-w-[220px] justify-self-end p-4">
            <div className="flex items-center justify-between">
              <span className="text-[0.62rem] text-white/80">Information Data</span>
              <span className="h-5 w-5 rounded-full border border-white/60" />
            </div>
            <div className="mt-3 flex gap-3">
              <img src={IMG.thumbs[1]} alt="" className="h-28 w-20 rounded-md object-cover" />
              <ul className="flex flex-col justify-between py-1 text-xs">
                {[["Distance Covered", "3,320 Km"], ["Countries Visited", "38 Countries"], ["Travel Rating", "98% Verified"]].map(([k, v]) => (
                  <li key={k}>
                    <span className="block text-[0.55rem] text-white/70">{k}</span>
                    <span className="font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-md bg-white/15 p-2">
              <img src={IMG.thumbs[2]} alt="" className="h-12 w-16 rounded object-cover" />
              <div className="text-xs">
                <span className="block text-[0.55rem] text-white/70">Next Trip</span>
                <span className="font-medium">2,100 Km</span>
              </div>
            </div>
          </div>

          {/* 중: 메인 사진 */}
          <div className="th-match__photo">
            <img src={IMG.matchMain} alt="" />
          </div>

          {/* 우: 썸네일 스트립 */}
          <div className="th-thumbs">
            {IMG.thumbs.map((s) => (
              <img key={s} src={s} alt="" />
            ))}
            <button type="button" aria-label="더 보기">+</button>
          </div>
        </div>

        {/* 두 번째 사진 */}
        <div className="th-match__photo mx-auto mt-3">
          <img src={IMG.matchSecond} alt="" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. Feedback Trusted Travel Partners                                */
/* ---------------------------------------------------------------- */
function Feedback() {
  return (
    <section className="th-container py-24 md:py-32">
      <h2 className="th-h2">
        Feedback Trusted
        <br />
        Travel Partners
      </h2>
      <div className="th-feedback__stage mt-12">
        <div className="th-feedback__side th-feedback__side--l2">
          <img src={IMG.feedbackSides[0]} alt="" />
        </div>
        <div className="th-feedback__side th-feedback__side--l1">
          <img src={IMG.feedbackSides[1]} alt="" />
        </div>
        <div className="th-feedback__main">
          <img src={IMG.feedbackMain} alt="" />
        </div>
        <div className="th-feedback__side th-feedback__side--r1">
          <img src={IMG.feedbackSides[2]} alt="" />
        </div>
        <div className="th-feedback__side th-feedback__side--r2">
          <img src={IMG.feedbackSides[3]} alt="" />
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-md text-center text-[1.05rem] leading-snug">
        &ldquo;Meet real travelers who share your vibe. Match on interests, travel
        style, and start planning adventures together&rdquo;
      </p>
      <div className="th-rule-cta mt-16">
        <a href="#" className="th-pill">All Testimonial</a>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. Join The Global Traveler Network                                */
/* ---------------------------------------------------------------- */
function Join() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="th-glow" />
      <div className="th-container relative">
        <h2 className="th-h2">
          Join The Global
          <br />
          Traveler Network
        </h2>
        <div className="mt-6 text-center">
          <a href="#" className="th-pill th-pill--dark">Get Started</a>
        </div>
        <div className="th-fan">
          {IMG.fan.map((s) => (
            <div className="th-fan__card" key={s}>
              <img src={s} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 7. 푸터                                                            */
/* ---------------------------------------------------------------- */
function Footer() {
  const cols: Record<string, string[]> = {
    Product: ["Features", "Pricing", "Integration"],
    Legal: ["Terms", "Privacy", "Legal"],
    Resources: ["Blog", "Guides", "Support"],
    Company: ["About", "Careers", "Press"],
  };
  return (
    <footer className="th-footer">
      <svg className="th-footer__plane" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" aria-hidden>
        <path d="M30 110 L 100 90 L 60 40 L 80 34 L 130 82 L 175 70 C 190 66 194 84 180 90 L 140 104 L 130 160 L 112 166 L 104 114 L 60 126 L 52 150 L 40 152 L 38 128 L 22 118 Z" />
      </svg>
      <div className="th-container relative grid gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">Newsletter</h3>
          <p className="mt-2 max-w-[260px] text-[0.68rem] text-[var(--th-muted)]">
            There is a unique thrill in the simple act of packing a bag and
            stepping out the door, knowing a new corner of the world awaits
            discovery
          </p>
          <form className="th-footer__input mt-6" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="jualaislam@gmail.com" aria-label="이메일" />
            <button type="submit" className="th-pill th-pill--lime text-[0.68rem]">Subscribe</button>
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
        <span aria-hidden>travo</span>
        <div className="th-footer__stack">
          {IMG.stack.map((s) => (
            <img key={s} src={s} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </footer>
  );
}
