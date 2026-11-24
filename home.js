document.addEventListener("DOMContentLoaded", function () {
  var S = window.Store, P = S.products;
  function pick(id) { return S.byId(id); }

  var hero = document.getElementById("heroArt");
  if (hero) hero.innerHTML = [7, 22, 13, 50].map(function (id) {
    var p = pick(id);
    return '<a href="product.html?id=' + id + '" aria-label="' + S.esc(p.name) + '">' + S.art(p, 0) + "</a>";
  }).join("");

  var cats = document.getElementById("catTiles");
  if (cats) cats.innerHTML = Object.keys(S.cats).map(function (k) {
    var list = P.filter(function (x) { return x.cat === k; });
    return '<a class="cat" href="shop.html?cat=' + k + '">' + S.art(list[0], 0) + "<b>" + S.cats[k] + "</b><small>" + list.length + " products</small></a>";
  }).join("");

  S.render(document.getElementById("newGrid"), P.filter(function (x) { return x.isNew; }).slice(0, 8));
  S.render(document.getElementById("audioGrid"), P.filter(function (x) { return x.cat === "audio"; }).slice(0, 4));
  S.render(document.getElementById("gamingGrid"), P.filter(function (x) { return x.cat === "gaming"; }).slice(0, 4));

  var n = document.getElementById("prodCount");
  if (n) n.textContent = P.length;
});
