/* =========================================================
   Phathu's 21st Birthday Celebration — Interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Lucide icons ---------- */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /* ---------- Sparkles ---------- */
  function buildSparkles(containerId, count) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var size = Math.random() * 3 + 1;
      var s = document.createElement("span");
      s.className = "sparkle";
      s.style.top = Math.random() * 100 + "%";
      s.style.left = Math.random() * 100 + "%";
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
      s.style.boxShadow = "0 0 " + size * 4 + "px hsl(var(--accent))";
      frag.appendChild(s);
    }
    container.appendChild(frag);
  }

  /* ---------- Countdown ---------- */
  // 20 June 2026 at 14:00 (South Africa Standard Time, UTC+2)
  var TARGET = new Date("2026-06-20T14:00:00+02:00").getTime();

  var els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds"),
  };

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function tick() {
    var diff = TARGET - Date.now();
    if (diff <= 0) {
      if (els.days) els.days.textContent = "00";
      if (els.hours) els.hours.textContent = "00";
      if (els.minutes) els.minutes.textContent = "00";
      if (els.seconds) els.seconds.textContent = "00";
      return false;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff / 3600000) % 24);
    var m = Math.floor((diff / 60000) % 60);
    var s = Math.floor((diff / 1000) % 60);

    if (els.days) els.days.textContent = pad(d);
    if (els.hours) els.hours.textContent = pad(h);
    if (els.minutes) els.minutes.textContent = pad(m);
    if (els.seconds) els.seconds.textContent = pad(s);
    return true;
  }

  function startCountdown() {
    tick();
    var id = setInterval(function () {
      if (!tick()) clearInterval(id);
    }, 1000);
  }

  /* ---------- Sticky navbar ---------- */
  function initNavbar() {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;
    var onScroll = function () {
      if (window.scrollY > 30) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    var setIcon = function (name) {
      toggle.innerHTML = '<i data-lucide="' + name + '"></i>';
      initIcons();
    };

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      setIcon(isOpen ? "x" : "menu");
    });

    // Close menu when a link is tapped
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        setIcon("menu");
      });
    });
  }

  /* ---------- Boot ---------- */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    initIcons();
    buildSparkles("heroSparkles", 35);
    buildSparkles("rsvpSparkles", 25);
    startCountdown();
    initNavbar();
    initMobileMenu();
  });
})();
