import { DESTINATIONS, type Destination } from "../data/destinations";
import { INSTAGRAM_URL } from "../config";
import { useReveal, revealClass } from "../hooks/useReveal";
import { BgMedia } from "./ui/BgMedia";
import { CtaButton } from "./ui/CtaButton";

const STAGGER = ["", "delay-120", "delay-240"];

function DestCard({ dest, index }: { dest: Destination; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();

  return (
    <li ref={ref} className={revealClass(visible, STAGGER[index])}>
      <div className="relative h-65 overflow-hidden rounded-card xl:h-85">
        <BgMedia file={dest.image} alt={dest.alt} className="absolute inset-0" />
        {/* 클립 타이포 가독용 하단 그라데이션 */}
        <div
          className="absolute inset-0 z-1 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden="true"
        />
        {/* 리퀴드 글래스 필 — 실데이터 라벨 (숫자는 확정 후 교체) */}
        <span className="dest-pill absolute left-4 top-4 z-2 rounded-full bg-white/14 px-3 py-1 text-[0.78rem] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-[4px]">
          {dest.pill}
        </span>
        {/* 거대 지명 타이포 — 하단 클리핑이 시그니처 (글자 높이의 약 60%만 노출) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-[0.8em] overflow-hidden text-[clamp(88px,9.5vw,120px)] xl:text-[clamp(72px,8.5vw,120px)]">
          <span className="block whitespace-nowrap text-center text-[1em] font-extrabold leading-none tracking-[-0.04em] text-white/55">
            {dest.name}
          </span>
        </div>
      </div>
      <div className="mt-3 break-keep">
        <p className="text-[0.95rem]">{dest.caption}</p>
        <p className="mt-1 text-[0.82rem] text-ink/55">{dest.courts}</p>
      </div>
    </li>
  );
}

export function Destinations() {
  const head = useReveal<HTMLDivElement>();
  const cta = useReveal<HTMLDivElement>();

  return (
    <section
      className="px-5 py-22 md:px-8 md:py-30"
      aria-label="다음 여행의 후보지들"
    >
      <div
        ref={head.ref}
        className={`mx-auto mb-11 max-w-160 text-center ${revealClass(head.visible)}`}
      >
        <h2 className="break-keep text-[clamp(1.5rem,5.6vw,2.2rem)] font-extrabold leading-tight tracking-[-0.01em]">
          다음 여행의 후보지들
        </h2>
        <p className="mt-3 break-keep text-ink/65">
          러브코트가 눈여겨보고 있는 코트들. 첫 번째 목적지는 여러분의 답으로 정해집니다.
        </p>
      </div>

      <ul className="mx-auto grid max-w-280 grid-cols-1 gap-4 xl:grid-cols-3">
        {DESTINATIONS.map((dest, i) => (
          <DestCard key={dest.name} dest={dest} index={i} />
        ))}
      </ul>

      <div
        ref={cta.ref}
        className={`mt-14 text-center ${revealClass(cta.visible)}`}
      >
        <p className="break-keep text-[clamp(1.1rem,4.2vw,1.35rem)] font-bold">
          어디로 먼저 가고 싶으세요?
        </p>
        <CtaButton variant="dest" className="mt-[18px]">
          대기명단에서 알려주세요
        </CtaButton>
        <p className="mt-7">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="border-b-2 border-clay pb-[3px] font-bold text-court-green no-underline hover:text-clay"
          >
            더 많은 코트 보기 →
          </a>
        </p>
      </div>
    </section>
  );
}
