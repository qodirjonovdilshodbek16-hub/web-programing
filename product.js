document.addEventListener("DOMContentLoaded", function () {
  var S = window.Store, root = document.getElementById("product");
  var id = Number(new URLSearchParams(location.search).get("id"));
  var p = S.byId(id);
  if (!p) {
    root.innerHTML = '<div class="empty"><h1>Product not found</h1><p>It may have been removed.</p><a class="btn" href="shop.html">Back to shop</a></div>';
    return;
  }
  document.title = p.name + " — TechNest";
  var ci = 0, qty = 1;

  function draw() {
    var c = p.colors[ci];
    var low = p.stock <= 5;
    root.innerHTML =
      '<div class="crumbs"><a href="index.html">Home</a> / <a href="shop.html?cat=' + p.cat + '">' + S.cats[p.cat] + "</a> / " + S.esc(p.name) + "</div>" +
      '<div class="pd"><div class="pd-art" style="--tint:' + c.h + '">' + S.art(p, ci) + "</div><div>" +
      '<p class="pbrand">' + S.esc(p.brand) + (p.isNew ? " · New" : "") + "</p><h1>" + S.esc(p.name) + "</h1>" +
      "<p>" + S.esc(p.blurb) + "</p>" +
      '<div class="price">' + S.money(p.price) + "</div>" +
      (p.approx ? '<p class="note">Approximate US list price for a base configuration; it may differ from current retail prices.</p>' : "") +
      "<p><b>Color:</b> " + S.esc(c.n) + "</p>" +
      '<div class="swatches">' + p.colors.map(function (x, i) {
        return '<button class="sw" type="button" data-ci="' + i + '" style="background:' + x.h + '" title="' + S.esc(x.n) + '" aria-label="' + S.esc(x.n) + '" aria-pressed="' + (i === ci) + '"></button>';
      }).join("") + "</div>" +
      '<p class="stock' + (low ? " low" : "") + '">' + S.stockText(p) + "</p>" +
      '<div class="qty-row"><div class="stepper"><button type="button" id="minus" aria-label="Decrease quantity">−</button><span id="q">' + qty + '</span><button type="button" id="plus" aria-label="Increase quantity">+</button></div>' +
      '<button class="btn" type="button" id="addBtn">Add to cart</button><a class="btn ghost" href="cart.html">View cart</a></div>' +
      "<h2>Highlights</h2><ul class=\"feat\">" + p.features.map(function (f) { return "<li>" + S.esc(f) + "</li>"; }).join("") + "</ul>" +
      "<h2>Specifications</h2><table class=\"specs\">" + p.specs.map(function (r) { return "<tr><th>" + S.esc(r[0]) + "</th><td>" + S.esc(r[1]) + "</td></tr>"; }).join("") + "</table>" +
      "</div></div>";

    root.querySelectorAll(".sw").forEach(function (b) { b.addEventListener("click", function () { ci = Number(b.getAttribute("data-ci")); draw(); }); });
    document.getElementById("minus").onclick = function () { qty = Math.max(1, qty - 1); document.getElementById("q").textContent = qty; };
    document.getElementById("plus").onclick = function () { qty = Math.min(p.stock, qty + 1); document.getElementById("q").textContent = qty; };
    document.getElementById("addBtn").onclick = function () { if (S.add(p.id, ci, qty)) qty = 1, document.getElementById("q").textContent = 1; };
  }
  draw();

  var rel = S.products.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4);
  S.render(document.getElementById("related"), rel);
});
