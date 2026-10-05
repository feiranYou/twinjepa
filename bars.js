(() => {
  const C = {
    blue: "#4c72b0",
    orange: "#e08a3c",
    green: "#55a868",
    purple: "#8d78ad",
    teal: "#3aa0a6",
    gray: "#a3a3a3",
    sand: "#d7a15f",
    rose: "#d08989",
    vivid: "#2f6bff",
  };

  const offTwin = [
    { id: "off", name: "Official TD-JEPA", color: C.blue },
    { id: "twin", name: "TwinJEPA", color: C.orange },
  ];

  const charts = {
    antmaze4: {
      aria: "Grouped bars of final zero-shot success for Official TD-JEPA and TwinJEPA on four AntMaze domains and their average.",
      ymin: 0,
      ymax: 100,
      ytitle: "Final zero-shot success (%)",
      ticks: [0, 25, 50, 75, 100],
      series: offTwin,
      groups: [
        { label: "Medium\nNavigate", bars: [{ v: 68.8, e: 4.0 }, { v: 73.2, e: 3.5 }] },
        { label: "Large\nNavigate", bars: [{ v: 42.2, e: 2.1 }, { v: 43.0, e: 3.3 }] },
        { label: "Medium\nStitch", bars: [{ v: 51.4, e: 3.7 }, { v: 52.0, e: 4.3 }] },
        { label: "Large\nStitch", bars: [{ v: 37.8, e: 2.7 }, { v: 41.2, e: 3.1 }] },
        { label: "AntMaze-4\nAvg.", bars: [{ v: 50.1 }, { v: 52.4 }] },
      ],
    },
    mnTasks: {
      aria: "Per-task success on AntMaze medium-navigate for Official TD-JEPA and TwinJEPA.",
      ymin: 0,
      ymax: 100,
      plot: 220,
      ytitle: "Success (%)",
      ticks: [0, 20, 40, 60, 80, 100],
      series: offTwin,
      groups: [
        { label: "Task 1", bars: [{ v: 81 }, { v: 79 }] },
        { label: "Task 2", bars: [{ v: 80 }, { v: 86 }] },
        { label: "Task 3", bars: [{ v: 32 }, { v: 49 }] },
        { label: "Task 4", bars: [{ v: 57 }, { v: 54 }] },
        { label: "Task 5", bars: [{ v: 94 }, { v: 98 }] },
      ],
    },
    taskGains: {
      horizontal: true,
      aria: "Representative task-level gains of TwinJEPA over Official TD-JEPA.",
      xmax: 30,
      ticks: [0, 10, 20, 30],
      axis: "Δ success (pp)",
      seriesName: "TwinJEPA − Official",
      color: C.green,
      rows: [
        { label: "mn(T3)", v: 17 },
        { label: "ln(T5)", v: 16 },
        { label: "ms(T1)", v: 13 },
        { label: "ls(T1)", v: 11 },
      ],
    },
    cheetahAblation: {
      aria: "Cheetah mean return at 1M steps for Official, full TwinJEPA, and auxiliary ablations.",
      ymin: 525,
      ymax: 740,
      plot: 250,
      ytitle: "Mean return @ 1M",
      ticks: [525, 575, 625, 675, 725],
      showValues: true,
      digits: 1,
      refline: { v: 671.4, label: "671.4", accent: true },
      groups: [
        { label: "Official", bars: [{ v: 610.5, e: 44.0, color: C.gray }] },
        { label: "Twin\n(full)", bars: [{ v: 671.4, e: 32.4, color: C.teal }] },
        { label: "gap-only", bars: [{ v: 654.5, e: 34.5, color: C.green }] },
        { label: "pref-only", bars: [{ v: 629.8, e: 37.2, color: C.sand }] },
        { label: "λ = 0.05", bars: [{ v: 634.8, e: 52.7, color: C.purple }] },
        { label: "λ = 0.5", bars: [{ v: 629.5, e: 41.7, color: C.rose }] },
      ],
    },
    cheetahSeeds: {
      aria: "Per-seed return difference versus Official TD-JEPA on the Cheetah ablation subset.",
      ymin: -90,
      ymax: 160,
      plot: 250,
      ytitle: "Δ return vs. Official",
      ticks: [-50, 0, 50, 100, 150],
      series: [
        { name: "Twin (full)", color: C.teal },
        { name: "gap-only", color: C.green },
        { name: "pref-only", color: C.sand },
        { name: "λ = 0.05", color: C.purple },
        { name: "λ = 0.5", color: C.rose },
      ],
      groups: [
        { label: "3917", bars: [{ v: 128.4 }, { v: 107.0 }, { v: 72.2 }, { v: 122.3 }, { v: 62.2 }] },
        { label: "3502", bars: [{ v: -42.7 }, { v: -26.1 }, { v: -60.2 }, { v: 34.1 }, { v: -15.8 }] },
        { label: "8948", bars: [{ v: 47.5 }, { v: 69.6 }, { v: 53.4 }, { v: -71.9 }, { v: 50.0 }] },
        { label: "9460", bars: [{ v: 105.6 }, { v: 57.3 }, { v: 45.3 }, { v: 40.6 }, { v: 52.7 }] },
        { label: "4729", bars: [{ v: 65.8 }, { v: 12.0 }, { v: -14.4 }, { v: -3.7 }, { v: -54.1 }] },
      ],
    },
    walker: {
      aria: "Walker per-task return at Fixed-HP. Gains sit on stand and run; walk and spin are near the ceiling.",
      ymin: 0,
      ymax: 1120,
      plot: 280,
      ytitle: "Mean episode reward @ 3M",
      ticks: [0, 200, 400, 600, 800, 1000],
      series: [
        { name: "Official", color: C.gray },
        { name: "TwinJEPA", color: C.vivid },
      ],
      band: { from: 900, to: 1000 },
      refline: { v: 1000 },
      foot: "Dashed line: ceiling ≈ 1000. Shaded band: ≥ 900.",
      groups: [
        { label: "Stand", sub: "headroom", kind: "head", delta: 20.6, bars: [{ v: 919.6 }, { v: 940.2 }] },
        { label: "Run", sub: "headroom", kind: "head", delta: 18.3, bars: [{ v: 304.7 }, { v: 323.0 }] },
        { label: "Walk", sub: "near ceiling", kind: "ceil", delta: -4.8, bars: [{ v: 887.8 }, { v: 883.0 }] },
        { label: "Spin", sub: "near ceiling", kind: "ceil", delta: -0.7, bars: [{ v: 985.1 }, { v: 984.4 }] },
      ],
    },
    maze2d: {
      aria: "Maze2D per-task success at Fixed-HP. T1 and T2 stay at zero; T3 to T5 carry the gain.",
      ymin: 0,
      ymax: 70,
      plot: 250,
      ytitle: "Zero-shot success (%) @ 1M",
      ticks: [0, 20, 40, 60],
      series: [
        { name: "Official", color: C.gray },
        { name: "TwinJEPA", color: C.vivid },
      ],
      groups: [
        { label: "T1", delta: 0, bars: [{ v: 0 }, { v: 0 }] },
        { label: "T2", delta: 0, bars: [{ v: 0 }, { v: 0 }] },
        { label: "T3", delta: 12, bars: [{ v: 38 }, { v: 50 }] },
        { label: "T4", delta: 6, bars: [{ v: 4 }, { v: 10 }] },
        { label: "T5", delta: 8, bars: [{ v: 4 }, { v: 12 }] },
      ],
    },
    mnComponents: {
      aria: "Component ablation on AntMaze medium-navigate.",
      ymin: 0,
      ymax: 100,
      plot: 250,
      ytitle: "Success (%)",
      ticks: [0, 20, 40, 60, 80, 100],
      showValues: true,
      digits: 1,
      groups: [
        { label: "Official", bars: [{ v: 68.8, e: 4.0, color: C.blue }] },
        { label: "Gap-only", bars: [{ v: 74.0, e: 3.0, color: C.green }] },
        { label: "Pref-only", bars: [{ v: 77.0, e: 2.9, color: C.purple }] },
        { label: "TwinJEPA", bars: [{ v: 73.2, e: 3.5, color: C.orange }] },
      ],
    },
    mnLambda: {
      aria: "Lambda sensitivity on AntMaze medium-navigate. All settings stay above Official.",
      ymin: 0,
      ymax: 100,
      plot: 250,
      ytitle: "Success (%)",
      ticks: [0, 20, 40, 60, 80, 100],
      showValues: true,
      digits: 1,
      refline: { v: 68.8, label: "Official 68.8", accent: true },
      groups: [
        { label: "λ = 0.05", bars: [{ v: 77.2, e: 2.0, color: C.orange }] },
        { label: "λ = 0.1", bars: [{ v: 73.2, e: 3.5, color: C.orange }] },
        { label: "λ = 0.5", bars: [{ v: 78.4, e: 2.5, color: C.orange }] },
      ],
    },
    forest: {
      kind: "forest",
      aria: "Paired mean differences and 95% bootstrap intervals. Success-rate tasks are in percentage points; return tasks use their native scale.",
      panels: [
        {
          title: "Success-rate tasks",
          unit: "pp",
          xmin: -20,
          xmax: 24,
          rows: [
            { label: "AntMaze mn", mean: 4.4, lo: -7.4, hi: 16.4, seeds: "5/10" },
            { label: "AntMaze ln", mean: 0.8, lo: -7.0, hi: 8.4, seeds: "5/10" },
            { label: "AntMaze ms", mean: 0.6, lo: -13.6, hi: 13.6, seeds: "6/10" },
            { label: "AntMaze ls", mean: 3.4, lo: -3.0, hi: 8.6, seeds: "7/10" },
            { label: "AntMaze-4", mean: 2.3, lo: -2.8, hi: 7.8, seeds: "5/10" },
            { label: "Maze2D", mean: 5.2, lo: 1.6, hi: 10.0, seeds: "4/5" },
          ],
        },
        {
          title: "Return-based tasks",
          unit: "return",
          xmin: -40,
          xmax: 90,
          rows: [
            { label: "Walker", mean: 8.4, lo: -9.9, hi: 26.6, seeds: "3/5" },
            { label: "Cheetah", mean: 33.7, lo: -1.0, hi: 68.8, seeds: "7/10" },
            { label: "Quadruped", mean: 40.4, lo: 20.6, hi: 60.3, seeds: "5/5" },
          ],
        },
      ],
    },
    heatNav: {
      kind: "heat",
      aria: "Task-level success differences in percentage points for AntMaze and Maze2D.",
      title: "Navigation · Δ success (pp)",
      vmax: 20,
      cols: ["T1", "T2", "T3", "T4", "T5", "Avg"],
      rows: [
        { label: "AntMaze mn", cells: [-2, 6, 17, -3, 4, 4.4] },
        { label: "AntMaze ln", cells: [5, -14, 4, -7, 16, 0.8] },
        { label: "AntMaze ms", cells: [13, -2, -18, -3, 13, 0.6] },
        { label: "AntMaze ls", cells: [11, -3, 4, -2, 7, 3.4] },
        { label: "Maze2D", cells: [0, 0, 12, 6, 8, 5.2] },
      ],
    },
    heatCtrl: {
      kind: "heat",
      aria: "Task-level return differences for Walker, Cheetah, and Quadruped.",
      title: "Continuous control · Δ return",
      vmax: 80,
      rows: [
        { label: "Walker", cells: [
          ["stand", 20.6], ["run", 18.3], ["walk", -4.8], ["spin", -0.7], ["avg", 8.4],
        ] },
        { label: "Cheetah", cells: [
          ["walk", 70.7], ["w-bwd", 0.1], ["run", 56.7], ["r-bwd", 7.2], ["avg", 33.7],
        ] },
        { label: "Quadruped", cells: [
          ["stand", 49.6], ["walk", 72.1], ["run", 24.8], ["jump", 15.2], ["avg", 40.4],
        ] },
      ],
    },
    cheetahTasks: {
      aria: "Cheetah per-task return at Fixed-HP. Gains sit on forward walk and run.",
      ymin: 0,
      ymax: 1180,
      plot: 260,
      ytitle: "Return @ 1M",
      ticks: [0, 200, 400, 600, 800, 1000],
      series: [
        { name: "Official", color: C.gray },
        { name: "TwinJEPA", color: C.vivid },
      ],
      band: { from: 900, to: 1000 },
      refline: { v: 1000 },
      foot: "Shaded band: near ceiling (≥ 900).",
      groups: [
        { label: "walk", sub: "forward", kind: "head", delta: 70.7, bars: [{ v: 892.6 }, { v: 963.3 }] },
        { label: "run", sub: "forward", kind: "head", delta: 56.7, bars: [{ v: 303.7 }, { v: 360.4 }] },
        { label: "walk back", sub: "saturated", kind: "ceil", delta: 0.1, bars: [{ v: 984.3 }, { v: 984.5 }] },
        { label: "run back", sub: "backward", kind: "ceil", delta: 7.2, bars: [{ v: 371.3 }, { v: 378.5 }] },
      ],
    },
    quadTasks: {
      aria: "Quadruped per-task return at Fixed-HP. All four tasks improve.",
      ymin: 0,
      ymax: 1000,
      plot: 260,
      ytitle: "Return @ 1M",
      ticks: [0, 200, 400, 600, 800, 1000],
      series: [
        { name: "Official", color: C.gray },
        { name: "TwinJEPA", color: C.vivid },
      ],
      groups: [
        { label: "stand", delta: 49.6, bars: [{ v: 754.5 }, { v: 804.1 }] },
        { label: "walk", delta: 72.1, bars: [{ v: 462.7 }, { v: 534.8 }] },
        { label: "run", delta: 24.8, bars: [{ v: 384.4 }, { v: 409.2 }] },
        { label: "jump", delta: 15.2, bars: [{ v: 635.9 }, { v: 651.1 }] },
      ],
    },
  };

  const pct = (v, ymin, ymax) => ((v - ymin) / (ymax - ymin)) * 100;

  const fmt = (v, digits, signed) => {
    const n = Math.abs(v).toFixed(digits);
    if (!signed) return n;
    if (v > 0) return "+" + n;
    if (v < 0) return "−" + n;
    return Number(0).toFixed(digits);
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  function renderVertical(root, chart) {
    const ymin = chart.ymin;
    const ymax = chart.ymax;
    root.style.setProperty("--plot", (chart.plot || 240) + "px");
    root.setAttribute("aria-label", chart.aria);

    if (chart.series) {
      const head = el("div", "gbar-head");
      chart.series.forEach((s) => {
        const key = el("span", "gbar-key");
        const sw = el("i", "gbar-swatch");
        sw.style.background = s.color;
        key.append(sw, document.createTextNode(s.name));
        head.append(key);
      });
      if (chart.foot) head.append(el("span", "gbar-note-line", chart.foot));
      root.append(head);
    }

    const body = el("div", "gbar-body");
    body.append(el("div", "gbar-ytitle", chart.ytitle));
    const axis = el("div", "gbar-yaxis");
    chart.ticks.forEach((t) => {
      const tick = el("span", "gbar-tick", String(t));
      tick.style.bottom = pct(t, ymin, ymax) + "%";
      axis.append(tick);
    });
    body.append(axis);

    const canvas = el("div", "gbar-canvas");
    const lines = el("div", "gbar-hlines");
    chart.ticks.forEach((t) => {
      if (t === ymin) return;
      const line = el("span", "gbar-hline");
      line.style.bottom = pct(t, ymin, ymax) + "%";
      lines.append(line);
    });
    canvas.append(lines);

    if (chart.band) {
      const band = el("div", "gbar-band");
      const b0 = pct(chart.band.from, ymin, ymax);
      const b1 = pct(chart.band.to, ymin, ymax);
      band.style.bottom = b0 + "%";
      band.style.height = b1 - b0 + "%";
      canvas.append(band);
    }
    if (chart.refline) {
      const ref = el("div", "gbar-refline" + (chart.refline.accent ? " accent" : ""));
      ref.style.bottom = pct(chart.refline.v, ymin, ymax) + "%";
      if (chart.refline.label) ref.append(el("span", null, chart.refline.label));
      canvas.append(ref);
    }
    if (ymin < 0 && ymax > 0) {
      const zero = el("div", "gbar-zero");
      zero.style.bottom = pct(0, ymin, ymax) + "%";
      canvas.append(zero);
    }

    const groups = el("div", "gbar-groups");
    const xrow = el("div", "gbar-xrow");
    chart.groups.forEach((group, gi) => {
      const g = el("div", "gbar-group");
      const bars = el("div", "gbar-bars");
      const peak = Math.max(...group.bars.map((b) => b.v));
      group.bars.forEach((bar, bi) => {
        const slot = el("div", "gbar-slot");
        const color = bar.color || (chart.series && chart.series[bi] && chart.series[bi].color) || C.orange;
        const seriesName = (chart.series && chart.series[bi] && chart.series[bi].name) || group.label.replace("\n", " ");
        const delay = (gi * 0.12 + bi * 0.07).toFixed(2) + "s";
        const h = bar.v >= 0 || ymin >= 0
          ? pct(bar.v, ymin, ymax) - (ymin < 0 ? pct(0, ymin, ymax) : 0)
          : pct(0, ymin, ymax) - pct(bar.v, ymin, ymax);
        if (h > 0.4) {
          const rect = el("b", "gbar-bar" + (bar.v < 0 && ymin < 0 ? " down" : ""));
          rect.style.background = color;
          rect.style.setProperty("--h", h + "%");
          rect.style.setProperty("--d", delay);
          if (ymin < 0) {
            if (bar.v >= 0) {
              rect.style.setProperty("--b", pct(0, ymin, ymax) + "%");
              rect.style.setProperty("--o", "bottom");
            } else {
              rect.style.setProperty("--b", pct(bar.v, ymin, ymax) + "%");
              rect.style.setProperty("--o", "top");
            }
          } else {
            rect.style.setProperty("--b", "0%");
            rect.style.setProperty("--o", "bottom");
          }
          rect.title = seriesName + ": " + fmt(bar.v, 1, false);
          slot.append(rect);
        }
        if (bar.e) {
          const err = el("i", "gbar-err");
          const lo = Math.max(0, pct(bar.v - bar.e, ymin, ymax));
          const hi = Math.min(100, pct(bar.v + bar.e, ymin, ymax));
          err.style.setProperty("--lo", lo + "%");
          err.style.setProperty("--hi", hi + "%");
          err.style.setProperty("--d", delay);
          slot.append(err);
        }
        if (chart.showValues) {
          const val = el("span", "gbar-val", fmt(bar.v, chart.digits ?? 1, false));
          const top = pct(bar.v + (bar.e || 0), ymin, ymax);
          val.style.bottom = "calc(" + top + "% + 3px)";
          val.style.setProperty("--d", delay);
          slot.append(val);
        }
        bars.append(slot);
      });
      if (group.delta != null) {
        const delta = el("span", "gbar-delta " + (group.delta < 0 ? "neg" : "pos"), fmt(group.delta, 1, true));
        delta.style.bottom = "calc(" + pct(peak, ymin, ymax) + "% + 8px)";
        delta.style.setProperty("--d", (gi * 0.12).toFixed(2) + "s");
        g.append(delta);
      }
      g.append(bars);
      groups.append(g);

      const xlab = el("div", "gbar-xlabel" + (group.kind ? " " + group.kind : ""));
      group.label.split("\n").forEach((line, i) => {
        if (i) xlab.append(document.createElement("br"));
        xlab.append(document.createTextNode(line));
      });
      if (group.sub) xlab.append(el("small", null, group.sub));
      xrow.append(xlab);
    });
    canvas.append(groups);
    body.append(canvas);
    root.append(body);

    const labels = el("div", "gbar-xlabels");
    labels.append(el("span"), el("span"), xrow);
    root.append(labels);
  }

  function renderHorizontal(root, chart) {
    root.setAttribute("aria-label", chart.aria);
    const head = el("div", "gbar-head");
    const key = el("span", "gbar-key");
    const sw = el("i", "gbar-swatch");
    sw.style.background = chart.color;
    key.append(sw, document.createTextNode(chart.seriesName));
    head.append(key);
    root.append(head);

    const rows = el("div", "gbar-hrows");
    chart.rows.forEach((row, i) => {
      const line = el("div", "gbar-hrow");
      line.append(el("div", "gbar-hlabel", row.label));
      const track = el("div", "gbar-htrack");
      const bar = el("b", "gbar-bar");
      bar.style.background = chart.color;
      bar.style.setProperty("--h", (row.v / chart.xmax) * 100 + "%");
      bar.style.setProperty("--d", (i * 0.12).toFixed(2) + "s");
      bar.title = row.label + ": +" + row.v;
      track.append(bar);
      line.append(track);
      const val = el("span", "gbar-val", "+" + row.v);
      val.style.setProperty("--d", (i * 0.12).toFixed(2) + "s");
      line.append(val);
      rows.append(line);
    });
    root.append(rows);
    const axis = el("div", "gbar-haxis");
    chart.ticks.forEach((t) => axis.append(el("span", null, String(t))));
    root.append(axis);
  }

  function heatInk(v, vmax) {
    const t = Math.max(-1, Math.min(1, v / vmax));
    const mag = Math.abs(t);
    const tone = t >= 0 ? [196, 78, 68] : [52, 104, 176];
    const rgb = tone.map((ch) => Math.round(255 + (ch - 255) * Math.pow(mag, 0.85)));
    return {
      bg: "rgb(" + rgb.join(",") + ")",
      fg: mag > 0.62 ? "#fff" : "#2c261f",
    };
  }

  function renderForest(root, chart) {
    root.setAttribute("aria-label", chart.aria);
    const wrap = el("div", "forest-panels");
    chart.panels.forEach((panel) => {
      const box = el("div", "forest-panel");
      box.append(el("div", "forest-title", panel.title));
      const axis = el("div", "forest-scale");
      const span = panel.xmax - panel.xmin;
      [panel.xmin, 0, panel.xmax].forEach((tick) => {
        const mark = el("span", null, String(tick));
        mark.style.left = ((tick - panel.xmin) / span) * 100 + "%";
        axis.append(mark);
      });
      panel.rows.forEach((row, i) => {
        const line = el("div", "forest-row");
        line.append(el("div", "forest-name", row.label));
        const track = el("div", "forest-track");
        const zeroAt = ((0 - panel.xmin) / span) * 100;
        const zero = el("i", "forest-zero");
        zero.style.left = zeroAt + "%";
        track.append(zero);
        const left = ((row.lo - panel.xmin) / span) * 100;
        const width = ((row.hi - row.lo) / span) * 100;
        const origin = ((0 - row.lo) / (row.hi - row.lo)) * 100;
        const ci = el("b", "gbar-bar forest-ci");
        ci.dataset.axis = "x";
        ci.style.left = left + "%";
        ci.style.width = width + "%";
        ci.style.transformOrigin = origin + "% center";
        ci.style.setProperty("--d", (i * 0.12).toFixed(2) + "s");
        ci.title = row.label + " 95% CI [" + row.lo + ", " + row.hi + "]";
        track.append(ci);
        const diamond = el("b", "gbar-bar forest-diamond");
        diamond.dataset.axis = "both";
        diamond.dataset.from = "scale(0) rotate(45deg)";
        diamond.dataset.to = "scale(1) rotate(45deg)";
        diamond.style.left = ((row.mean - panel.xmin) / span) * 100 + "%";
        diamond.style.setProperty("--d", (i * 0.12 + 0.28).toFixed(2) + "s");
        diamond.title = row.label + " mean " + fmt(row.mean, 1, true);
        track.append(diamond);
        line.append(track);
        const meta = el("div", "forest-meta");
        const mean = el("span", "gbar-val forest-mean " + (row.mean < 0 ? "neg" : "pos"), fmt(row.mean, 1, true));
        mean.style.setProperty("--d", (i * 0.12).toFixed(2) + "s");
        const seeds = el("span", "gbar-val forest-seeds", row.seeds);
        seeds.style.setProperty("--d", (i * 0.12 + 0.15).toFixed(2) + "s");
        meta.append(mean, seeds);
        line.append(meta);
        box.append(line);
      });
      box.append(axis);
      wrap.append(box);
    });
    root.append(wrap);
  }

  function renderHeat(root, chart) {
    root.setAttribute("aria-label", chart.aria);
    root.append(el("div", "heat-title", chart.title));
    const named = chart.rows[0].cells[0] && typeof chart.rows[0].cells[0] !== "number";
    const cols = named ? chart.rows[0].cells.length : chart.cols.length;
    const grid = el("div", "heat-grid");
    grid.style.gridTemplateColumns = "6.4rem repeat(" + cols + ", minmax(0, 1fr))";
    grid.append(el("span"));
    if (!named) chart.cols.forEach((name) => grid.append(el("span", "heat-col", name)));
    else {
      for (let i = 0; i < cols; i += 1) grid.append(el("span"));
    }
    chart.rows.forEach((row, ri) => {
      grid.append(el("span", "heat-row", row.label));
      row.cells.forEach((cell, ci) => {
        const value = named ? cell[1] : cell;
        const task = named ? cell[0] : null;
        const ink = heatInk(value, chart.vmax);
        const slot = el("div", "heat-slot");
        const swatch = el("b", "gbar-bar heat-swatch");
        swatch.dataset.axis = "both";
        swatch.style.background = ink.bg;
        swatch.style.color = ink.fg;
        swatch.style.setProperty("--d", ((ri * cols + ci) * 0.045).toFixed(2) + "s");
        swatch.append(el("span", null, fmt(value, 1, true)));
        swatch.title = row.label + (task ? " " + task : " " + chart.cols[ci]) + " " + fmt(value, 1, true);
        slot.append(swatch);
        if (task) slot.append(el("span", "heat-task", task));
        grid.append(slot);
      });
    });
    root.append(grid);
  }

  function render(root) {
    const chart = charts[root.dataset.chart];
    if (!chart) return;
    if (chart.kind === "forest") renderForest(root, chart);
    else if (chart.kind === "heat") renderHeat(root, chart);
    else if (chart.horizontal) renderHorizontal(root, chart);
    else renderVertical(root, chart);
  }

  document.querySelectorAll(".gbar[data-chart]").forEach(render);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const play = (root) => {
    if (root.dataset.played) return;
    root.dataset.played = "1";
    const horizontal = root.classList.contains("gbar-h");
    const motion = (bar) => {
      if (bar.dataset.from && bar.dataset.to) return [bar.dataset.from, bar.dataset.to];
      const axis = bar.dataset.axis || (horizontal ? "x" : "y");
      if (axis === "x") return ["scaleX(0)", "scaleX(1)"];
      if (axis === "both") return ["scale(0)", "scale(1)"];
      return ["scaleY(0)", "scaleY(1)"];
    };
    const bars = [...root.querySelectorAll(".gbar-bar")];
    bars.forEach((bar) => {
      bar.style.transform = motion(bar)[0];
    });
    root.classList.add("in");
    if (reduce) {
      bars.forEach((bar) => {
        bar.style.transform = motion(bar)[1];
      });
      return;
    }
    bars.forEach((bar) => {
      const delay = (parseFloat(bar.style.getPropertyValue("--d")) || 0) * 1000;
      const pair = motion(bar);
      const anim = bar.animate(
        [{ transform: pair[0] }, { transform: pair[1] }],
        {
          duration: 1200,
          delay,
          easing: "cubic-bezier(0.16, 0.84, 0.28, 1)",
          fill: "forwards",
        }
      );
      anim.onfinish = () => {
        bar.style.transform = pair[1];
      };
    });
  };

  const nodes = [...document.querySelectorAll(".gbar[data-chart]")];
  if (reduce) {
    nodes.forEach(play);
    return;
  }
  const watch = () => {
    nodes.forEach((node) => {
      if (node.dataset.played) return;
      const rect = node.getBoundingClientRect();
      const shown = rect.height > 40 && rect.bottom > 64 && rect.top < window.innerHeight - 24;
      if (shown) play(node);
    });
  };
  watch();
  window.addEventListener("scroll", watch, { passive: true });
  window.addEventListener("resize", watch);
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => requestAnimationFrame(watch));
  });
})();
