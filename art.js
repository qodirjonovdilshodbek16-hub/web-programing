/* TechNest — product artwork.
   Original SVG illustrations drawn in code (no photos, no brand logos).
   Usage: Art.draw(product, colorIndex) -> SVG string */
(function () {
  function rgb(hex) {
    var n = parseInt(hex.replace("#", ""), 16);
    return [n >> 16, (n >> 8) & 255, n & 255];
  }
  function shade(hex, amt) {
    var c = rgb(hex).map(function (v) {
      var out = amt < 0 ? v * (1 + amt) : v + (255 - v) * amt;
      return Math.max(0, Math.min(255, Math.round(out)));
    });
    return "rgb(" + c.join(",") + ")";
  }

  var uid = 0;
  function gid() { uid += 1; return "art" + uid; }
  function lin(id, c1, c2, x2, y2) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + x2 + '" y2="' + y2 + '">' +
      '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>';
  }
  function body(c) {
    var id = gid();
    return { id: id, defs: lin(id, shade(c, 0.22), shade(c, -0.25), 1, 1), fill: "url(#" + id + ")" };
  }
  function lens(cx, cy, r) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#1b1d24" stroke="#555a66" stroke-width="1.5"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.58) + '" fill="#08090d"/>' +
      '<circle cx="' + (cx - r * 0.25) + '" cy="' + (cy - r * 0.25) + '" r="' + (r * 0.18) + '" fill="#8a94c8" opacity=".6"/>';
  }
  function wallpaper() {
    var id = gid();
    return { defs: lin(id, "#22d3ee", "#6366f1", 1, 1), fill: "url(#" + id + ")" };
  }

  function phone(c, cam) {
    var b = body(c), s = "<defs>" + b.defs + "</defs>";
    s += '<rect x="74" y="20" width="92" height="200" rx="18" fill="' + b.fill + '"/>';
    s += '<rect x="74" y="20" width="92" height="200" rx="18" fill="none" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>';
    s += '<rect x="165" y="70" width="3" height="22" rx="1.5" fill="' + shade(c, -0.35) + '"/>';
    if (cam === "pixel") {
      s += '<rect x="74" y="44" width="92" height="34" fill="#15171d"/>' + lens(98, 61, 10) + lens(122, 61, 10) + '<circle cx="144" cy="61" r="4" fill="#d9d4a8"/>';
    } else if (cam === "pro") {
      s += '<rect x="80" y="28" width="80" height="66" rx="14" fill="' + shade(c, -0.12) + '" stroke="' + shade(c, -0.35) + '" stroke-opacity=".5"/>' +
        lens(100, 49, 10) + lens(100, 75, 10) + lens(126, 62, 10) + '<circle cx="146" cy="44" r="4" fill="#e6e1c2"/>';
    } else if (cam === "single") {
      s += '<rect x="82" y="30" width="76" height="26" rx="13" fill="' + shade(c, -0.12) + '" stroke="' + shade(c, -0.35) + '" stroke-opacity=".5"/>' +
        lens(100, 43, 9) + '<circle cx="140" cy="43" r="3.5" fill="#e6e1c2"/>';
    } else if (cam === "galaxy") {
      s += lens(94, 46, 11) + lens(94, 74, 11) + lens(94, 102, 11) + '<circle cx="124" cy="46" r="4" fill="#d9d4a8"/>';
    } else if (cam === "ultra") {
      s += lens(94, 44, 10) + lens(94, 68, 10) + lens(94, 92, 10) + lens(94, 116, 10) + '<circle cx="124" cy="44" r="4" fill="#d9d4a8"/>';
    } else {
      s += '<rect x="82" y="28" width="46" height="46" rx="13" fill="' + shade(c, -0.12) + '" stroke="' + shade(c, -0.35) + '" stroke-opacity=".5"/>' +
        lens(96, 42, 9) + lens(114, 60, 9) + '<circle cx="116" cy="40" r="3.5" fill="#e6e1c2"/>';
    }
    s += '<rect x="80" y="26" width="5" height="188" rx="2.5" fill="#fff" opacity=".14"/>';
    return s;
  }

  function tablet(c) {
    var b = body(c);
    return "<defs>" + b.defs + "</defs>" +
      '<rect x="34" y="56" width="172" height="128" rx="14" fill="' + b.fill + '"/>' +
      '<rect x="34" y="56" width="172" height="128" rx="14" fill="none" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>' +
      lens(54, 76, 8) + '<circle cx="120" cy="120" r="11" fill="#fff" opacity=".22"/>' +
      '<rect x="42" y="62" width="4" height="116" rx="2" fill="#fff" opacity=".14"/>';
  }

  function laptop(c) {
    var b = body(c), w = wallpaper();
    return "<defs>" + b.defs + w.defs + "</defs>" +
      '<rect x="48" y="52" width="144" height="102" rx="8" fill="#0b0d14"/>' +
      '<rect x="54" y="58" width="132" height="90" rx="4" fill="' + w.fill + '"/>' +
      '<circle cx="150" cy="86" r="22" fill="#fff" opacity=".18"/><circle cx="92" cy="120" r="30" fill="#fff" opacity=".1"/>' +
      '<rect x="112" y="52" width="16" height="4" rx="2" fill="#0b0d14"/>' +
      '<path d="M30 156 H210 L218 170 Q218 174 214 174 H26 Q22 174 22 170 Z" fill="' + b.fill + '"/>' +
      '<rect x="102" y="156" width="36" height="5" rx="2.5" fill="' + shade(c, -0.3) + '"/>';
  }

  function earbuds(c) {
    var b = body(c);
    function bud(x) {
      return '<ellipse cx="' + x + '" cy="62" rx="17" ry="19" fill="' + b.fill + '" stroke="' + shade(c, -0.3) + '" stroke-opacity=".5"/>' +
        '<rect x="' + (x - 6) + '" y="74" width="12" height="42" rx="6" fill="' + b.fill + '" stroke="' + shade(c, -0.3) + '" stroke-opacity=".5"/>';
    }
    return "<defs>" + b.defs + "</defs>" + bud(96) + bud(144) +
      '<rect x="68" y="112" width="104" height="86" rx="36" fill="' + b.fill + '" stroke="' + shade(c, -0.3) + '" stroke-opacity=".6" stroke-width="1.5"/>' +
      '<path d="M70 146 H170" stroke="' + shade(c, -0.35) + '" stroke-opacity=".6" stroke-width="2"/>' +
      '<circle cx="120" cy="176" r="4" fill="#9aa3b2"/>';
  }

  function headphones(c) {
    var b = body(c);
    return "<defs>" + b.defs + "</defs>" +
      '<path d="M62 134 C62 40 178 40 178 134" fill="none" stroke="' + shade(c, -0.3) + '" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M62 134 C62 44 178 44 178 134" fill="none" stroke="' + shade(c, 0.12) + '" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="46" y="110" width="40" height="76" rx="18" fill="' + b.fill + '"/>' +
      '<rect x="154" y="110" width="40" height="76" rx="18" fill="' + b.fill + '"/>' +
      '<rect x="78" y="118" width="12" height="60" rx="6" fill="#1b1c22"/>' +
      '<rect x="150" y="118" width="12" height="60" rx="6" fill="#1b1c22"/>' +
      '<circle cx="62" cy="148" r="7" fill="' + shade(c, -0.35) + '" opacity=".7"/><circle cx="178" cy="148" r="7" fill="' + shade(c, -0.35) + '" opacity=".7"/>';
  }

  function speaker(c) {
    var b = body(c), dots = "", x, y;
    for (x = 66; x <= 174; x += 10) { for (y = 100; y <= 150; y += 10) { dots += '<circle cx="' + x + '" cy="' + y + '" r="2.2" fill="' + shade(c, -0.5) + '" opacity=".55"/>'; } }
    return "<defs>" + b.defs + "</defs>" +
      '<path d="M204 112 q16 0 16 14 q0 14 -16 14" fill="none" stroke="' + shade(c, -0.35) + '" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="38" y="84" width="164" height="80" rx="40" fill="' + b.fill + '"/>' + dots +
      '<circle cx="120" cy="124" r="9" fill="' + shade(c, 0.2) + '" stroke="' + shade(c, -0.3) + '" stroke-width="2"/>';
  }

  function watch(c, kind, accent) {
    var strap = body(c), caseC = "#c9ccd3", cb = body(caseC), s = "<defs>" + strap.defs + cb.defs + "</defs>";
    s += '<rect x="98" y="20" width="44" height="64" rx="14" fill="' + strap.fill + '"/>';
    s += '<rect x="98" y="156" width="44" height="64" rx="14" fill="' + strap.fill + '"/>';
    if (kind === "band") {
      s += '<rect x="100" y="80" width="40" height="80" rx="14" fill="' + cb.fill + '"/><rect x="105" y="86" width="30" height="68" rx="9" fill="#05060a"/>' +
        '<text x="120" y="112" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#fff">72</text>' +
        '<rect x="110" y="124" width="20" height="4" rx="2" fill="#f472b6"/><rect x="110" y="134" width="14" height="4" rx="2" fill="#22d3ee"/>';
    } else if (kind === "round") {
      s += '<circle cx="120" cy="120" r="46" fill="' + cb.fill + '"/><circle cx="120" cy="120" r="40" fill="#05060a"/>' +
        '<circle cx="120" cy="120" r="30" fill="none" stroke="#22d3ee" stroke-width="5" stroke-dasharray="120 70" stroke-linecap="round"/>' +
        '<circle cx="120" cy="120" r="21" fill="none" stroke="#f472b6" stroke-width="5" stroke-dasharray="70 62" stroke-linecap="round"/>' +
        '<rect x="164" y="112" width="6" height="16" rx="3" fill="#7b808c"/>';
    } else {
      s += '<rect x="78" y="74" width="84" height="92" rx="26" fill="' + cb.fill + '"/><rect x="84" y="80" width="72" height="80" rx="20" fill="#05060a"/>' +
        '<text x="120" y="116" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#fff">10:09</text>' +
        '<rect x="96" y="128" width="48" height="5" rx="2.5" fill="' + (accent || "#22d3ee") + '"/><rect x="96" y="138" width="34" height="5" rx="2.5" fill="#f472b6"/>' +
        '<rect x="161" y="104" width="6" height="18" rx="3" fill="' + (accent || "#7b808c") + '"/>';
    }
    return s;
  }

  function mouse(c) {
    var b = body(c);
    return "<defs>" + b.defs + "</defs>" +
      '<path d="M120 34 C152 34 164 70 164 112 C164 166 146 206 120 206 C94 206 76 166 76 112 C76 70 88 34 120 34 Z" fill="' + b.fill + '" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>' +
      '<path d="M120 36 V98" stroke="' + shade(c, -0.4) + '" stroke-width="2"/>' +
      '<path d="M78 100 Q120 114 162 100" fill="none" stroke="' + shade(c, -0.4) + '" stroke-width="2"/>' +
      '<rect x="113" y="58" width="14" height="28" rx="7" fill="#1f222a"/>' +
      '<rect x="72" y="120" width="10" height="34" rx="5" fill="' + shade(c, -0.35) + '"/>';
  }

  function keyboard(c) {
    var b = body(c), keys = "", r, k, kw = 13, x, y;
    for (r = 0; r < 4; r += 1) {
      for (k = 0; k < 12; k += 1) {
        x = 30 + k * 15; y = 96 + r * 15;
        if (r === 3 && k > 2 && k < 9) { if (k === 3) { keys += '<rect x="' + x + '" y="' + y + '" width="88" height="' + kw + '" rx="3" fill="' + shade(c, 0.28) + '"/>'; } continue; }
        keys += '<rect x="' + x + '" y="' + y + '" width="' + kw + '" height="' + kw + '" rx="3" fill="' + shade(c, 0.28) + '"/>';
      }
    }
    return "<defs>" + b.defs + "</defs>" +
      '<rect x="22" y="88" width="196" height="80" rx="10" fill="' + b.fill + '" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>' + keys;
  }

  function tag(c) {
    var b = body(c), m = gid();
    return "<defs>" + b.defs + lin(m, "#f2f2f4", "#9a9fa8", 1, 1) + "</defs>" +
      '<circle cx="120" cy="120" r="66" fill="' + b.fill + '" stroke="' + shade(c, -0.3) + '" stroke-opacity=".6" stroke-width="2"/>' +
      '<circle cx="120" cy="120" r="36" fill="url(#' + m + ')"/><circle cx="120" cy="120" r="14" fill="#fff" opacity=".45"/>';
  }

  function bank(c) {
    var b = body(c);
    return "<defs>" + b.defs + "</defs>" +
      '<rect x="82" y="30" width="76" height="180" rx="18" fill="' + b.fill + '" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>' +
      '<rect x="94" y="46" width="52" height="22" rx="5" fill="#0e1118"/>' +
      '<text x="120" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#34d399">78%</text>' +
      '<rect x="100" y="190" width="18" height="6" rx="3" fill="#0e1118"/><rect x="124" y="190" width="18" height="6" rx="3" fill="#0e1118"/>' +
      '<rect x="92" y="90" width="56" height="3" rx="1.5" fill="#fff" opacity=".2"/><rect x="92" y="100" width="56" height="3" rx="1.5" fill="#fff" opacity=".2"/>';
  }

  function ssd(c, accent) {
    var b = body(c);
    return "<defs>" + b.defs + "</defs>" +
      '<rect x="60" y="68" width="120" height="104" rx="16" fill="' + b.fill + '" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>' +
      '<rect x="60" y="68" width="120" height="16" rx="8" fill="' + (accent || "#f59e0b") + '"/>' +
      '<rect x="74" y="104" width="64" height="8" rx="4" fill="#fff" opacity=".28"/><rect x="74" y="120" width="40" height="8" rx="4" fill="#fff" opacity=".18"/>' +
      '<circle cx="158" cy="150" r="5" fill="#34d399"/>';
  }

  function console_(c) {
    var b = body(c), w = wallpaper();
    return "<defs>" + b.defs + w.defs + "</defs>" +
      '<rect x="30" y="66" width="30" height="108" rx="14" fill="#3b82f6"/><rect x="180" y="66" width="30" height="108" rx="14" fill="#ef4444"/>' +
      '<circle cx="45" cy="96" r="8" fill="#1b1d24"/><circle cx="195" cy="140" r="8" fill="#1b1d24"/>' +
      '<rect x="58" y="72" width="124" height="96" rx="8" fill="' + b.fill + '"/>' +
      '<rect x="64" y="78" width="112" height="84" rx="4" fill="#05060a"/><rect x="68" y="82" width="104" height="76" rx="3" fill="' + w.fill + '"/>' +
      '<circle cx="136" cy="106" r="16" fill="#fff" opacity=".2"/>';
  }

  function vr(c) {
    var b = body(c);
    return "<defs>" + b.defs + "</defs>" +
      '<path d="M44 112 Q22 108 18 96 M196 112 Q218 108 222 96" fill="none" stroke="' + shade(c, -0.35) + '" stroke-width="10" stroke-linecap="round"/>' +
      '<rect x="40" y="80" width="160" height="82" rx="32" fill="' + b.fill + '" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>' +
      '<rect x="52" y="92" width="136" height="58" rx="24" fill="#12141b"/>' +
      '<circle cx="92" cy="121" r="20" fill="#0a0b10" stroke="#3b3f4c" stroke-width="3"/><circle cx="148" cy="121" r="20" fill="#0a0b10" stroke="#3b3f4c" stroke-width="3"/>' +
      '<circle cx="86" cy="115" r="5" fill="#8a94c8" opacity=".5"/><circle cx="142" cy="115" r="5" fill="#8a94c8" opacity=".5"/>';
  }

  function controller(c) {
    var b = body(c);
    return "<defs>" + b.defs + "</defs>" +
      '<path d="M62 92 Q42 92 36 122 L30 170 Q28 192 46 192 Q60 192 68 174 L80 152 H160 L172 174 Q180 192 194 192 Q212 192 210 170 L204 122 Q198 92 178 92 Z" fill="' + b.fill + '" stroke="' + shade(c, -0.4) + '" stroke-opacity=".5" stroke-width="2"/>' +
      '<circle cx="80" cy="118" r="12" fill="#1b1d24" stroke="#555a66" stroke-width="2"/><circle cx="138" cy="140" r="12" fill="#1b1d24" stroke="#555a66" stroke-width="2"/>' +
      '<path d="M100 130 h10 v-8 h8 v8 h10 v8 h-10 v8 h-8 v-8 h-10 z" fill="#1b1d24"/>' +
      '<circle cx="166" cy="106" r="6" fill="#fbbf24"/><circle cx="180" cy="120" r="6" fill="#ef4444"/><circle cx="152" cy="120" r="6" fill="#3b82f6"/><circle cx="166" cy="134" r="6" fill="#34d399"/>';
  }

  function inner(p, c) {
    switch (p.art) {
      case "phone": return phone(c, p.cam);
      case "tablet": return tablet(c);
      case "laptop": return laptop(c);
      case "earbuds": return earbuds(c);
      case "headphones": return headphones(c);
      case "speaker": return speaker(c);
      case "watch": return watch(c, p.shape, p.accent);
      case "mouse": return mouse(c);
      case "keyboard": return keyboard(c);
      case "tag": return tag(c);
      case "bank": return bank(c);
      case "ssd": return ssd(c, p.accent);
      case "console": return console_(c);
      case "vr": return vr(c);
      case "controller": return controller(c);
      default: return phone(c, "dual");
    }
  }

  window.Art = {
    draw: function (p, colorIndex) {
      var col = p.colors[colorIndex || 0] || p.colors[0];
      var label = p.name + ", " + col.n + " (illustration)";
      return '<svg viewBox="0 0 240 240" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="120" cy="226" rx="58" ry="6" fill="#000" opacity=".12"/>' + inner(p, col.h) + "</svg>";
    }
  };
})();
