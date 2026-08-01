import { TALLY_FORM_URL } from "../config";
import { useReveal, revealClass } from "../hooks/useReveal";

const BENEFITS = [
  "첫 트립 오픈 소식을 가장 먼저 받아요",
  "얼리버드 가격으로 가장 먼저 신청할 수 있어요",
];

export function Waitlist() {
  const title = useReveal<HTMLHeadingElement>();
  const benefits = useReveal<HTMLUListElement>();
  const card = useReveal<HTMLDivElement>();
  const note = useReveal<HTMLParagraphElement>();
  const formReady = TALLY_FORM_URL.startsWith("http");

  return (
    <section
      id="waitlist"
      className="bg-court-green px-5 pb-24 pt-22 text-white md:px-8 md:pb-[130px] md:pt-30"
      aria-label="대기명단 등록"
    >
      <div className="mx-auto max-w-160">
        <h2
          ref={title.ref}
          className={`break-keep text-center text-[clamp(1.5rem,5.6vw,2.2rem)] font-extrabold leading-tight ${revealClass(title.visible)}`}
        >
          첫 번째 트립, 가장 먼저 만나세요
        </h2>
        <ul
          ref={benefits.ref}
          className={`mx-auto mb-9 mt-7 max-w-105 ${revealClass(benefits.visible)}`}
        >
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="benefit-check relative break-keep pl-[30px] [&+&]:mt-2.5"
            >
              {benefit}
            </li>
          ))}
        </ul>
        <div
          ref={card.ref}
          className={`min-h-150 rounded-card bg-court-bg p-3 ${revealClass(card.visible)}`}
        >
          {formReady ? (
            <iframe
              src={TALLY_FORM_URL}
              title="러브코트 대기명단 등록 폼"
              loading="lazy"
              allow="clipboard-write"
              className="block min-h-144 w-full rounded-lg border-0"
            />
          ) : (
            <p className="flex min-h-144 items-center justify-center break-keep p-6 text-center text-[0.9rem] text-ink/55">
              폼 준비 중입니다. (src/config.ts의 TALLY_FORM_URL을 교체하세요)
            </p>
          )}
        </div>
        <p
          ref={note.ref}
          className={`mt-4 text-center text-[0.78rem] text-white/75 ${revealClass(note.visible)}`}
        >
          수집된 정보는 트립 안내 목적으로만 사용됩니다.
        </p>
      </div>
    </section>
  );
}
