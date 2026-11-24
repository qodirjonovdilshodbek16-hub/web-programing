document.addEventListener("DOMContentLoaded", function () {
  var S = window.Store, list = document.getElementById("cartList"), sum = document.getElementById("summary");

  function paint() {
    var items = S.items();
    if (!items.length) {
      list.innerHTML = '<div class="empty"><h2>Your cart is empty</h2><p>Browse the shop and add something you like.</p><a class="btn" href="shop.html">Go to shop</a></div>';
      sum.style.display = "none";
      return;
    }
    sum.style.display = "";
    list.innerHTML = '<div class="panel"><h2>Cart (' + S.count() + " items)</h2>" + items.map(function (it) {
      var p = it.product;
      return '<div class="line"><a class="th" href="product.html?id=' + p.id + '">' + S.art(p, it.colorIndex) + "</a>" +
        "<div><b><a href=\"product.html?id=" + p.id + '">' + S.esc(p.name) + "</a></b><br><small>" + S.esc(p.brand) + " · " + S.esc(it.color.n) + " · " + S.money(p.price) + " each</small><br>" +
        '<button class="link" type="button" data-rm="' + it.key + '">Remove</button></div>' +
        '<div><div class="stepper"><button type="button" data-dec="' + it.key + '" aria-label="Decrease">−</button><span>' + it.qty + '</span><button type="button" data-inc="' + it.key + '" aria-label="Increase">+</button></div>' +
        '<div style="text-align:right;font-weight:800;margin-top:6px">' + S.money(p.price * it.qty) + "</div></div></div>";
    }).join("") + '<p><button class="link" type="button" id="clearAll">Clear cart</button></p></div>';
    totals();
  }

  function totals() {
    var t = S.totals(), pr = t.promo;
    document.getElementById("sub").textContent = S.money(t.subtotal);
    document.getElementById("disc").textContent = t.discount ? "−" + S.money(t.discount) : "—";
    document.getElementById("ship").textContent = t.shipping ? S.money(t.shipping) : "Free";
    document.getElementById("tot").textContent = S.money(t.total);
    document.getElementById("promoState").textContent = pr ? pr.code + ": " + pr.info.label : "";
    var left = S.freeShipOver - (t.subtotal - t.discount);
    document.getElementById("shipHint").textContent = left > 0 && !(pr && pr.info.freeShip) ? "Add " + S.money(left) + " more for free shipping." : "You qualify for free standard shipping.";
  }

  list.addEventListener("click", function (e) {
    var t = e.target, k;
    if ((k = t.getAttribute("data-rm"))) S.remove(k);
    else if ((k = t.getAttribute("data-inc"))) { var a = S.items().filter(function (i) { return i.key === k; })[0]; S.setQty(k, a.qty + 1); }
    else if ((k = t.getAttribute("data-dec"))) { var b = S.items().filter(function (i) { return i.key === k; })[0]; S.setQty(k, b.qty - 1); }
    else if (t.id === "clearAll") S.clear();
    else return;
    paint();
  });

  document.getElementById("promoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var r = S.applyPromo(document.getElementById("promoIn").value), m = document.getElementById("promoMsg");
    m.className = "msg " + (r.ok ? "ok" : "bad"); m.textContent = r.message;
    totals();
  });
  paint();
});
