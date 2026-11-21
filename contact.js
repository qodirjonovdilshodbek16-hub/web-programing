/* Contact form: validation with inline messages (demo, nothing is sent) */
(function () {
  var form = document.getElementById("contactForm");
  var success = document.getElementById("success");

  var fields = {
    name: {
      el: document.getElementById("name"),
      err: document.getElementById("nameErr"),
      check: function (v) {
        if (v.trim().length < 2) return "Please enter your full name.";
        return "";
      }
    },
    email: {
      el: document.getElementById("email"),
      err: document.getElementById("emailErr"),
      check: function (v) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Please enter a valid email address.";
        return "";
      }
    },
    message: {
      el: document.getElementById("message"),
      err: document.getElementById("messageErr"),
      check: function (v) {
        if (v.trim().length < 10) return "Message must be at least 10 characters.";
        return "";
      }
    }
  };

  function validate(key) {
    var f = fields[key];
    var msg = f.check(f.el.value);
    f.err.textContent = msg;
    f.el.classList.toggle("invalid", Boolean(msg));
    f.el.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener("blur", function () { validate(key); });
    fields[key].el.addEventListener("input", function () {
      if (fields[key].el.classList.contains("invalid")) validate(key);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    success.style.display = "none";
    var ok = true;
    var firstBad = null;
    Object.keys(fields).forEach(function (key) {
      if (!validate(key)) {
        ok = false;
        if (!firstBad) firstBad = fields[key].el;
      }
    });
    if (!ok) { firstBad.focus(); return; }
    form.reset();
    success.style.display = "block";
  });
})();
