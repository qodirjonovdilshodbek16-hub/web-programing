/* TechNest — product catalogue and shared store logic (cart, promo codes, product cards).
   Prices are approximate US list prices, collected for a student demo. No real orders are taken. */
(function () {
  var CATS = {
    phones: "Phones", laptops: "Laptops", tablets: "Tablets", audio: "Audio",
    wearables: "Wearables", accessories: "Accessories", gaming: "Gaming"
  };

  /* p(id, category, brand, name, price, artwork, details) */
  function p(id, cat, brand, name, price, art, o) {
    o.id = id; o.cat = cat; o.brand = brand; o.name = name; o.price = price; o.art = art;
    o.colors = o.colors.map(function (c) { return { n: c[0], h: c[1] }; });
    return o;
  }

  var PRODUCTS = [
    /* ---------- Phones ---------- */
    p(1, "phones", "Apple", "iPhone 17", 799, "phone", { cam: "dual", isNew: true, stock: 24,
      short: '6.3" OLED · A19 chip · 256 GB',
      blurb: "Apple's everyday iPhone with a bright 120Hz display and a 48MP dual camera.",
      colors: [["Lavender", "#c4b5e0"], ["Mist Blue", "#a9c4dc"], ["Sage", "#a9b9a3"], ["White", "#eeeeec"], ["Black", "#2a2b2e"]],
      features: ["Up to 3,000 nits peak outdoor brightness", "48MP Fusion main and ultra wide cameras", "18MP Center Stage front camera"],
      specs: [["Display", '6.3-inch Super Retina XDR, up to 120Hz'], ["Chip", "A19"], ["Storage", "From 256 GB"], ["Rear camera", "48MP main + 48MP ultra wide"], ["Front camera", "18MP Center Stage"]] }),
    p(2, "phones", "Apple", "iPhone 17 Pro", 1099, "phone", { cam: "pro", isNew: true, stock: 15, approx: true,
      short: '6.3" OLED · A19 Pro · Triple camera',
      blurb: "The Pro model with a triple rear camera system and the faster A19 Pro chip.",
      colors: [["Silver", "#e4e5e8"], ["Cosmic Orange", "#d9773a"], ["Deep Blue", "#2f4569"]],
      features: ["Triple rear camera system", "A19 Pro chip for demanding apps", "ProMotion display up to 120Hz"],
      specs: [["Display", "6.3-inch Super Retina XDR, ProMotion"], ["Chip", "A19 Pro"], ["Storage", "From 256 GB"], ["Rear camera", "48MP triple camera system"]] }),
    p(3, "phones", "Apple", "iPhone Air", 999, "phone", { cam: "single", isNew: true, stock: 9, approx: true,
      short: '6.5" display · Ultra-thin · A19 Pro',
      blurb: "The thinnest iPhone yet, with a single 48MP camera and an A19 Pro chip.",
      colors: [["Space Black", "#25262a"], ["Cloud White", "#ededeb"], ["Light Gold", "#e3d4b4"], ["Sky Blue", "#b3cbe0"]],
      features: ["Only 5.6 mm thin", "48MP single rear camera", "A19 Pro chip"],
      specs: [["Display", "6.5-inch Super Retina XDR"], ["Chip", "A19 Pro"], ["Thickness", "5.6 mm"], ["Rear camera", "48MP Fusion (single)"]] }),
    p(4, "phones", "Apple", "iPhone 16e", 599, "phone", { cam: "single", stock: 31, approx: true,
      short: '6.1" OLED · A18 chip · 128 GB',
      blurb: "The most affordable modern iPhone, with USB-C and a 48MP camera.",
      colors: [["Black", "#232427"], ["White", "#efefed"]],
      features: ["A18 chip", "48MP single rear camera", "USB-C charging"],
      specs: [["Display", "6.1-inch Super Retina XDR"], ["Chip", "A18"], ["Storage", "From 128 GB"], ["Rear camera", "48MP Fusion (single)"]] }),
    p(5, "phones", "Samsung", "Galaxy S26", 899, "phone", { cam: "galaxy", isNew: true, stock: 20,
      short: '6.3" AMOLED · Snapdragon 8 Elite Gen 5',
      blurb: "Compact Galaxy flagship with 12GB RAM and a 4,300 mAh battery.",
      colors: [["Cobalt Violet", "#8a7fc2"], ["Sky Blue", "#9ec5e8"], ["Black", "#1c1d21"], ["White", "#eceae6"]],
      features: ["Snapdragon 8 Elite Gen 5 (US model)", "50MP main + 12MP ultra wide + 10MP 3x telephoto", "256 GB or 512 GB storage"],
      specs: [["Display", "6.3-inch AMOLED, 2340 × 1080"], ["Chip", "Snapdragon 8 Elite Gen 5"], ["RAM", "12 GB"], ["Storage", "256 GB / 512 GB"], ["Battery", "4,300 mAh"]] }),
    p(6, "phones", "Samsung", "Galaxy S26+", 1099, "phone", { cam: "galaxy", isNew: true, stock: 14,
      short: '6.7" AMOLED · 4,900 mAh battery',
      blurb: "A bigger screen and battery, with the same camera system as the Galaxy S26.",
      colors: [["Cobalt Violet", "#8a7fc2"], ["Sky Blue", "#9ec5e8"], ["Black", "#1c1d21"], ["White", "#eceae6"]],
      features: ["6.7-inch QHD+ AMOLED display", "4,900 mAh battery", "12 GB RAM"],
      specs: [["Display", "6.7-inch AMOLED, 3120 × 1440"], ["Chip", "Snapdragon 8 Elite Gen 5"], ["RAM", "12 GB"], ["Storage", "256 GB / 512 GB"], ["Battery", "4,900 mAh"]] }),
    p(7, "phones", "Samsung", "Galaxy S26 Ultra", 1299, "phone", { cam: "ultra", isNew: true, stock: 4,
      short: '6.9" AMOLED · 200MP camera · 5,000 mAh',
      blurb: "Samsung's top model with a 200MP main camera and two telephoto lenses.",
      colors: [["Cobalt Violet", "#8a7fc2"], ["Sky Blue", "#9ec5e8"], ["Black", "#1c1d21"], ["White", "#eceae6"]],
      features: ["200MP main camera", "3x and 5x telephoto cameras", "Up to 1 TB storage"],
      specs: [["Display", "6.9-inch AMOLED, 3120 × 1440"], ["Chip", "Snapdragon 8 Elite Gen 5"], ["RAM", "12 GB / 16 GB"], ["Storage", "256 GB to 1 TB"], ["Battery", "5,000 mAh"], ["Rear camera", "200MP + 50MP + 10MP + 50MP"]] }),
    p(8, "phones", "Samsung", "Galaxy A56 5G", 499.99, "phone", { cam: "galaxy", stock: 40, approx: true,
      short: '6.7" Super AMOLED · 5,000 mAh',
      blurb: "A mid-range Galaxy with a smooth 120Hz display and a big battery.",
      colors: [["Awesome Graphite", "#4b4d55"], ["Awesome Lightgray", "#cfd1d6"], ["Awesome Olive", "#8f9a7e"]],
      features: ["6.7-inch Super AMOLED, 120Hz", "5,000 mAh battery", "Triple rear camera"],
      specs: [["Display", "6.7-inch Super AMOLED, 120Hz"], ["Battery", "5,000 mAh"], ["Storage", "From 128 GB"], ["Rear camera", "50MP + 12MP + 5MP"]] }),
    p(9, "phones", "Google", "Pixel 10", 799, "phone", { cam: "pixel", isNew: true, stock: 26,
      short: '6.3" OLED · Tensor G5 · 12 GB RAM',
      blurb: "Google's phone with Tensor G5, a 5x telephoto lens and Qi2 wireless charging.",
      colors: [["Indigo", "#6e7bb0"], ["Frost", "#cfe0e6"], ["Lemongrass", "#cdd68a"], ["Obsidian", "#24262b"]],
      features: ["Google Tensor G5", "48MP main + 13MP ultra wide + 10.8MP 5x telephoto", "30W wired and 15W Qi2 wireless charging"],
      specs: [["Display", "6.3-inch OLED, 60–120Hz"], ["Chip", "Google Tensor G5"], ["RAM", "12 GB"], ["Storage", "128 GB / 256 GB"], ["Battery", "4,970 mAh"]] }),
    p(10, "phones", "Google", "Pixel 10 Pro", 999, "phone", { cam: "pixel", isNew: true, stock: 18,
      short: '6.3" LTPO OLED · 16 GB RAM · 50MP camera',
      blurb: "The Pro model: 16GB RAM, a brighter LTPO display and a 42MP selfie camera.",
      colors: [["Moonstone", "#9aa3a8"], ["Jade", "#8fb3a2"], ["Porcelain", "#e8e3da"], ["Obsidian", "#24262b"]],
      features: ["16 GB RAM", "50MP main + 48MP ultra wide + 48MP 5x telephoto", "42MP selfie camera"],
      specs: [["Display", "6.3-inch LTPO OLED, 1–120Hz"], ["Chip", "Google Tensor G5"], ["RAM", "16 GB"], ["Storage", "128 GB to 1 TB"], ["Battery", "4,870 mAh"]] }),
    p(11, "phones", "Google", "Pixel 10 Pro XL", 1199, "phone", { cam: "pixel", isNew: true, stock: 11,
      short: '6.8" LTPO OLED · 5,200 mAh · 45W charging',
      blurb: "The largest Pixel, with a 6.8-inch screen and 45W wired charging.",
      colors: [["Moonstone", "#9aa3a8"], ["Jade", "#8fb3a2"], ["Porcelain", "#e8e3da"], ["Obsidian", "#24262b"]],
      features: ["6.8-inch LTPO OLED", "45W wired and 25W Qi2 wireless charging", "16 GB RAM"],
      specs: [["Display", "6.8-inch LTPO OLED, 1–120Hz"], ["Chip", "Google Tensor G5"], ["RAM", "16 GB"], ["Storage", "256 GB to 1 TB"], ["Battery", "5,200 mAh"]] }),
    p(12, "phones", "OnePlus", "OnePlus 13", 899.99, "phone", { cam: "pro", stock: 17, approx: true,
      short: '6.82" AMOLED · Snapdragon 8 Elite · 6,000 mAh',
      blurb: "A flagship Android phone with a very large battery and fast wired charging.",
      colors: [["Black Eclipse", "#1d1e22"], ["Arctic Dawn", "#b9c3cf"], ["Midnight Ocean", "#27405b"]],
      features: ["6,000 mAh battery", "100W wired charging", "Triple 50MP Hasselblad camera"],
      specs: [["Display", "6.82-inch LTPO AMOLED, 120Hz"], ["Chip", "Snapdragon 8 Elite"], ["Battery", "6,000 mAh"], ["Rear camera", "Triple 50MP"]] }),

    /* ---------- Laptops ---------- */
    p(13, "laptops", "Apple", 'MacBook Air 13" (M5)', 1099, "laptop", { isNew: true, stock: 22,
      short: '13.6" Liquid Retina · M5 · 512 GB',
      blurb: "Thin and light, with the M5 chip and up to 18 hours of battery life.",
      colors: [["Sky Blue", "#a9c4e0"], ["Midnight", "#2f3547"], ["Starlight", "#e9e2d6"], ["Silver", "#d7d9dd"]],
      features: ["Up to 18 hours of battery life", "512 GB storage as standard", "Four colors"],
      specs: [["Display", "13.6-inch Liquid Retina, 500 nits"], ["Chip", "Apple M5"], ["Storage", "512 GB"], ["Battery", "Up to 18 hours"]] }),
    p(14, "laptops", "Apple", 'MacBook Air 15" (M5)', 1299, "laptop", { isNew: true, stock: 13,
      short: '15.3" Liquid Retina · M5 · 512 GB',
      blurb: "The larger MacBook Air with a 15.3-inch display and the same M5 chip.",
      colors: [["Sky Blue", "#a9c4e0"], ["Midnight", "#2f3547"], ["Starlight", "#e9e2d6"], ["Silver", "#d7d9dd"]],
      features: ["15.3-inch Liquid Retina display", "Up to 18 hours of battery life", "512 GB storage as standard"],
      specs: [["Display", "15.3-inch Liquid Retina, 500 nits"], ["Chip", "Apple M5"], ["Storage", "512 GB"], ["Battery", "Up to 18 hours"]] }),
    p(15, "laptops", "Apple", 'MacBook Pro 14" (M5)', 1599, "laptop", { isNew: true, stock: 8, approx: true,
      short: '14.2" Liquid Retina XDR · M5',
      blurb: "A pro laptop with a Liquid Retina XDR display for creative and coding work.",
      colors: [["Space Black", "#2a2b2e"], ["Silver", "#d7d9dd"]],
      features: ["Liquid Retina XDR display", "Apple M5 chip", "Space Black or Silver"],
      specs: [["Display", "14.2-inch Liquid Retina XDR"], ["Chip", "Apple M5"], ["Weight", "About 3.4 lb (1.55 kg)"]] }),
    p(16, "laptops", "Dell", "XPS 14 (2026)", 2049, "laptop", { isNew: true, stock: 3,
      short: '14" 2.8K OLED · Core Ultra Series 3',
      blurb: "Dell's redesigned XPS with an OLED display. Price shown is the launch configuration.",
      colors: [["Graphite", "#4b5059"], ["Platinum", "#d3d6dc"]],
      features: ["14-inch tandem 2.8K OLED display", "Intel Core Ultra Series 3 with Arc graphics", "Up to 64 GB memory"],
      specs: [["Display", "14-inch 2.8K OLED (400 nits)"], ["Processor", "Intel Core Ultra Series 3"], ["Memory", "16–32 GB (up to 64 GB)"], ["Storage", "From 512 GB"], ["Weight", "About 3 lb"]] }),
    p(17, "laptops", "Microsoft", 'Surface Laptop 13"', 899, "laptop", { stock: 12, approx: true,
      short: '13" touchscreen · Snapdragon X Plus',
      blurb: "A light Windows laptop with a touchscreen and a Copilot+ PC badge.",
      colors: [["Platinum", "#cfd2d8"], ["Black", "#2a2b30"], ["Sea Glass", "#a9c9c0"]],
      features: ["13-inch touchscreen", "Snapdragon X Plus processor", "Copilot+ PC"],
      specs: [["Display", "13-inch touchscreen"], ["Processor", "Snapdragon X Plus"], ["Weight", "About 2.7 lb"]] }),

    /* ---------- Tablets ---------- */
    p(18, "tablets", "Apple", 'iPad (A16) 11"', 349, "tablet", { stock: 35, approx: true,
      short: '11" Liquid Retina · A16 · 128 GB',
      blurb: "The everyday iPad with a USB-C port and a landscape front camera.",
      colors: [["Blue", "#7fa6d6"], ["Pink", "#e8a9bd"], ["Yellow", "#ecd88a"], ["Silver", "#d8dade"]],
      features: ["A16 chip", "12MP Center Stage front camera", "USB-C"],
      specs: [["Display", "11-inch Liquid Retina"], ["Chip", "A16"], ["Storage", "From 128 GB"]] }),
    p(19, "tablets", "Apple", "iPad mini (A17 Pro)", 499, "tablet", { stock: 19, approx: true,
      short: '8.3" Liquid Retina · A17 Pro',
      blurb: "A pocketable iPad with Apple Pencil Pro support and Apple Intelligence.",
      colors: [["Blue", "#8fb0d4"], ["Purple", "#b8a8d8"], ["Starlight", "#e7e0d2"], ["Space Gray", "#5a5c62"]],
      features: ["A17 Pro chip", "Apple Pencil Pro support", "Apple Intelligence"],
      specs: [["Display", "8.3-inch Liquid Retina"], ["Chip", "A17 Pro"], ["Storage", "From 128 GB"]] }),
    p(20, "tablets", "Apple", 'iPad Pro 11" (M5)', 999, "tablet", { isNew: true, stock: 10, approx: true,
      short: '11" Ultra Retina XDR · M5',
      blurb: "The most powerful iPad, with an OLED display and the M5 chip.",
      colors: [["Space Black", "#2a2b2e"], ["Silver", "#d7d9dd"]],
      features: ["Ultra Retina XDR (OLED) display", "Apple M5 chip", "Thin aluminium design"],
      specs: [["Display", "11-inch Ultra Retina XDR"], ["Chip", "Apple M5"], ["Storage", "From 256 GB"]] }),
    p(21, "tablets", "Samsung", "Galaxy Tab S11", 799.99, "tablet", { isNew: true, stock: 14, approx: true,
      short: '11" Dynamic AMOLED 2X · S Pen included',
      blurb: "A premium Android tablet with an AMOLED display and an S Pen in the box.",
      colors: [["Gray", "#6a6d74"], ["Silver", "#d4d6da"]],
      features: ["11-inch Dynamic AMOLED 2X display", "S Pen included", "Samsung DeX desktop mode"],
      specs: [["Display", "11-inch Dynamic AMOLED 2X"], ["Storage", "From 128 GB"], ["Included", "S Pen"]] }),

    /* ---------- Audio ---------- */
    p(22, "audio", "Sony", "WH-1000XM6", 449.99, "headphones", { isNew: true, stock: 21,
      short: "Noise cancelling · 30 h battery · Foldable",
      blurb: "Sony's flagship over-ear headphones with a new, faster noise cancelling processor.",
      colors: [["Black", "#1d1e22"], ["Platinum Silver", "#d1d4d9"]],
      features: ["HD Noise Cancelling Processor QN3 with 12 microphones", "Foldable design with a magnetic case", "3 minutes of charging gives up to 3 hours"],
      specs: [["Type", "Over-ear wireless"], ["Battery", "Up to 30 hours"], ["Noise cancelling", "Yes, 12 microphones"], ["Audio", "LE Audio with Auracast"]] }),
    p(23, "audio", "Apple", "AirPods Pro 3", 249, "earbuds", { isNew: true, stock: 45,
      short: "Noise cancelling · Heart-rate sensing · IP57",
      blurb: "Earbuds with stronger noise cancelling, a heart-rate sensor and five ear tip sizes.",
      colors: [["White", "#f4f4f2"]],
      features: ["Active Noise Cancellation, up to 2x more effective than AirPods Pro 2", "Heart-rate sensor for workouts", "Live Translation (beta)"],
      specs: [["Battery", "Up to 8 hours with ANC"], ["Water resistance", "IP57"], ["Ear tips", "5 sizes, including XXS"]] }),
    p(24, "audio", "Apple", "AirPods 4", 129, "earbuds", { stock: 52, approx: true,
      short: "H2 chip · USB-C case",
      blurb: "Open-fit AirPods with the H2 chip and a USB-C charging case.",
      colors: [["White", "#f4f4f2"]],
      features: ["H2 chip", "USB-C charging case", "Comfortable open-ear fit"],
      specs: [["Chip", "H2"], ["Charging", "USB-C case"]] }),
    p(25, "audio", "Beats", "Powerbeats Pro 2", 249.99, "earbuds", { stock: 28, approx: true,
      short: "Ear hooks · Heart-rate · Noise cancelling",
      blurb: "Secure-fit earbuds for workouts, with heart-rate sensing and noise cancelling.",
      colors: [["Black", "#232427"], ["Orange", "#e0762f"], ["Blue", "#3d6fb5"]],
      features: ["Adjustable ear hooks", "Heart-rate sensing", "Active Noise Cancellation"],
      specs: [["Type", "True wireless, ear hook"], ["Sensors", "Heart rate"]] }),
    p(26, "audio", "Sonos", "Ace", 449, "headphones", { stock: 10, approx: true,
      short: "Noise cancelling · Spatial audio · 30 h",
      blurb: "Over-ear headphones from Sonos with head-tracked spatial audio.",
      colors: [["Black", "#1f2024"], ["Soft White", "#ecebe7"]],
      features: ["Active noise cancelling", "Spatial audio with head tracking", "Lossless audio over USB-C cable"],
      specs: [["Type", "Over-ear wireless"], ["Battery", "Up to 30 hours"]] }),
    p(27, "audio", "Beats", "Solo 4", 199.99, "headphones", { stock: 30, approx: true,
      short: "On-ear · Up to 50 h battery",
      blurb: "Light on-ear headphones with a very long battery life.",
      colors: [["Matte Black", "#222327"], ["Slate Blue", "#4a6285"], ["Cloud Pink", "#e8c3c8"]],
      features: ["Up to 50 hours of battery", "USB-C charging", "Personalised spatial audio"],
      specs: [["Type", "On-ear wireless"], ["Battery", "Up to 50 hours"]] }),
    p(28, "audio", "Sennheiser", "Momentum 4 Wireless", 379.95, "headphones", { stock: 9, approx: true,
      short: "Noise cancelling · Up to 60 h battery",
      blurb: "Comfortable over-ear headphones known for their very long battery life.",
      colors: [["Black", "#1f2024"], ["White", "#ecebe7"]],
      features: ["Up to 60 hours of battery", "Adaptive noise cancelling", "Foldable design"],
      specs: [["Type", "Over-ear wireless"], ["Battery", "Up to 60 hours"]] }),
    p(29, "audio", "JBL", "Flip 7", 149, "speaker", { isNew: true, stock: 38,
      short: "IP68 · Up to 16 h · 35W",
      blurb: "A compact waterproof Bluetooth speaker with a carabiner and a USB-C port.",
      colors: [["Black", "#1c1d20"], ["Red", "#c9302c"], ["Blue", "#2f5fb0"], ["White", "#efefee"]],
      features: ["Up to 16 hours of playtime", "IP68 waterproof and dustproof", "Auracast and stereo pairing"],
      specs: [["Output", "35W, two-driver"], ["Bluetooth", "5.4"], ["Rating", "IP68"], ["Weight", "560 g"], ["Port", "USB-C (24-bit/96kHz wired)"]] }),
    p(30, "audio", "JBL", "Charge 6", 199.95, "speaker", { isNew: true, stock: 26, approx: true,
      short: "IP68 · Built-in power bank",
      blurb: "A larger portable speaker that can also charge your phone.",
      colors: [["Black", "#1c1d20"], ["Blue", "#2f5fb0"], ["Red", "#c9302c"]],
      features: ["IP68 waterproof and dustproof", "Built-in power bank", "Bluetooth speaker"],
      specs: [["Rating", "IP68"], ["Extra", "Power bank function"]] }),
    p(31, "audio", "Sonos", "Era 100", 249, "speaker", { stock: 16, approx: true,
      short: "Wi-Fi + Bluetooth · Stereo sound",
      blurb: "A smart speaker with stereo sound and Trueplay room tuning.",
      colors: [["Black", "#1f2024"], ["White", "#ecebe7"]],
      features: ["Stereo sound with two tweeters", "Wi-Fi and Bluetooth", "Trueplay tuning"],
      specs: [["Connectivity", "Wi-Fi, Bluetooth"], ["Tuning", "Trueplay"]] }),
    p(32, "audio", "Apple", "HomePod mini", 99, "speaker", { stock: 33, approx: true,
      short: "Smart speaker · 360° sound",
      blurb: "A small smart speaker with room-filling sound and Siri.",
      colors: [["Space Gray", "#4a4c52"], ["White", "#ecebe7"], ["Blue", "#4f78b3"], ["Orange", "#e0762f"], ["Yellow", "#e8cd5e"]],
      features: ["360-degree audio", "Siri built in", "Matter and Thread support"],
      specs: [["Type", "Smart speaker"], ["Assistant", "Siri"]] }),
    p(33, "audio", "Beats", "Studio Pro", 349.99, "headphones", { stock: 15, approx: true,
      short: "Noise cancelling · Up to 40 h · USB-C",
      blurb: "Over-ear headphones with active noise cancelling and lossless audio over USB-C.",
      colors: [["Black", "#1f2024"], ["Deep Brown", "#5a4638"], ["Navy", "#2c3a55"], ["Sandstone", "#d9ccb5"]],
      features: ["Up to 40 hours without ANC (24 with ANC)", "Lossless audio over USB-C", "Personalised spatial audio"],
      specs: [["Type", "Over-ear wireless"], ["Battery", "Up to 40 hours"]] }),

    /* ---------- Wearables ---------- */
    p(34, "wearables", "Apple", "Apple Watch Series 11", 399, "watch", { shape: "square", isNew: true, stock: 27, approx: true,
      short: "Always-on display · Up to 24 h battery",
      blurb: "Apple's everyday smartwatch with health tracking and a longer battery life.",
      colors: [["Jet Black", "#1e1f23"], ["Rose Gold", "#d9a8a0"], ["Silver", "#cfd2d6"]],
      features: ["Up to 24 hours of battery life", "Sleep and heart-health features", "Always-on Retina display"],
      specs: [["Battery", "Up to 24 hours"], ["Display", "Always-on Retina"]] }),
    p(35, "wearables", "Apple", "Apple Watch Ultra 3", 799, "watch", { shape: "square", accent: "#f97316", isNew: true, stock: 7, approx: true,
      short: "49 mm titanium · Up to 42 h battery",
      blurb: "A rugged titanium watch for sport and outdoor adventures.",
      colors: [["Natural Titanium", "#cbc5b8"], ["Black Titanium", "#26272a"]],
      features: ["Titanium case", "Up to 42 hours of battery life", "Satellite emergency features"],
      specs: [["Case", "49 mm titanium"], ["Battery", "Up to 42 hours"]] }),
    p(36, "wearables", "Apple", "Apple Watch SE 3", 249, "watch", { shape: "square", stock: 29, approx: true,
      short: "Essential features · Always-on display",
      blurb: "The most affordable Apple Watch with the essential fitness features.",
      colors: [["Midnight", "#262a36"], ["Starlight", "#e6e0d2"]],
      features: ["Always-on display", "Fitness and sleep tracking", "Crash and fall detection"],
      specs: [["Display", "Always-on Retina"]] }),
    p(37, "wearables", "Samsung", "Galaxy Watch8", 349.99, "watch", { shape: "round", isNew: true, stock: 23, approx: true,
      short: "Wear OS · 40 mm and 44 mm",
      blurb: "A round Wear OS smartwatch with body composition and sleep tracking.",
      colors: [["Graphite", "#3a3d44"], ["Silver", "#cfd2d6"]],
      features: ["Wear OS", "Body composition and sleep tracking", "40 mm and 44 mm sizes"],
      specs: [["Operating system", "Wear OS"], ["Sizes", "40 mm / 44 mm"]] }),
    p(38, "wearables", "Samsung", "Galaxy Watch8 Classic", 499.99, "watch", { shape: "round", isNew: true, stock: 12, approx: true,
      short: "Rotating bezel · 46 mm",
      blurb: "The Classic model keeps the physical rotating bezel.",
      colors: [["Black", "#232427"], ["White", "#e8e8e6"]],
      features: ["Rotating bezel", "Wear OS", "46 mm case"],
      specs: [["Operating system", "Wear OS"], ["Size", "46 mm"]] }),
    p(39, "wearables", "Google", "Pixel Watch 4", 349.99, "watch", { shape: "round", isNew: true, stock: 19, approx: true,
      short: "Wear OS · Fitbit health tools",
      blurb: "Google's smartwatch with Fitbit health and fitness tracking.",
      colors: [["Obsidian", "#26272b"], ["Porcelain", "#e8e3da"], ["Moonstone", "#9aa3a8"]],
      features: ["Wear OS", "Fitbit health and fitness tools", "41 mm and 45 mm sizes"],
      specs: [["Operating system", "Wear OS"], ["Sizes", "41 mm / 45 mm"]] }),
    p(40, "wearables", "Fitbit", "Charge 6", 159.95, "watch", { shape: "band", stock: 36, approx: true,
      short: "Built-in GPS · Up to 7 days",
      blurb: "A slim fitness tracker with built-in GPS and heart-rate tracking.",
      colors: [["Obsidian", "#2a2b30"], ["Porcelain", "#e6e1d8"], ["Coral", "#e6806e"]],
      features: ["Built-in GPS", "24/7 heart-rate tracking", "Up to 7 days of battery"],
      specs: [["Battery", "Up to 7 days"], ["GPS", "Built in"]] }),
    p(41, "wearables", "Garmin", "Forerunner 165", 249.99, "watch", { shape: "round", stock: 20, approx: true,
      short: "AMOLED · Built-in GPS · Running tools",
      blurb: "A running watch with a bright AMOLED screen and training insights.",
      colors: [["Black", "#232427"], ["Mint", "#8fc9b6"], ["Turquoise", "#4aa8b5"]],
      features: ["AMOLED display", "Built-in GPS", "Running-focused training tools"],
      specs: [["Display", "AMOLED"], ["GPS", "Built in"]] }),

    /* ---------- Accessories ---------- */
    p(42, "accessories", "Logitech", "MX Master 3S", 99.99, "mouse", { stock: 44, approx: true,
      short: "8,000 DPI · Quiet clicks · USB-C",
      blurb: "A comfortable wireless mouse for everyday work, with quiet clicks.",
      colors: [["Graphite", "#3b3d44"], ["Pale Gray", "#cfd1d6"]],
      features: ["8,000 DPI sensor", "Quiet Click buttons", "Up to 70 days on a full charge"],
      specs: [["Sensor", "8,000 DPI"], ["Battery", "Up to 70 days"], ["Charging", "USB-C"], ["Devices", "Up to 3"]] }),
    p(43, "accessories", "Logitech", "MX Anywhere 3S", 79.99, "mouse", { stock: 37, approx: true,
      short: "Compact · 8,000 DPI · Quiet clicks",
      blurb: "A compact travel mouse that works on almost any surface.",
      colors: [["Graphite", "#3b3d44"], ["Pale Gray", "#cfd1d6"], ["Rose", "#e0b9bd"]],
      features: ["8,000 DPI sensor", "Quiet Click buttons", "USB-C charging"],
      specs: [["Sensor", "8,000 DPI"], ["Charging", "USB-C"]] }),
    p(44, "accessories", "Logitech", "MX Keys S", 109.99, "keyboard", { stock: 25, approx: true,
      short: "Backlit · Multi-device · USB-C",
      blurb: "A low-profile wireless keyboard with smart backlighting.",
      colors: [["Graphite", "#3b3d44"], ["Pale Gray", "#cfd1d6"]],
      features: ["Smart backlighting", "Connects to up to 3 devices", "USB-C charging"],
      specs: [["Backlight", "Smart illumination"], ["Devices", "Up to 3"], ["Charging", "USB-C"]] }),
    p(45, "accessories", "Apple", "AirTag (4 pack)", 99, "tag", { stock: 60, approx: true,
      short: "Find your items · Replaceable battery",
      blurb: "Four item trackers that work with the Find My network.",
      colors: [["Silver", "#e9e7e2"]],
      features: ["Precision Finding", "Replaceable battery", "IP67 water and dust resistance"],
      specs: [["Pack", "4 trackers"], ["Rating", "IP67"], ["Battery", "Replaceable coin cell"]] }),
    p(46, "accessories", "Anker", "Power Bank 20,000 mAh", 49.99, "bank", { stock: 70, approx: true,
      short: "20,000 mAh · USB-C + USB-A",
      blurb: "A large-capacity power bank that can charge a phone several times.",
      colors: [["Black", "#2a2b30"], ["White", "#ecebe7"]],
      features: ["20,000 mAh capacity", "USB-C and USB-A ports", "Fast charging"],
      specs: [["Capacity", "20,000 mAh"], ["Ports", "USB-C, USB-A"]] }),
    p(47, "accessories", "SanDisk", "Extreme Portable SSD 1 TB", 109.99, "ssd", { accent: "#f97316", stock: 41, approx: true,
      short: "Up to 1,050 MB/s · IP65",
      blurb: "A fast, rugged portable drive for photos, video and backups.",
      colors: [["Black", "#25262b"]],
      features: ["Up to 1,050 MB/s read speed", "IP65 water and dust resistance", "USB-C"],
      specs: [["Capacity", "1 TB"], ["Speed", "Up to 1,050 MB/s"], ["Rating", "IP65"]] }),
    p(48, "accessories", "Samsung", "T7 Shield 1 TB", 119.99, "ssd", { accent: "#2563eb", stock: 33, approx: true,
      short: "Rugged · Up to 1,050 MB/s",
      blurb: "A rugged portable SSD with a rubberised shell.",
      colors: [["Black", "#25262b"], ["Blue", "#2f5fb0"]],
      features: ["Rubberised, drop-resistant shell", "Up to 1,050 MB/s", "IP65 rating"],
      specs: [["Capacity", "1 TB"], ["Speed", "Up to 1,050 MB/s"], ["Rating", "IP65"]] }),
    p(49, "accessories", "Apple", "MagSafe Charger", 39, "tag", { stock: 55, approx: true,
      short: "Magnetic wireless charging · USB-C",
      blurb: "A magnetic wireless charger that snaps onto compatible iPhones.",
      colors: [["White", "#f1f1ef"]],
      features: ["Magnetic alignment", "Wireless charging up to 15W", "USB-C connector"],
      specs: [["Charging", "Up to 15W"], ["Connector", "USB-C"]] }),

    /* ---------- Gaming ---------- */
    p(50, "gaming", "Nintendo", "Switch 2", 449.99, "console", { isNew: true, stock: 14,
      short: '7.9" 1080p screen · 256 GB · 4K docked',
      blurb: "Nintendo's console with a bigger screen and magnetic Joy-Con 2 controllers.",
      colors: [["Standard", "#2b2f3a"]],
      features: ["7.9-inch 1080p LCD, up to 120Hz", "4K output when docked", "Magnetic Joy-Con 2 controllers"],
      specs: [["Display", "7.9-inch LCD, 1080p"], ["Storage", "256 GB"], ["Output", "Up to 4K docked"]] }),
    p(51, "gaming", "Meta", "Quest 3S", 299.99, "vr", { stock: 18, approx: true,
      short: "Mixed reality · 128 GB",
      blurb: "A standalone VR headset with mixed reality and controllers included.",
      colors: [["White", "#e9e9ea"]],
      features: ["Standalone, no PC needed", "Colour mixed reality", "Controllers included"],
      specs: [["Storage", "128 GB"], ["Chip", "Snapdragon XR2 Gen 2"]] }),
    p(52, "gaming", "Valve", "Steam Deck OLED 512 GB", 549, "console", { stock: 12, approx: true,
      short: '7.4" HDR OLED · 90Hz · 512 GB',
      blurb: "A handheld gaming PC with an OLED screen that runs your Steam library.",
      colors: [["Standard", "#2b2f3a"]],
      features: ["7.4-inch HDR OLED, 90Hz", "512 GB storage", "Plays your Steam library"],
      specs: [["Display", "7.4-inch HDR OLED, 90Hz"], ["Storage", "512 GB"]] }),
    p(53, "gaming", "Nintendo", "Switch 2 Pro Controller", 84.99, "controller", { stock: 29, approx: true,
      short: "Wireless · Rear buttons · Audio jack",
      blurb: "A full-size wireless controller for Switch 2.",
      colors: [["Black", "#2b2f3a"]],
      features: ["Rear GL/GR buttons", "Built-in audio jack", "Wireless play"],
      specs: [["Connection", "Wireless"], ["Extras", "Rear buttons, audio jack"]] }),
    p(54, "gaming", "Sony", "DualSense Controller", 74.99, "controller", { stock: 42, approx: true,
      short: "Haptic feedback · Adaptive triggers",
      blurb: "The PlayStation 5 controller with haptics and adaptive triggers.",
      colors: [["White", "#eeeeef"], ["Midnight Black", "#25262b"], ["Cosmic Red", "#b3262e"], ["Cobalt Blue", "#2c4f9c"]],
      features: ["Haptic feedback", "Adaptive triggers", "Built-in microphone"],
      specs: [["Platform", "PlayStation 5"], ["Feedback", "Haptics + adaptive triggers"]] }),
    p(55, "gaming", "Microsoft", "Xbox Wireless Controller", 64.99, "controller", { stock: 47, approx: true,
      short: "Bluetooth · USB-C · Textured grip",
      blurb: "The Xbox controller that also works with PC, phones and tablets.",
      colors: [["Carbon Black", "#26272b"], ["Robot White", "#ecebe9"], ["Shock Blue", "#2b6cc4"]],
      features: ["Bluetooth and USB-C", "Textured triggers and grips", "Works with Xbox, PC and mobile"],
      specs: [["Connection", "Bluetooth, USB-C"], ["Platforms", "Xbox, PC, mobile"]] })
  ];

  /* ---------- storage helpers (safe when storage is blocked) ---------- */
  var CART_KEY = "technest-cart-v2", PROMO_KEY = "technest-promo";
  function read(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }
  var cart = read(CART_KEY, {});
  if (!cart || typeof cart !== "object" || Array.isArray(cart)) cart = {};
  var promoCode = read(PROMO_KEY, "");
  if (typeof promoCode !== "string") promoCode = "";

  var PROMOS = {
    STUDENT10: { label: "10% student discount", percent: 10 },
    FREESHIP: { label: "Free standard shipping", freeShip: true }
  };
  var FREE_SHIP_OVER = 100, STANDARD = 7, EXPRESS = 15;

  function byId(id) {
    id = Number(id);
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function money(n) { return "$" + n.toFixed(2).replace(/\.00$/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function save() { write(CART_KEY, cart); paintBadge(); }

  function paintBadge() {
    var el = document.getElementById("cartCount");
    if (!el) return;
    var n = Store.count();
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
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { t.classList.remove("show"); }, 2000);
  }
  function inCart(id) {
    var n = 0;
    Object.keys(cart).forEach(function (k) { if (Number(k.split("-")[0]) === Number(id)) n += cart[k]; });
    return n;
  }

  var Store = {
    products: PRODUCTS, cats: CATS, byId: byId, money: money, toast: toast, esc: esc,
    freeShipOver: FREE_SHIP_OVER,

    brands: function () {
      var seen = {}, out = [];
      PRODUCTS.forEach(function (x) { if (!seen[x.brand]) { seen[x.brand] = true; out.push(x.brand); } });
      return out.sort();
    },

    /* ---- cart ---- */
    count: function () { var n = 0; Object.keys(cart).forEach(function (k) { n += cart[k]; }); return n; },
    items: function () {
      var out = [];
      Object.keys(cart).forEach(function (key) {
        var parts = key.split("-"), prod = byId(parts[0]), ci = Number(parts[1]);
        if (prod && prod.colors[ci] && cart[key] > 0) out.push({ key: key, product: prod, colorIndex: ci, color: prod.colors[ci], qty: cart[key] });
      });
      return out;
    },
    add: function (id, colorIndex, qty) {
      var prod = byId(id);
      if (!prod) return false;
      colorIndex = colorIndex || 0; qty = qty || 1;
      if (inCart(id) + qty > prod.stock) { toast("Only " + prod.stock + " in stock"); return false; }
      var key = prod.id + "-" + colorIndex;
      cart[key] = (cart[key] || 0) + qty;
      save();
      toast(prod.name + " added to cart");
      return true;
    },
    setQty: function (key, qty) {
      var prod = byId(key.split("-")[0]);
      if (!prod) return;
      if (qty <= 0) { delete cart[key]; save(); return; }
      var others = inCart(prod.id) - (cart[key] || 0);
      if (others + qty > prod.stock) { toast("Only " + prod.stock + " in stock"); qty = prod.stock - others; }
      cart[key] = Math.max(qty, 1);
      save();
    },
    remove: function (key) { delete cart[key]; save(); },
    clear: function () { cart = {}; save(); },

    /* ---- promo codes and totals ---- */
    promo: function () { return PROMOS[promoCode] ? { code: promoCode, info: PROMOS[promoCode] } : null; },
    applyPromo: function (code) {
      code = String(code || "").trim().toUpperCase();
      if (!code) return { ok: false, message: "Enter a promo code." };
      if (!PROMOS[code]) return { ok: false, message: "That code is not valid." };
      promoCode = code; write(PROMO_KEY, promoCode);
      return { ok: true, message: PROMOS[code].label + " applied." };
    },
    clearPromo: function () { promoCode = ""; write(PROMO_KEY, ""); },
    totals: function (delivery) {
      var subtotal = 0;
      Store.items().forEach(function (it) { subtotal += it.product.price * it.qty; });
      var promo = Store.promo(), discount = 0;
      if (promo && promo.info.percent) discount = Math.round(subtotal * promo.info.percent) / 100;
      var after = subtotal - discount, shipping = 0;
      if (subtotal > 0) {
        if (delivery === "express") shipping = EXPRESS;
        else shipping = (after >= FREE_SHIP_OVER || (promo && promo.info.freeShip)) ? 0 : STANDARD;
      }
      return { subtotal: subtotal, discount: discount, shipping: shipping, total: after + shipping, promo: promo };
    },

    /* ---- rendering ---- */
    art: function (prod, colorIndex) { return window.Art ? window.Art.draw(prod, colorIndex) : ""; },
    stockText: function (prod) {
      return prod.stock <= 5 ? "Only " + prod.stock + " left" : "In stock";
    },
    card: function (prod) {
      var dots = prod.colors.slice(0, 5).map(function (c) { return '<span style="background:' + c.h + '"></span>'; }).join("");
      var more = prod.colors.length > 5 ? "<small>+" + (prod.colors.length - 5) + "</small>" : "";
     return '<article class="pcard cat-' + prod.cat + '">' +
        '<a class="pthumb" href="product.html?id=' + prod.id + '" aria-label="View ' + esc(prod.name) + '" style="--tint:' + prod.colors[0].h + '">' +
        Store.art(prod, 0) + (prod.isNew ? '<span class="pbadge">New</span>' : "") + "</a>" +
        '<div class="pbody"><p class="pbrand">' + esc(prod.brand) + "</p>" +
        '<h3><a href="product.html?id=' + prod.id + '">' + esc(prod.name) + "</a></h3>" +
        '<p class="pshort">' + esc(prod.short) + "</p>" +
        '<div class="pdots" aria-label="' + prod.colors.length + ' colors">' + dots + more + "</div>" +
        '<div class="prow"><span class="pprice">' + money(prod.price) + "</span>" +
        '<button class="btn small" type="button" data-add="' + prod.id + '" aria-label="Add ' + esc(prod.name) + ' to cart">Add to cart</button></div>' +
        (prod.stock <= 5 ? '<p class="plow">' + Store.stockText(prod) + "</p>" : "") +
        "</div></article>";
    },
    render: function (container, list) {
      if (container) container.innerHTML = list.map(Store.card).join("");
    }
  };

  window.Store = Store;
  document.addEventListener("DOMContentLoaded", paintBadge);
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-add]") : null;
    if (btn) Store.add(btn.getAttribute("data-add"), 0, 1);
  });
})();
