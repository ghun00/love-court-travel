import { INSTAGRAM_URL } from "../config";

export function Footer() {
  return (
    <footer className="bg-near-black px-5 py-14 text-center text-white/85">
      <img
        className="mx-auto h-[22px] w-auto"
        src="/logo_lovecourt_white.png"
        alt="러브코트"
      />
      <a
        className="mt-5 inline-flex text-white/85 hover:text-clay"
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener"
        aria-label="러브코트 인스타그램"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <p className="mt-[18px] text-[0.75rem] text-white/50">
        © 2026 LOVE COURT. All rights reserved.
      </p>
    </footer>
  );
}
