/* Shared behaviour: theme, mobile menu, header search, newsletter. */
(function () {
  var root = document.documentElement;
  function getTheme() { try { return localStorage.getItem("technest-theme"); } catch (e) { return null; } }
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("technest-theme", t); } catch (e) {}
    var b = document.getElementById("themeBtn");
    if (b) { b.textContent = t === "dark" ? "☀" : "☾"; b.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode"); }
  }
  var saved = getTheme();
  setTheme(saved || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", function () {
    var tb = document.getElementById("themeBtn");
    if (tb) tb.addEventListener("click", function () { setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"); });

    var mb = document.getElementById("menuBtn"), nav = document.getElementById("mainNav");
    if (mb && nav) mb.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", open ? "true" : "false");
    });

    var nf = document.getElementById("newsForm");
    if (nf) nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var inp = nf.querySelector("input"), out = document.getElementById("newsMsg");
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inp.value.trim());
      out.textContent = ok ? "Thanks! (Demo only — nothing was sent or stored.)" : "Please enter a valid email address.";
      if (ok) inp.value = "";
    });
  });
})();
