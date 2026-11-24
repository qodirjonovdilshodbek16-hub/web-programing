document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contactForm"), out = document.getElementById("formMsg");
  var rules = {
    name: function (v) { return v.trim().length >= 2 || "Enter your name."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a valid email."; },
    message: function (v) { return v.trim().length >= 10 || "Message must be at least 10 characters."; }
  };
  function check(n) {
    var el = form.elements[n], r = rules[n](el.value);
    document.getElementById("e-" + n).textContent = r === true ? "" : r;
    el.setAttribute("aria-invalid", r === true ? "false" : "true");
    return r === true;
  }
  Object.keys(rules).forEach(function (n) { form.elements[n].addEventListener("blur", function () { check(n); }); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { out.className = "msg bad"; out.textContent = "Please fix the highlighted fields."; return; }
    out.className = "msg ok"; out.textContent = "Thanks! This is a demo form, so your message was not sent anywhere.";
    form.reset();
  });
});
