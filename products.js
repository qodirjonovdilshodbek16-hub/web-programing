/* TechNest — product data and cart API (loaded on every page) */
(function () {
  var PRODUCTS = [
    { id: 1,  name: "Nova X Phone",        cat: "phones",      icon: "📱", color: "#c7d2fe", price: 599, old: 699, rating: 4.6, reviews: 214, stock: 12, desc: "6.5-inch OLED display, 128 GB storage and a two-day battery." },
    { id: 2,  name: "Nova Lite Phone",     cat: "phones",      icon: "📲", color: "#bae6fd", price: 329, old: 0,   rating: 4.2, reviews: 98,  stock: 30, desc: "Affordable everyday phone with a bright 6.1-inch screen." },
    { id: 3,  name: "AeroBook 14",         cat: "laptops",     icon: "💻", color: "#ddd6fe", price: 899, old: 999, rating: 4.7, reviews: 156, stock: 7,  desc: "Light 14-inch laptop, 16 GB RAM, 512 GB SSD, 12-hour battery." },
    { id: 4,  name: "Forge Pro 16",        cat: "laptops",     icon: "🖥️", color: "#fecdd3", price: 1399, old: 0,  rating: 4.8, reviews: 73,  stock: 4,  desc: "Powerful 16-inch laptop for coding, design and gaming." },
    { id: 5,  name: "Pulse Earbuds",       cat: "audio",       icon: "🎧", color: "#a7f3d0", price: 79,  old: 99,  rating: 4.4, reviews: 540, stock: 60, desc: "Wireless earbuds with noise cancelling and 24-hour case." },
    { id: 6,  name: "Studio Headphones",   cat: "audio",       icon: "🎵", color: "#fde68a", price: 149, old: 0,   rating: 4.5, reviews: 187, stock: 18, desc: "Over-ear headphones with deep bass and a foldable design." },
    { id: 7,  name: "Boom Mini Speaker",   cat: "audio",       icon: "🔊", color: "#fbcfe8", price: 49,  old: 59,  rating: 4.3, reviews: 301, stock: 45, desc: "Pocket-size waterproof Bluetooth speaker, 12 hours of play." },
    { id: 8,  name: "Tick Smartwatch",     cat: "wearables",   icon: "⌚", color: "#bbf7d0", price: 129, old: 159, rating: 4.1, reviews: 122, stock: 22, desc: "Tracks steps, sleep and heart rate. Water resistant." },
    { id: 9,  name: "Band Fit Tracker",    cat: "wearables",   icon: "📿", color: "#e9d5ff", price: 39,  old: 0,   rating: 4.0, reviews: 410, stock: 80, desc: "Slim fitness band with 14-day battery life." },
    { id: 10, name: "Swift Power Bank",    cat: "accessories", icon: "🔋", color: "#fed7aa", price: 29,  old: 35,  rating: 4.5, reviews: 266, stock: 100, desc: "10,000 mAh fast-charging power bank for phones and tablets." },
    { id: 11, name: "Clack Keyboard",      cat: "accessories", icon: "⌨️", color: "#cffafe", price: 69,  old: 0,   rating: 4.6, reviews: 142, stock: 25, desc: "Compact mechanical keyboard with quiet switches." },
    { id: 12, name: "Glide Mouse",         cat: "accessories", icon: "🖱️", color: "#e2e8f0", price: 25,  old: 0,   rating: 4.2, reviews: 330, stock: 3,  desc: "Ergonomic wireless mouse with silent clicks." }
  ];

  var CATS = {
    phones: "Phones", laptops: "Laptops", audio: "Audio",
    wearables: "Wearables", accessories: "Accessories"
  };

  function load() {
    try {
      var raw = localStorage.getItem("technest-cart");
      var data = raw ? JSON.parse(raw) : {};
      return data && typeof data === "object" ? data : {};
    } catch (e) { return {}; }
  }
  function save(cart) {
    try { localStorage.setItem("technest-cart", JSON.stringify(cart)); } catch (e) { /* ignore */ }
  }

  var cart = load();
  /* If storage is blocked we still keep the cart in memory for this page. */

  function byId(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === Number(id)) return PRODUCTS[i];
    return null;
  }
  function count() {
    var n = 0;
    Object.keys(cart).forEach(function (k) { n += cart[k]; });
    return n;
  }
  function paintBadge() {
    var el = document.getElementById("cartCount");
    if (!el) return;
    var n = count();
    el.textContent = n;
    el.style.display = n > 0 ? "inline-flex" : "none";
  }
  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  function money(n) { return "$" + n.toFixed(2).replace(/\.00$/, ""); }

  window.Store = {
    products: PRODUCTS,
    cats: CATS,
    byId: byId,
    money: money,
    toast: toast,
    count: count,
    items: function () {
      return Object.keys(cart).map(function (id) {
        return { product: byId(id), qty: cart[id] };
      }).filter(function (i) { return i.product; });
    },
    add: function (id) {
      var p = byId(id);
      if (!p) return;
      var have = cart[id] || 0;
      if (have >= p.stock) { toast("Only " + p.stock + " in stock"); return; }
      cart[id] = have + 1;
      save(cart); paintBadge();
      toast(p.name + " added to cart");
    },
    setQty: function (id, qty) {
      var p = byId(id);
      if (!p) return;
      if (qty <= 0) delete cart[id];
      else cart[id] = Math.min(qty, p.stock);
      save(cart); paintBadge();
    },
    remove: function (id) { delete cart[id]; save(cart); paintBadge(); },
    clear: function () { cart = {}; save(cart); paintBadge(); },
    card: function (p) {
      var low = p.stock <= 5;
      var old = p.old ? "<s>" + money(p.old) + "</s>" : "";
      return '<article class="card reveal">' +
        '<div class="thumb" style="background:' + p.color + '" aria-hidden="true">' + p.icon + "</div>" +
        '<div class="card-body">' +
        '<span class="badge">' + CATS[p.cat] + "</span>" +
        "<h3>" + p.name + "</h3>" +
        '<div class="rating" aria-label="Rating ' + p.rating + ' out of 5">' + window.Store.stars(p.rating) +
        "<span>(" + p.reviews + ")</span></div>" +
        "<p>" + p.desc + "</p>" +
        '<div><span class="price">' + money(p.price) + "</span>" + old + "</div>" +
        '<span class="stock' + (low ? " low" : "") + '">' + (low ? "Only " + p.stock + " left" : "In stock") + "</span>" +
        '<div class="card-actions"><button class="btn" type="button" data-add="' + p.id + '">Add to cart</button></div>' +
        "</div></article>";
    },
    stars: function (r) {
      var full = Math.round(r), s = "";
      for (var i = 1; i <= 5; i++) s += i <= full ? "★" : "☆";
      return s;
    }
  };

  document.addEventListener("DOMContentLoaded", paintBadge);

  /* One click handler for every "Add to cart" button on any page */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-add]") : null;
    if (btn) window.Store.add(btn.getAttribute("data-add"));
  });
})();
