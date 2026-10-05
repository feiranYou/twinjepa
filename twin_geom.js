/* TwinJEPA · Fig.1-C — high-impact continuous latent geometry animation */
(function () {
  const cv = document.getElementById("twin-geom");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const labelEl = document.getElementById("twin-step");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const TEAL = "95,210,220";
  const TEAL_D = "61,140,150";
  const ORANGE = "255,140,70";
  const ORANGE_D = "224,100,40";
  const GOOD = "110,220,140";
  const BAD = "240,120,120";
  const INK = "#0b0e14";

  let W = 0, H = 0, dpr = 1, S = 1;
  let last = performance.now();
  let t0 = performance.now();
  let dashOff = 0;
  const CYCLE = 13000;

  const sparks = [];
  const dust = Array.from({ length: 48 }, () => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random() - 0.5) * 0.03,
    vy: (Math.random() - 0.5) * 0.025,
    r: 0.6 + Math.random() * 1.6,
    a: 0.15 + Math.random() * 0.35,
  }));

  function resize() {
    const rect = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cv.style.width = W + "px";
    cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    S = Math.max(0.85, Math.min(W / 760, H / 360));
  }

  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smoothstep(a, b, x) {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  }
  function bez(p0, p1, p2, t) {
    const u = 1 - t;
    return u * u * p0 + 2 * u * t * p1 + t * t * p2;
  }
  function fs(px, w) { return `${w || 600} ${Math.round(px * S)}px 'Source Sans 3', sans-serif`; }
  function mono(px) { return `500 ${Math.round(px * S)}px ui-monospace, SFMono-Regular, Menlo, monospace`; }

  function basePts(n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      pts.push({
        x: 0.16 + u * 0.64,
        y: 0.54 - Math.sin(u * Math.PI) * 0.28 - u * 0.03,
      });
    }
    return pts;
  }
  function twinPts(n, side) {
    const base = basePts(n);
    const sign = side === "A" ? -1 : 1;
    return base.map((p, i) => {
      const u = i / (n - 1);
      const spread = 0.07 + u * 0.20;
      return {
        x: p.x + sign * spread * 0.55,
        y: p.y + sign * spread * (side === "A" ? -1.1 : 1.2),
      };
    });
  }
  function toPix(p) {
    const padX = 52 * S, padY = 44 * S;
    return {
      x: padX + p.x * (W - padX * 2),
      y: padY + p.y * (H - padY * 2 - 6 * S),
    };
  }

  const N = 7;
  const BASE = basePts(N);
  const A0 = twinPts(N, "A");
  const B0 = twinPts(N, "B");
  const PAIR_IDX = [1, 3, 5];
  const parts = PAIR_IDX.map((idx, k) => ({
    idx, t: k * 0.28, speed: 0.55 + k * 0.08, dir: 1,
  }));

  function story(now) {
    const u = ((now - t0) % CYCLE) / CYCLE;
    return {
      u,
      twinPop: smoothstep(0.10, 0.24, u),
      mine: smoothstep(0.24, 0.38, u),
      heads: smoothstep(0.38, 0.52, u),
      expand: smoothstep(0.50, 0.72, u),
      effect: smoothstep(0.72, 0.90, u),
      fade: u > 0.93 ? 1 - smoothstep(0.93, 1, u) : 1,
      flash: Math.max(
        Math.exp(-Math.pow((u - 0.12) * 28, 2)),
        Math.exp(-Math.pow((u - 0.52) * 22, 2)) * 0.7,
        Math.exp(-Math.pow((u - 0.74) * 24, 2)) * 0.55
      ),
    };
  }

  function currentPts(st) {
    const e = st.expand;
    const a = [], b = [];
    for (let i = 0; i < N; i++) {
      const nearA = {
        x: lerp(BASE[i].x, A0[i].x, 0.18),
        y: lerp(BASE[i].y, A0[i].y, 0.18),
      };
      const nearB = {
        x: lerp(BASE[i].x, B0[i].x, 0.18),
        y: lerp(BASE[i].y, B0[i].y, 0.18),
      };
      a.push(toPix({
        x: lerp(BASE[i].x, lerp(nearA.x, A0[i].x, e), Math.max(st.twinPop * 0.4, e)),
        y: lerp(BASE[i].y, lerp(nearA.y, A0[i].y, e), Math.max(st.twinPop * 0.4, e)),
      }));
      b.push(toPix({
        x: lerp(nearB.x, B0[i].x, e),
        y: lerp(nearB.y, B0[i].y, e),
      }));
    }
    return { a, b, base: BASE.map(toPix) };
  }

  function glowAt(x, y, r, rgba, alpha) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${rgba},${alpha})`);
    g.addColorStop(0.45, `rgba(${rgba},${alpha * 0.35})`);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawBg(now, st) {
    ctx.fillStyle = INK;
    ctx.fillRect(0, 0, W, H);

    /* vignette + cool wash */
    const wash = ctx.createRadialGradient(W * 0.55, H * 0.45, 20, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
    wash.addColorStop(0, `rgba(${TEAL_D},${0.10 + 0.08 * st.expand})`);
    wash.addColorStop(0.55, `rgba(${ORANGE_D},${0.05 + 0.06 * st.twinPop})`);
    wash.addColorStop(1, "transparent");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, W, H);

    /* grid */
    ctx.strokeStyle = "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1;
    const step = 36 * S;
    const ox = (now / 40) % step;
    for (let x = -step + ox; x < W + step; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    /* ambient dust */
    for (const d of dust) {
      d.x += d.vx * (st.expand * 0.5 + 0.5);
      d.y += d.vy;
      if (d.x < 0) d.x += 1; if (d.x > 1) d.x -= 1;
      if (d.y < 0) d.y += 1; if (d.y > 1) d.y -= 1;
      ctx.globalAlpha = d.a * (0.4 + 0.6 * st.twinPop);
      ctx.fillStyle = `rgb(${st.expand > 0.4 ? ORANGE : TEAL})`;
      ctx.beginPath();
      ctx.arc(d.x * W, d.y * H, d.r * S, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (st.flash > 0.05) {
      ctx.fillStyle = `rgba(255,255,255,${0.06 * st.flash})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function drawDensityField(pts, rgba, strength) {
    if (strength < 0.05 || pts.length < 2) return;
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    /* soft core glow */
    glowAt(cx, cy, 95 * S * (0.7 + strength), rgba, 0.18 * strength);
    /* contour ellipses */
    for (let k = 0; k < 4; k++) {
      const sc = (0.55 + k * 0.2) * (0.85 + 0.35 * strength);
      const rx = 70 * S * sc, ry = 42 * S * sc;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgba},${0.42 - k * 0.07})`;
      ctx.lineWidth = (1.4 - k * 0.15) * S;
      ctx.stroke();
    }
  }

  function drawTraj(pts, rgba, alpha, glow) {
    if (pts.length < 2 || alpha < 0.02) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    /* neon underglow */
    ctx.strokeStyle = `rgba(${rgba},0.22)`;
    ctx.lineWidth = 8 * S;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
    ctx.strokeStyle = `rgb(${rgba})`;
    ctx.lineWidth = 2.6 * S;
    ctx.stroke();

    for (let i = 0; i < pts.length; i++) {
      const r = (i === 0 ? 6.5 : 5) * S;
      if (glow) glowAt(pts[i].x, pts[i].y, r * 3.2, rgba, 0.45);
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${rgba})`;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1.2 * S;
      ctx.stroke();
    }
    ctx.restore();
  }

  function spawnSpark(x, y, rgba) {
    sparks.push({
      x, y,
      vx: (Math.random() - 0.5) * 2.2 * S,
      vy: (Math.random() - 0.5) * 2.2 * S,
      life: 1,
      rgba,
      r: (1.2 + Math.random() * 2) * S,
    });
  }

  function drawSparks(dt) {
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt / 550;
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.96; s.vy *= 0.96;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life;
      glowAt(s.x, s.y, s.r * 4, s.rgba, 0.5);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "#fffaf5";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawShockwave(cx, cy, t, rgba) {
    if (t <= 0 || t >= 1) return;
    const r = (20 + t * 120) * S;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${rgba},${(1 - t) * 0.55})`;
    ctx.lineWidth = (2.5 - t * 1.5) * S;
    ctx.stroke();
    glowAt(cx, cy, r * 0.55, rgba, (1 - t) * 0.25);
  }

  function drawTwinBirth(base, st, now) {
    if (st.u < 0.10 || st.u >= 0.26) return;
    const p = base[3];
    const local = smoothstep(0.10, 0.16, st.u);
    const pulse = 0.5 + 0.5 * Math.sin(now / 120);
    drawShockwave(p.x, p.y, smoothstep(0.11, 0.22, st.u), ORANGE);
    glowAt(p.x, p.y, 50 * S * local, ORANGE, 0.35 * local);
    ctx.save();
    ctx.globalAlpha = local;
    ctx.beginPath();
    ctx.arc(p.x - 14 * S, p.y - 8 * S, 6 * S, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${TEAL})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x + 14 * S, p.y + 9 * S, 6 * S + pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${ORANGE})`;
    ctx.fill();
    /* splitting beam */
    ctx.strokeStyle = `rgba(255,255,255,${0.55 * local})`;
    ctx.lineWidth = 1.5 * S;
    ctx.setLineDash([4 * S, 4 * S]);
    ctx.beginPath();
    ctx.moveTo(p.x - 14 * S, p.y - 8 * S);
    ctx.lineTo(p.x + 14 * S, p.y + 9 * S);
    ctx.stroke();
    ctx.setLineDash([]);
    drawCallout(W * 0.5, 78 * S, "twin pair appears", ORANGE, local);
    if (Math.random() < 0.35) spawnSpark(p.x, p.y, ORANGE);
    ctx.restore();
  }

  function drawPairs(ptsA, ptsB, st, dt) {
    if (st.mine < 0.02) return;
    dashOff += dt * 0.05;
    const nShow = Math.ceil(st.mine * PAIR_IDX.length);
    ctx.save();
    for (let k = 0; k < nShow; k++) {
      const part = parts[k];
      const a = ptsA[part.idx], b = ptsB[part.idx];
      const cpx = (a.x + b.x) / 2 + (b.y - a.y) * 0.22;
      const cpy = (a.y + b.y) / 2 - (b.x - a.x) * 0.22;

      /* energy ribbon */
      const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, `rgba(${TEAL},0.0)`);
      grad.addColorStop(0.5, `rgba(${ORANGE},${0.55 * st.mine})`);
      grad.addColorStop(1, `rgba(${TEAL},0.0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3.2 * S;
      ctx.globalAlpha = st.mine;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
      ctx.stroke();

      ctx.setLineDash([6 * S, 5 * S]);
      ctx.lineDashOffset = -dashOff - k * 8;
      ctx.strokeStyle = `rgba(255,255,255,${0.55 * st.mine})`;
      ctx.lineWidth = 1.4 * S;
      ctx.stroke();
      ctx.setLineDash([]);

      part.t += part.speed * (dt / 1000) * part.dir;
      if (part.t >= 1) { part.t = 1; part.dir = -1; }
      if (part.t <= 0) { part.t = 0; part.dir = 1; }
      const t = part.t;
      const x = bez(a.x, cpx, b.x, t);
      const y = bez(a.y, cpy, b.y, t);
      glowAt(x, y, 18 * S, ORANGE, 0.7);
      ctx.beginPath();
      ctx.arc(x, y, 4 * S, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      /* trail */
      for (let j = 1; j <= 4; j++) {
        const tj = clamp(t - j * 0.04 * part.dir, 0, 1);
        const tx = bez(a.x, cpx, b.x, tj);
        const ty = bez(a.y, cpy, b.y, tj);
        ctx.globalAlpha = st.mine * (1 - j * 0.18);
        ctx.beginPath();
        ctx.arc(tx, ty, (3.2 - j * 0.45) * S, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${j % 2 ? ORANGE : TEAL})`;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (Math.random() < 0.08) spawnSpark(x, y, k % 2 ? TEAL : ORANGE);
    }
    ctx.restore();
    if (st.u >= 0.24 && st.u < 0.38) {
      drawCallout(W * 0.5, 78 * S, "pair mining", TEAL, smoothstep(0.26, 0.32, st.u));
    }
  }

  function drawHeads(ptsA, ptsB, st) {
    if (st.u < 0.38 || st.u >= 0.56) return;
    const alpha = smoothstep(0.38, 0.44, st.u) * (1 - smoothstep(0.52, 0.56, st.u));
    const a = ptsA[3], b = ptsB[3];
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const nx = -(b.y - a.y), ny = b.x - a.x;
    const nlen = Math.hypot(nx, ny) || 1;
    const ox = (nx / nlen) * 30 * S, oy = (ny / nlen) * 30 * S;

    ctx.save();
    ctx.globalAlpha = alpha;
    glowAt(mid.x + ox, mid.y + oy, 28 * S, ORANGE, 0.35);
    ctx.strokeStyle = `rgb(${ORANGE})`;
    ctx.lineWidth = 2.2 * S;
    ctx.shadowColor = `rgba(${ORANGE},0.8)`;
    ctx.shadowBlur = 12 * S;
    ctx.beginPath();
    ctx.moveTo(a.x + ox, a.y + oy);
    ctx.lineTo(b.x + ox, b.y + oy);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.font = fs(15, 800);
    ctx.textAlign = "center";
    ctx.lineWidth = 4 * S;
    ctx.strokeStyle = "rgba(11,14,20,0.9)";
    ctx.strokeText("ΔV", mid.x + ox, mid.y + oy - 14 * S);
    ctx.fillStyle = `rgb(${ORANGE})`;
    ctx.fillText("ΔV", mid.x + ox, mid.y + oy - 14 * S);

    ctx.textAlign = "left";
    ctx.font = fs(13, 700);
    ctx.fillStyle = `rgb(${GOOD})`;
    ctx.fillText("a⁺", a.x - 28 * S, a.y - 18 * S);
    ctx.fillStyle = `rgb(${BAD})`;
    ctx.fillText("a⁻", b.x + 12 * S, b.y + 20 * S);

    drawChip(W - 148 * S, 92 * S, "h_gap · ΔV", ORANGE, alpha);
    drawChip(W - 148 * S, 92 * S + 30 * S, "h_pref · rank", TEAL, alpha);
    ctx.restore();
  }

  function drawBoundary(st, now) {
    if (st.expand < 0.25) return;
    const alpha = clamp((st.expand - 0.25) / 0.4, 0, 1);
    const pulse = 0.65 + 0.35 * Math.sin(now / 280);
    ctx.save();
    ctx.globalAlpha = alpha * pulse;
    ctx.setLineDash([7 * S, 6 * S]);
    ctx.lineDashOffset = -now / 30;
    ctx.strokeStyle = `rgba(200,220,255,${0.65})`;
    ctx.lineWidth = 1.8 * S;
    ctx.shadowColor = `rgba(${TEAL},0.5)`;
    ctx.shadowBlur = 8 * S;
    ctx.beginPath();
    ctx.moveTo(W * 0.52, 36 * S);
    ctx.bezierCurveTo(W * 0.58, H * 0.32, W * 0.42, H * 0.68, W * 0.48, H - 28 * S);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawFutures(ptsA, ptsB, st, now) {
    if (st.effect < 0.02) return;
    const a = ptsA[ptsA.length - 1];
    const b = ptsB[ptsB.length - 1];
    const goal = { x: a.x + 68 * S, y: a.y - 52 * S };
    const dead = { x: b.x + 46 * S, y: b.y + 56 * S };
    const flow = (Math.sin(now / 200) + 1) * 0.5;

    ctx.save();
    ctx.globalAlpha = st.effect;
    ctx.lineWidth = 2.6 * S;
    ctx.shadowBlur = 10 * S;
    ctx.shadowColor = `rgba(${GOOD},0.7)`;
    ctx.strokeStyle = `rgb(${GOOD})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(a.x + 30 * S, a.y - 40 * S, goal.x, goal.y);
    ctx.stroke();
    ctx.shadowColor = `rgba(${BAD},0.6)`;
    ctx.strokeStyle = `rgb(${BAD})`;
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.quadraticCurveTo(b.x + 8 * S, b.y + 44 * S, dead.x, dead.y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    glowAt(goal.x, goal.y, (14 + flow * 8) * S, GOOD, 0.55);
    glowAt(dead.x, dead.y, 12 * S, BAD, 0.4);
    ctx.fillStyle = `rgb(${GOOD})`;
    ctx.beginPath(); ctx.arc(goal.x, goal.y, 6.5 * S, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgb(${BAD})`;
    ctx.beginPath(); ctx.arc(dead.x, dead.y, 5.8 * S, 0, Math.PI * 2); ctx.fill();

    ctx.font = fs(13, 700);
    ctx.lineWidth = 3.5 * S;
    ctx.strokeStyle = "rgba(11,14,20,0.85)";
    ctx.fillStyle = `rgb(${GOOD})`;
    ctx.strokeText("goal", Math.min(goal.x + 10, W - 70 * S), Math.max(goal.y - 8, 86 * S));
    ctx.fillText("goal", Math.min(goal.x + 10, W - 70 * S), Math.max(goal.y - 8, 86 * S));
    ctx.fillStyle = `rgb(${BAD})`;
    ctx.strokeText("poor", Math.max(40 * S, dead.x - 40 * S), Math.min(dead.y + 8, H - 64 * S));
    ctx.fillText("poor", Math.max(40 * S, dead.x - 40 * S), Math.min(dead.y + 8, H - 64 * S));

    if (st.u >= 0.78) drawChip(18, H - 52 * S, "discriminability ↑", GOOD, st.effect);
    ctx.restore();
  }

  function drawRegionLabels(st) {
    if (st.u < 0.56 || st.u >= 0.94) return;
    const alpha = smoothstep(0.56, 0.64, st.u) * (1 - smoothstep(0.90, 0.94, st.u));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = fs(14, 800);
    ctx.lineWidth = 4 * S;
    ctx.strokeStyle = "rgba(11,14,20,0.85)";
    ctx.fillStyle = `rgb(${TEAL})`;
    ctx.strokeText("Region A", 48 * S, 100 * S);
    ctx.fillText("Region A", 48 * S, 100 * S);
    ctx.fillStyle = `rgb(${ORANGE})`;
    ctx.strokeText("Region B", W - 98 * S, H - 48 * S);
    ctx.fillText("Region B", W - 98 * S, H - 48 * S);
    ctx.restore();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawChip(x, y, text, rgba, alpha) {
    if (alpha < 0.02) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = mono(11);
    const pad = 9 * S;
    const tw = ctx.measureText(text).width;
    const w = tw + pad * 2, h = 22 * S;
    const bx = clamp(x, 10, W - w - 10);
    const by = clamp(y, 52 * S, H - h - 10);
    ctx.fillStyle = "rgba(11,14,20,0.9)";
    ctx.strokeStyle = `rgba(${rgba},0.65)`;
    ctx.lineWidth = 1.2 * S;
    ctx.shadowColor = `rgba(${rgba},0.45)`;
    ctx.shadowBlur = 10 * S;
    roundRect(bx, by, w, h, 11 * S);
    ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgb(${rgba})`;
    ctx.textBaseline = "middle";
    ctx.fillText(text, bx + pad, by + h / 2);
    ctx.restore();
  }

  function drawCallout(x, y, text, rgba, alpha) {
    if (alpha < 0.02) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = fs(12, 700);
    const padX = 12 * S;
    const tw = ctx.measureText(text).width;
    const w = tw + padX * 2, h = 26 * S;
    const bx = clamp(x - w / 2, 12, W - w - 12);
    const by = clamp(y, 72 * S, H - h - 12);
    ctx.fillStyle = "rgba(11,14,20,0.92)";
    ctx.strokeStyle = `rgba(${rgba},0.7)`;
    ctx.lineWidth = 1.2 * S;
    ctx.shadowColor = `rgba(${rgba},0.4)`;
    ctx.shadowBlur = 12 * S;
    roundRect(bx, by, w, h, 10 * S);
    ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgb(${rgba})`;
    ctx.textBaseline = "middle";
    ctx.fillText(text, bx + padX, by + h / 2);
    ctx.restore();
  }

  let lastStep = -1;

  function setLabel(st) {
    if (!labelEl) return;
    const steps = [
      { u: 0.10, title: "TD-JEPA only" },
      { u: 0.24, title: "Twin appears" },
      { u: 0.38, title: "Pair mining" },
      { u: 0.52, title: "Twin heads (ΔV / pref)" },
      { u: 0.74, title: "Geometry expands" },
      { u: 1.01, title: "Discriminability ↑" },
    ];
    let idx = 0;
    while (idx < steps.length - 1 && st.u >= steps[idx].u) idx++;
    const n = idx + 1;
    const numEl = labelEl.querySelector(".twin-step-num");
    const metaEl = labelEl.querySelector(".twin-step-meta");
    const titleEl = labelEl.querySelector(".twin-step-title");
    if (numEl) numEl.textContent = String(n).padStart(2, "0");
    if (metaEl) metaEl.textContent = `Step ${n} / 6`;
    if (titleEl) titleEl.textContent = steps[idx].title;
    if (n !== lastStep) {
      lastStep = n;
      labelEl.classList.remove("step-flash");
      if (numEl) numEl.classList.remove("pulse");
      void labelEl.offsetWidth;
      labelEl.classList.add("step-flash");
      if (numEl) numEl.classList.add("pulse");
    }
  }

  function tick(now) {
    const dt = Math.min(40, now - last);
    last = now;
    const st = reduce
      ? { u: 0.85, twinPop: 1, mine: 1, heads: 1, expand: 1, effect: 1, fade: 1, flash: 0 }
      : story(now);

    setLabel(st);
    const { a, b, base } = currentPts(st);

    drawBg(now, st);
    ctx.save();
    ctx.globalAlpha = st.fade;

    if (st.twinPop < 0.12) {
      drawDensityField(base.slice(0, 5), TEAL, 0.85);
      drawTraj(base, TEAL, 1, true);
    } else {
      const showB = Math.max(st.twinPop, st.expand);
      drawDensityField(a, TEAL, 0.55 + 0.55 * st.expand);
      if (showB > 0.2) drawDensityField(b, ORANGE, 0.45 + 0.55 * st.expand);
      drawBoundary(st, now);
      drawTwinBirth(base, st, now);
      drawPairs(a, b, st, dt);
      drawHeads(a, b, st);
      drawTraj(a, TEAL, 0.5 + 0.5 * Math.max(st.twinPop, st.expand), st.heads > 0.2);
      drawTraj(b, ORANGE, showB * (0.4 + 0.6 * st.expand), false);
      drawRegionLabels(st);
      drawFutures(a, b, st, now);
      if (st.expand > 0.2 && st.expand < 0.85) {
        const mid = a[3];
        drawShockwave(mid.x, mid.y, (st.expand - 0.2) / 0.65, TEAL);
      }
    }

    drawSparks(dt);
    ctx.restore();
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(tick);
})();
