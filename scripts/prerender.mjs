// vite build(클라이언트) + vite build --ssr 이후 실행 — 경로별 정적 HTML과 sitemap.xml 생성
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const serverEntry = join(dist, "server", "entry-server.js");
const { render, prerenderPaths, indexablePaths, SITE_URL } = await import(pathToFileURL(serverEntry).href);

const template = readFileSync(join(dist, "index.html"), "utf8");

for (const path of prerenderPaths) {
  const { html, head } = render(path);
  const page = template.replace("<!--app-head-->", head).replace('<div id="root"><!--app-html-->', `<div id="root" data-path="${path}">${html}`);
  // /trips/hakone → trips/hakone.html (vite preview·Vercel cleanUrls 모두 확장자 없는 주소로 매칭)
  const file = path === "/" ? join(dist, "index.html") : join(dist, `${path}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  console.log(`prerendered ${path}`);
}

const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" }); // YYYY-MM-DD (KST)
const urls = indexablePaths
  .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log("wrote sitemap.xml");

rmSync(join(dist, "server"), { recursive: true, force: true });
