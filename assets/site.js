/* Comportement du site : intro, liens depuis config/config.js, FAQ, apparitions au défilement.
   Les liens et les prix se modifient dans config/config.js, pas ici. */
(function () {
  var C = window.SITE_CONFIG || {};
  var doc = document.documentElement;

  /* ---------- 1. Liens et textes depuis la config ---------- */
  function telFmt(n) {
    n = String(n || "").replace(/\D/g, "");
    if (n.indexOf("225") === 0 && n.length === 13) {
      var r = n.slice(3);
      return "+225 " + r.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }
    return n ? "+" + n : "";
  }
  var LINKS = {
    paiement: C.paiement,
    whatsapp1: C.whatsapp1 ? "https://wa.me/" + String(C.whatsapp1).replace(/\D/g, "") : "",
    whatsapp2: C.whatsapp2 ? "https://wa.me/" + String(C.whatsapp2).replace(/\D/g, "") : "",
    telegram: C.telegram ? "https://t.me/" + String(C.telegram).replace(/^@/, "") : "",
    tiktokFormateur: C.tiktokFormateur
  };
  document.querySelectorAll("[data-link]").forEach(function (a) {
    var url = LINKS[a.getAttribute("data-link")];
    if (url) {
      a.href = url;
      if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    }
  });
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    var v = telFmt(C[el.getAttribute("data-tel")]);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-text]").forEach(function (el) {
    var v = C[el.getAttribute("data-text")];
    if (v) el.textContent = "@" + String(v).replace(/^@/, "");
  });
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = C[el.getAttribute("data-cfg")];
    if (v) el.textContent = v;
  });

  /* ---------- 2. Vidéos YouTube (se lancent au clic, dans la page) ---------- */
  function ytId(url) {
    if (!url) return "";
    var m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : "";
  }
  var vertical = C.formatVideo !== "horizontal";
  document.querySelectorAll("[data-youtube]").forEach(function (box) {
    var key = box.getAttribute("data-youtube");
    var id = ytId(C[key]);
    if (!id) return;
    if (vertical) {
      box.style.aspectRatio = "9 / 16";
      box.style.maxWidth = "380px";
      box.style.width = "100%";
    }
    if (key === "youtubeCommentPayer") {
      var sec = document.getElementById("section-comment-acheter");
      if (sec) sec.hidden = false;
    }
    box.innerHTML = '<button type="button" class="yt-play" aria-label="Lire la vidéo">' +
      '<img src="' + ((key === "youtubeOpportunite" && C.couvertureVideo) ? C.couvertureVideo : 'https://i.ytimg.com/vi/' + id + (vertical ? '/oardefault.jpg' : '/hqdefault.jpg')) + '" alt="Regarder la vidéo" loading="lazy">' + '<em class="yt-hint">Clique pour regarder la vidéo</em>' +
      '<span><svg width="28" height="28" viewBox="0 0 24 24" fill="#07070A" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg></span></button>';
    box.querySelector(".yt-play").addEventListener("click", function () {
      box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0&playsinline=1" title="Vidéo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    });
  });

  /* ---------- 3. FAQ ---------- */
  var qs = document.querySelectorAll(".faq-q");
  function setOpen(btn, open) {
    var ans = btn.parentNode.querySelector(".faq-a");
    if (ans) ans.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    var sign = btn.querySelectorAll("span")[1];
    if (sign) sign.textContent = open ? "−" : "+";
  }
  qs.forEach(function (btn, i) {
    setOpen(btn, i === 0);
    btn.addEventListener("click", function () {
      var willOpen = btn.getAttribute("aria-expanded") !== "true";
      qs.forEach(function (b) { setOpen(b, false); });
      setOpen(btn, willOpen);
    });
  });

  /* ---------- 4. Vidéos du mur (lecture muette en boucle) ---------- */
  document.querySelectorAll("video").forEach(function (v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  /* ---------- 5. Apparitions au défilement ---------- */
  var els = document.querySelectorAll(".s-rv");
  if (els.length) {
    doc.classList.add("s-js");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        var k = 0;
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.style.transitionDelay = (k * 0.09) + "s";
            k++;
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("in"); });
    }
  }

  /* ---------- 6. Intro : « flow » qui s'ouvre comme une porte ---------- */
  var intro = document.getElementById("intro");
  var site = document.getElementById("site");
  if (!intro || !site) return;
  var opened = false;
  function open() {
    if (opened) return;
    opened = true;
    intro.querySelectorAll(".s-door, .s-hud").forEach(function (el) { el.classList.add("is-open"); });
    site.classList.add("s-on");
    setTimeout(function () { intro.parentNode && intro.parentNode.removeChild(intro); }, 700);
  }
  var skip = document.getElementById("intro-skip");
  if (skip) skip.addEventListener("click", open);
  var started = false;
  function start() {
    if (started) return;
    started = true;
    requestAnimationFrame(function () { requestAnimationFrame(function () { setTimeout(open, 200); }); });
  }
  function whenVisible() {
    if (document.visibilityState === "visible") return start();
    document.addEventListener("visibilitychange", function onVis() {
      if (document.visibilityState === "visible") { document.removeEventListener("visibilitychange", onVis); start(); }
    });
  }
  if (document.readyState !== "loading") whenVisible(); else document.addEventListener("DOMContentLoaded", whenVisible);
  setTimeout(start, 3000);
})();
