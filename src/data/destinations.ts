export interface Destination {
  name: string;
  /** images/ 기준 파일명 */
  image: string;
  alt: string;
  /** 실제 숫자 확정 전 플레이스홀더 — 임의 수치 기입 금지 */
  pill: string;
}

export const DESTINATIONS: Destination[] = [
  {
    name: "JAPAN",
    image: "journal-japan.webp",
    alt: "일본의 테니스 코트",
    pill: "후보 코트 3곳",
  },
  {
    name: "BALI",
    image: "journal-bali.webp",
    alt: "발리의 테니스 코트",
    pill: "후보 코트 3곳",
  },
  {
    name: "VIETNAM",
    image: "journal-vietnam.webp",
    alt: "베트남의 테니스 코트",
    pill: "후보 코트 3곳",
  },
];
