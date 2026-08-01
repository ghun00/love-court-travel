/* ============================================================
   LOVE COURT — script.js

   ★ Tally 폼 URL은 아래 한 곳만 교체하면 됩니다.
     예: const TALLY_FORM_URL = "https://tally.so/embed/xxxxxx?hideTitle=1&transparentBackground=1";
============================================================ */
const TALLY_FORM_URL = "TALLY_FORM_URL";

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tally 임베드 ---------- */
  var card = document.getElementById("tally-card");
  if (card) {
    if (TALLY_FORM_URL && TALLY_FORM_URL.indexOf("http") === 0) {
      var iframe = document.createElement("iframe");
      iframe.src = TALLY_FORM_URL;
      iframe.title = "러브코트 대기명단 등록 폼";
      iframe.loading = "lazy";
      iframe.setAttribute("allow", "clipboard-write");
      card.appendChild(iframe);
    } else {
      var pending = document.createElement("p");
      pending.className = "tally-pending";
      pending.textContent = "폼 준비 중입니다. (script.js 상단의 TALLY_FORM_URL을 교체하세요)";
      card.appendChild(pending);
    }
  }

  /* ---------- 상단 바: 히어로를 지나면 오프화이트 배경 ---------- */
  var topbar = document.getElementById("topbar");
  function onScrollTopbar() {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScrollTopbar, { passive: true });
  onScrollTopbar();

  /* ---------- 앵커 스무스 스크롤 (CSS scroll-behavior 폴백) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    });
  });

  /* ---------- 스크롤 페이드인 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (!reducedMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 가치 패널 배경 패럴랙스 (translateY 최대 10%) ---------- */
  if (!reducedMotion) {
    var panels = Array.prototype.slice.call(
      document.querySelectorAll(".value-panel .bg-media")
    );
    var ticking = false;

    function parallax() {
      ticking = false;
      var vh = window.innerHeight;
      panels.forEach(function (bg) {
        var rect = bg.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        /* 패널이 화면을 통과하는 비율(-1~1) → 배경 높이의 최대 ±5% 이동 */
        var progress = (rect.top + rect.height / 2 - vh / 2) / (vh + rect.height);
        bg.style.transform = "translateY(" + (progress * -10).toFixed(2) + "%)";
      });
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(parallax);
        }
      },
      { passive: true }
    );
    parallax();
  }
})();
