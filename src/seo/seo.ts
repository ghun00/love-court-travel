import { INSTAGRAM_URL } from "../config";
import { FAQ_GROUPS } from "../data/faq";
import { getTrip, isBookable, type Trip } from "../data/trips";

export const SITE_URL = "https://love-court.kr";
export const SITE_NAME = "러브코트";

const DEFAULT_OG_IMAGE = "/og/og-default.png";

export interface Seo {
  title: string;
  description: string;
  /** 절대 URL */
  url: string;
  /** 절대 URL */
  image: string;
  noindex?: boolean;
  jsonLd: object[];
}

/** 트립별 검색·공유용 문구 — 없으면 trip.name 기반 기본값 */
const TRIP_SEO: Record<string, { title: string; image: string; startDate?: string; endDate?: string }> = {
  hakone: {
    title: "하코네 테니스 여행 2박 3일 (11.07–09) | 러브코트",
    image: "/og/og-hakone.jpg",
    startDate: "2026-11-07",
    endDate: "2026-11-09",
  },
};

const abs = (path: string) => `${SITE_URL}${path}`;

const ORGANIZATION = {
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  alternateName: "LOVE COURT",
  url: SITE_URL,
  logo: abs("/logo_lovecourt_mainOrange.png"),
  description: "혼자 오는 사람들을 위한 소규모 해외 테니스 여행을 기획·운영하는 여행사",
  sameAs: [INSTAGRAM_URL],
  email: "gks3628@gmail.com",
  telephone: "+82-10-2439-3628",
  address: {
    "@type": "PostalAddress",
    streetAddress: "미사대로 550, 10층 C10-0001호,1003호",
    addressLocality: "하남시",
    addressRegion: "경기도",
    addressCountry: "KR",
  },
};

const HOME: Omit<Seo, "url" | "jsonLd"> = {
  title: "러브코트 | 혼자 오라고 만든 해외 테니스 여행",
  description:
    "해외의 좋은 코트에서 치고, 혼자 온 6~8명과 친구가 되는 소규모 테니스 트립. 코트·숙소·이동·스냅 촬영까지 러브코트가 준비해요.",
  image: abs(DEFAULT_OG_IMAGE),
};

function homeSeo(): Seo {
  return {
    ...HOME,
    url: abs("/"),
    jsonLd: [
      { "@context": "https://schema.org", ...ORGANIZATION },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "ko-KR",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_GROUPS.flatMap((g) =>
          g.items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        ),
      },
    ],
  };
}

function tripSeo(trip: Trip): Seo {
  const meta = TRIP_SEO[trip.id];
  const url = abs(`/trips/${trip.id}`);
  const prices = (trip.rooms ?? []).filter((r) => !r.disabled).map((r) => r.price);
  const lowPrice = prices.length ? Math.min(...prices) : undefined;
  const description = [trip.summary, trip.totalPrice && `${trip.totalPrice}.`].filter(Boolean).join(" ");

  return {
    title: meta?.title ?? `${trip.name} | ${SITE_NAME}`,
    description,
    url,
    image: abs(meta?.image ?? `/images/${trip.heroImage}`),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: trip.name,
        description: trip.summary,
        url,
        image: abs(meta?.image ?? `/images/${trip.heroImage}`),
        touristType: "테니스 여행자",
        itinerary: { "@type": "Place", name: trip.destination },
        provider: { "@id": ORGANIZATION["@id"], "@type": "TravelAgency", name: SITE_NAME, url: SITE_URL },
        ...(lowPrice !== undefined && {
          offers: {
            "@type": "Offer",
            url,
            price: lowPrice,
            priceCurrency: "KRW",
            availability: trip.spotsLeft > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            ...(meta?.startDate && { availabilityStarts: meta.startDate }),
          },
        }),
        ...(meta?.startDate && {
          subjectOf: {
            "@type": "Event",
            name: trip.name,
            startDate: meta.startDate,
            endDate: meta.endDate,
            location: { "@type": "Place", name: trip.destination },
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          },
        }),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: abs("/") },
          { "@type": "ListItem", position: 2, name: trip.name, item: url },
        ],
      },
    ],
  };
}

/** 경로 → 페이지 메타. 검색 노출 대상이 아닌 경로는 noindex + 홈 문구 */
export function getSeo(pathname: string): Seo {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return homeSeo();

  const m = path.match(/^\/trips\/([^/]+)$/);
  const trip = m ? getTrip(m[1]) : undefined;
  if (trip && isBookable(trip)) return tripSeo(trip);

  return { ...HOME, url: abs(path), noindex: true, jsonLd: [] };
}

/** 프리렌더·sitemap 대상 경로 (noindex 페이지 제외) */
export function getIndexablePaths(trips: Trip[]): string[] {
  return ["/", ...trips.filter(isBookable).map((t) => `/trips/${t.id}`)];
}
