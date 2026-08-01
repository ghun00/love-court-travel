import { forwardRef, useState } from "react";

interface BgMediaProps {
  /** images/ 기준 파일명 (데스크톱) */
  file: string;
  /** images/ 기준 파일명 (모바일, max-width 767px) */
  fileMobile?: string;
  alt: string;
  /** figure 배치 클래스 (absolute inset 등) */
  className?: string;
  /** img에 추가할 클래스 (ken-burns 등) */
  imgClassName?: string;
  /** 히어로 등 최우선 로드 이미지 여부 */
  eager?: boolean;
  /** 데스크톱 srcset (히어로 반응형 소스) */
  srcSet?: string;
  sizes?: string;
}

/** 배경 사진 + 로드 실패 시 웜 그레이 플레이스홀더 폴백 */
export const BgMedia = forwardRef<HTMLElement, BgMediaProps>(function BgMedia(
  { file, fileMobile, alt, className = "", imgClassName = "", eager, srcSet, sizes },
  ref,
) {
  const [missing, setMissing] = useState(false);

  return (
    <figure
      ref={ref}
      data-file={file}
      className={`overflow-hidden bg-placeholder ${missing ? "img-missing" : ""} ${className}`}
    >
      <picture className="block h-full w-full">
        {fileMobile && (
          <source media="(max-width: 767px)" srcSet={`/images/${fileMobile}`} />
        )}
        {srcSet && <source srcSet={srcSet} sizes={sizes} />}
        <img
          src={`/images/${file}`}
          alt={alt}
          loading={eager ? undefined : "lazy"}
          {...(eager ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
          onError={() => setMissing(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </picture>
    </figure>
  );
});
