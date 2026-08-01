import { useState } from "react";
import { useReveal, revealClass } from "../hooks/useReveal";

export function Story() {
  const media = useReveal<HTMLElement>();
  const text = useReveal<HTMLDivElement>();
  const [missing, setMissing] = useState(false);

  return (
    <section className="px-5 pb-24 pt-6 md:px-8 md:pb-35 md:pt-10" aria-label="대표 스토리">
      <div className="mx-auto flex max-w-250 flex-col gap-8 md:flex-row md:items-center md:gap-14 xl:gap-20">
        <figure
          ref={media.ref}
          data-file="founder.webp"
          className={`relative aspect-[4/5] overflow-hidden rounded-card bg-placeholder md:flex-[0_0_42%] ${missing ? "img-missing" : ""} ${revealClass(media.visible)}`}
        >
          <img
            src="/images/founder.webp"
            alt="코트 위에 서 있는 러브코트 대표"
            loading="lazy"
            onError={() => setMissing(true)}
            className="h-full w-full object-cover"
          />
        </figure>
        <div ref={text.ref} className={`md:flex-1 ${revealClass(text.visible)}`}>
          <h2 className="mb-6 break-keep text-[clamp(1.5rem,5.6vw,2.2rem)] font-extrabold leading-tight tracking-[-0.01em]">
            왜 이 여행을 만들었나요?
          </h2>
          <p>저는 극 내향인입니다. 퇴사 후 처음으로 혼자 발리에 3주를 다녀왔어요.</p>
          <p className="mt-[18px]">
            혼자 간 여행이었는데, 가장 기억에 남는 건 처음 본 사람들과 라켓을 잡았던
            순간이었습니다. 말로는 어색했는데, 공을 주고받으니 금세 가까워졌어요. 운동을
            같이 하면 사람은 빨리 친해진다는 걸, 저 같은 내향인이 직접 겪었습니다.
          </p>
          <p className="mt-[18px]">
            돌아오는 비행기에서 생각했어요. 이 경험을, 혼자서는 선뜻 떠나기 어려운
            사람들에게 그대로 만들어주고 싶다고.
          </p>
          <p className="mt-[18px] font-bold text-court-green">— 러브코트 대표 [이름]</p>
        </div>
      </div>
    </section>
  );
}
