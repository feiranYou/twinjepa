(() => {
  const tabs = document.querySelectorAll(".tab");
  const panels = {
    antmaze: document.getElementById("panel-antmaze"),
    transfer: document.getElementById("panel-transfer"),
  };

  const activateTab = (id) => {
    const tab = document.querySelector(`.tab[data-tab="${id}"]`);
    if (!tab) return;
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
    });
    Object.entries(panels).forEach(([key, panel]) => {
      if (panel) panel.classList.toggle("active", key === id);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
  });

  document.querySelectorAll("[data-jump-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      activateTab(el.dataset.jumpTab);
    });
  });

  document.querySelectorAll(".demo-pair").forEach((pair) => {
    const videos = [...pair.querySelectorAll("video")];
    const btn = pair.querySelector(".play-pair");
    if (!btn || videos.length < 2) return;
    btn.addEventListener("click", () => {
      const shouldPlay = videos.some((v) => v.paused);
      videos.forEach((v) => {
        v.currentTime = 0;
        if (shouldPlay) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
      btn.textContent = shouldPlay ? "Pause both" : "Play both";
    });
    videos.forEach((v) => {
      v.addEventListener("play", () => {
        btn.textContent = "Pause both";
      });
      v.addEventListener("pause", () => {
        if (videos.every((x) => x.paused)) btn.textContent = "Play both";
      });
    });
  });

  const copyBtn = document.getElementById("copy-bib");
  const bib = document.getElementById("bibtex");
  if (copyBtn && bib) {
    copyBtn.addEventListener("click", async () => {
      const text = bib.innerText;
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied";
        setTimeout(() => {
          copyBtn.textContent = "Copy BibTeX";
        }, 1400);
      } catch (_) {
        copyBtn.textContent = "Select & copy manually";
      }
    });
  }
})();
