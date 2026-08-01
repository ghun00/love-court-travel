import { VALUE_PANELS, type ValuePanel } from "../data/values";
import { useParallax } from "../hooks/useParallax";
import { useReveal, revealClass } from "../hooks/useReveal";
import { BgMedia } from "./ui/BgMedia";

function Panel({ panel }: { panel: ValuePanel }) {
  const bgRef = useParallax<HTMLElement>();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <article
      className="relative flex min-h-svh items-end overflow-hidden text-white"
      aria-label={panel.keyword}
    >
      {/* 패럴랙스 여유분 — translateY 최대 10% 이동에도 빈틈 없도록 */}
      <BgMedia
        ref={bgRef}
        file={panel.image}
        fileMobile={panel.imageMobile}
        alt={panel.alt}
        className="absolute inset-x-0 -inset-y-[10%] z-0 motion-reduce:inset-0 motion-reduce:transform-none"
      />
      <div className="absolute inset-0 z-1 bg-black/30" aria-hidden="true" />

      <div
        ref={ref}
        className={`relative z-2 max-w-160 px-6 pb-24 md:px-16 md:pb-30 xl:max-w-190 xl:px-24 xl:pb-35 ${revealClass(visible)}`}
      >
        <h2 className="text-[clamp(3rem,14vw,6.5rem)] font-extrabold leading-none tracking-[0.04em] after:mt-[18px] after:block after:h-[3px] after:w-14 after:bg-clay after:content-['']">
          {panel.keyword}
        </h2>
        <p className="mt-5 break-keep text-[clamp(1rem,3.8vw,1.15rem)] text-white/94">
          {panel.copy}
        </p>
      </div>
    </article>
  );
}

export function ValuePanels() {
  return (
    <section aria-label="러브코트의 세 가지 가치">
      {VALUE_PANELS.map((panel) => (
        <Panel key={panel.keyword} panel={panel} />
      ))}
    </section>
  );
}
