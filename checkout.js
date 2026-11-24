document.addEventListener("DOMContentLoaded", function () {
  var S = window.Store, form = document.getElementById("coForm"), box = document.getElementById("coBox");
  var delivery = "standard";

  function lines() {
    var items = S.items();
    document.getElementById("coItems").innerHTML = items.map(function (it) {
      return '<div class="sum"><div><span>' + it.qty + " × " + S.esc(it.product.name) + " <small>(" + S.esc(it.color.n) + ")</small></span><span>" + S.money(it.product.price * it.qty) + "</span></div></div>";
    }).join("");
    var t = S.totals(delivery);
    document.getElementById("sub").textContent = S.money(t.subtotal);
    document.getElementById("disc").textContent = t.discount ? "−" + S.money(t.discount) : "—";
    document.getElementById("ship").textContent = t.shipping ? S.money(t.shipping) : "Free";
    document.getElementById("tot").textContent = S.money(t.total);
  }

  if (!S.items().length) {
    box.innerHTML = '<div class="empty"><h2>Nothing to check out</h2><p>Your cart is empty.</p><a class="btn" href="shop.html">Go to shop</a></div>';
    return;
  }
  lines();
  form.querySelectorAll("input[name=delivery]").forEach(function (r) { r.addEventListener("change", function () { delivery = r.value; lines(); }); });

  var rules = {
    name: function (v) { return v.trim().length >= 2 || "Enter your full name."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a valid email."; },
    address: function (v) { return v.trim().length >= 5 || "Enter your address."; },
    city: function (v) { return v.trim().length >= 2 || "Enter your city."; },
    zip: function (v) { return /^[A-Za-z0-9 -]{3,10}$/.test(v.trim()) || "Enter a valid postal code."; }
  };
  function check(name) {
    var el = form.elements[name], r = rules[name](el.value), err = document.getElementById("e-" + name);
    err.textContent = r === true ? "" : r;
    el.setAttribute("aria-invalid", r === true ? "false" : "true");
    return r === true;
  }
  Object.keys(rules).forEach(function (n) { form.elements[n].addEventListener("blur", function () { check(n); }); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { document.querySelector("[aria-invalid=true]").focus(); return; }
    var total = S.totals(delivery).total, num = "TN-" + Math.floor(100000 + Math.random() * 900000), name = form.elements.name.value.trim();
    S.clear(); S.clearPromo();
    box.innerHTML = '<div class="done panel"><div style="font-size:3rem">✓</div><h1>Demo order placed</h1><p>Thanks, ' + S.esc(name) + '. Your demo order number is <b>' + num + "</b> (total " + S.money(total) + ").</p>" +
      '<p class="note">This is a student project. No payment was taken, no data was sent anywhere and nothing will be shipped.</p><a class="btn" href="shop.html">Continue shopping</a></div>';
  });
});
