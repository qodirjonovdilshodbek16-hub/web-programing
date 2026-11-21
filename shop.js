/* Shop page: category chips, search, sorting */
(function () {
  var grid = document.getElementById("grid");
  var chips = document.getElementById("chips");
  var q = document.getElementById("q");
  var sort = document.getElementById("sort");
  var count = document.getElementById("count");
  var empty = document.getElementById("empty");

  var params = new URLSearchParams(window.location.search);
  var startCat = params.get("cat");
  var state = { cat: Store.cats[startCat] ? startCat : "all" };

  function buildChips() {
    var html = '<button class="chip" type="button" data-cat="all">All</button>';
    Object.keys(Store.cats).forEach(function (key) {
      html += '<button class="chip" type="button" data-cat="' + key + '">' + Store.cats[key] + "</button>";
    });
    chips.innerHTML = html;
  }

  function paintChips() {
    chips.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", String(c.getAttribute("data-cat") === state.cat));
    });
  }

  function visible() {
    var term = q.value.trim().toLowerCase();
    var list = Store.products.filter(function (p) {
      var okCat = state.cat === "all" || p.cat === state.cat;
      var okText = !term || (p.name + " " + p.desc + " " + Store.cats[p.cat]).toLowerCase().indexOf(term) !== -1;
      return okCat && okText;
    });
    var mode = sort.value;
    if (mode === "low") list.sort(function (a, b) { return a.price - b.price; });
    else if (mode === "high") list.sort(function (a, b) { return b.price - a.price; });
    else if (mode === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
    else if (mode === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }

  function render() {
    var list = visible();
    grid.innerHTML = list.map(Store.card).join("");
    grid.querySelectorAll(".reveal").forEach(function (el, i) {
      setTimeout(function () { el.classList.add("show"); }, 40 + i * 40);
    });
    empty.style.display = list.length ? "none" : "block";
    count.textContent = list.length + (list.length === 1 ? " product found" : " products found");
    paintChips();
  }

  chips.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    state.cat = btn.getAttribute("data-cat");
    render();
  });
  q.addEventListener("input", render);
  sort.addEventListener("change", render);
  document.getElementById("reset").addEventListener("click", function () {
    q.value = ""; sort.value = "featured"; state.cat = "all"; render();
  });

  buildChips();
  render();
})();
