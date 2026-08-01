import { BgMedia } from "./ui/BgMedia";
import { CtaButton } from "./ui/CtaButton";

export function Hero() {
  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden text-center text-white"
      aria-label="러브코트 소개"
    >
      <BgMedia
        file="hero.webp"
        fileMobile="hero-mo.webp"
        srcSet="/images/hero-800.webp 800w, /images/hero-1400.webp 1400w, /images/hero-2000.webp 2000w"
        sizes="100vw"
        alt="해외 테니스 코트의 전경"
        eager
        className="absolute inset-0 z-0"
        imgClassName="animate-kenburns motion-reduce:animate-none"
      />
      {/* 텍스트 가독용 오버레이 + 하단 그라데이션 */}
      <div className="absolute inset-0 z-1 bg-black/30" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-1/2 bottom-0 z-1 bg-gradient-to-b from-transparent to-black/25"
        aria-hidden="true"
      />

      <div className="relative z-2 max-w-160 px-6">
        <h1 className="text-balance break-keep text-[clamp(1.9rem,8vw,3.4rem)] font-extrabold leading-tight tracking-[-0.02em]">
          여행에서 가장 기대되는 장면이, 테니스가 되도록
        </h1>
        <p className="mt-[18px] break-keep text-[clamp(0.95rem,3.6vw,1.1rem)] text-white/92">
          좋은 코트를 찾아 떠나는 소규모 테니스 트립.
          <br />
          러브코트가 첫 번째 여행을 준비하고 있습니다.
        </p>
        <div className="mt-[34px]">
          <CtaButton variant="hero">대기명단 등록하기</CtaButton>
          <p className="mt-3 text-[0.85rem] text-white/80">1분이면 끝나요</p>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 z-2 h-11 w-px origin-top animate-hintdrop bg-white/60 motion-reduce:animate-none motion-reduce:opacity-50"
        aria-hidden="true"
      />
    </section>
  );
}
