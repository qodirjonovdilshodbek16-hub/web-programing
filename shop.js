document.addEventListener("DOMContentLoaded", function () {
  var S = window.Store, P = S.products;
  var qs = new URLSearchParams(location.search);
  var state = { cat: qs.get("cat") || "all", q: (qs.get("q") || "").toLowerCase(), brand: "all", max: 0, sort: "featured", onlyNew: false };
  if (state.cat !== "all" && !S.cats[state.cat]) state.cat = "all";

  var maxPrice = Math.ceil(Math.max.apply(null, P.map(function (x) { return x.price; })) / 50) * 50;
  var $ = function (id) { return document.getElementById(id); };
  state.max = maxPrice;

  $("price").max = maxPrice; $("price").value = maxPrice;
  $("search").value = qs.get("q") || "";
  $("brand").innerHTML = '<option value="all">All brands</option>' + S.brands().map(function (b) { return "<option>" + S.esc(b) + "</option>"; }).join("");

  function chips() {
    var html = '<button class="chip" type="button" data-cat="all" aria-pressed="' + (state.cat === "all") + '">All (' + P.length + ")</button>";
    Object.keys(S.cats).forEach(function (k) {
      var c = P.filter(function (x) { return x.cat === k; }).length;
      html += '<button class="chip" type="button" data-cat="' + k + '" aria-pressed="' + (state.cat === k) + '">' + S.cats[k] + " (" + c + ")</button>";
    });
    $("chips").innerHTML = html;
  }

  function apply() {
    var list = P.filter(function (x) {
      if (state.cat !== "all" && x.cat !== state.cat) return false;
      if (state.brand !== "all" && x.brand !== state.brand) return false;
      if (x.price > state.max) return false;
      if (state.onlyNew && !x.isNew) return false;
      if (state.q && (x.name + " " + x.brand + " " + x.short + " " + S.cats[x.cat]).toLowerCase().indexOf(state.q) < 0) return false;
      return true;
    });
    if (state.sort === "low") list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === "high") list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    $("count").textContent = list.length + " of " + P.length + " products";
    $("priceOut").textContent = "Up to " + S.money(state.max);
    if (!list.length) $("grid").innerHTML = '<div class="empty" style="grid-column:1/-1"><b>No products match.</b><br>Try removing a filter.<br><br><button class="btn small" type="button" id="reset">Reset filters</button></div>';
    else S.render($("grid"), list);
    chips();
  }

  $("chips").addEventListener("click", function (e) { var b = e.target.closest("[data-cat]"); if (b) { state.cat = b.getAttribute("data-cat"); apply(); } });
  $("search").addEventListener("input", function (e) { state.q = e.target.value.trim().toLowerCase(); apply(); });
  $("brand").addEventListener("change", function (e) { state.brand = e.target.value; apply(); });
  $("price").addEventListener("input", function (e) { state.max = Number(e.target.value); apply(); });
  $("sort").addEventListener("change", function (e) { state.sort = e.target.value; apply(); });
  $("onlyNew").addEventListener("change", function (e) { state.onlyNew = e.target.checked; apply(); });
  $("fbtn").addEventListener("click", function () { $("filters").classList.toggle("open"); });
  $("grid").addEventListener("click", function (e) {
    if (e.target.id === "reset") {
      state = { cat: "all", q: "", brand: "all", max: maxPrice, sort: "featured", onlyNew: false };
      $("search").value = ""; $("brand").value = "all"; $("price").value = maxPrice; $("sort").value = "featured"; $("onlyNew").checked = false;
      apply();
    }
  });
  apply();
});
