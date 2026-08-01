export interface ValuePanel {
  keyword: string;
  copy: string;
  /** images/ 기준 데스크톱 파일명 */
  image: string;
  /** images/ 기준 모바일 파일명 */
  imageMobile: string;
  alt: string;
}

export const VALUE_PANELS: ValuePanel[] = [
  {
    keyword: "MOVE",
    copy: "코트 예약, 이동, 준비물 걱정 없이. 라켓과 여행할 마음만 챙기세요.",
    image: "move.webp",
    imageMobile: "move-mo.webp",
    alt: "테니스 코트 전경과 랠리 장면",
  },
  {
    keyword: "CONNECT",
    copy: "함께 칠 사람을 찾아다닐 필요 없어요. 비슷한 취향의 사람들이 코트에서 만납니다. 혼자 와도 괜찮은 게 아니라, 혼자 오라고 만든 여행이에요.",
    image: "connect.webp",
    imageMobile: "connect-mo.webp",
    alt: "코트에서 복식 경기를 하며 함께 어울리는 사람들",
  },
  {
    keyword: "REMEMBER",
    copy: "그 코트에서 테니스 치는 당신의 모습, 전문 스냅으로 남겨드립니다. 여행이 끝나도 그 장면은 남습니다.",
    image: "remember.webp",
    imageMobile: "remember-mo.webp",
    alt: "코트 위에서 촬영한 스냅 느낌의 인물 사진",
  },
];
