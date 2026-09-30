(function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = t => t.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();

  const lb = document.getElementById("lightbox");
  const lbFigure = document.getElementById("lbFigure");
  const lbCount = document.getElementById("lbCount");
  let current = { list: [], index: 0, trigger: null };

  function placeholder(item, label) {
    return `<div class="g-placeholder"><div><b>${esc(initials(item.title))}</b>${esc(label)}<br><small>${esc(item.src)}</small></div></div>`;
  }

  function setupGallery({ data, gridId, filtersId, label }) {
    const grid = document.getElementById(gridId);
    const filterBox = document.getElementById(filtersId);
    if (!grid || !filterBox) return;
    let active = "Semua";

    const categories = ["Semua", ...new Set(data.map(d => d.category).filter(Boolean))];
    filterBox.innerHTML = categories.map(c => `<button class="filter${c === active ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

    function render() {
      const list = active === "Semua" ? data : data.filter(d => d.category === active);
      if (!list.length) {
        grid.innerHTML = `<div class="g-empty">Belum ada ${esc(label.toLowerCase())} untuk kategori ini.</div>`;
        return;
      }
      grid.innerHTML = list.map((item, i) => `
        <button class="g-item" data-i="${i}" aria-label="Lihat ${esc(item.title)}">
          <div class="g-thumb">
            ${placeholder(item, label)}
            <img src="${esc(item.src)}" alt="${esc(item.title)}" loading="lazy">
          </div>
          <div class="g-info">
            <div class="g-meta">${esc(item.category).toUpperCase()}${item.year ? " • " + esc(item.year) : ""}</div>
            <h3>${esc(item.title)}</h3>
            ${item.desc ? `<p>${esc(item.desc)}</p>` : ""}
          </div>
        </button>`).join("");

      // Sembunyikan placeholder bila gambar berhasil dimuat; hapus <img> bila gagal
      grid.querySelectorAll(".g-thumb").forEach(t => {
        const img = t.querySelector("img"), ph = t.querySelector(".g-placeholder");
        img.addEventListener("load", () => ph.remove());
        img.addEventListener("error", () => img.remove());
        if (img.complete && img.naturalWidth) ph.remove();
      });

      grid.querySelectorAll(".g-item").forEach(btn =>
        btn.addEventListener("click", () => openLightbox(list, +btn.dataset.i, btn, label)));
    }

    filterBox.addEventListener("click", e => {
      const b = e.target.closest(".filter");
      if (!b) return;
      active = b.dataset.cat;
      filterBox.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x === b));
      render();
    });
    render();
  }

  function showLightbox() {
    const { list, index } = current;
    const item = list[index];
    lbFigure.innerHTML = `
      <img src="${esc(item.src)}" alt="${esc(item.title)}">
      <figcaption class="lb-caption"><strong>${esc(item.title)}</strong><span>${esc(item.category)}${item.year ? " • " + esc(item.year) : ""}${item.desc ? " — " + esc(item.desc) : ""}</span></figcaption>`;
    const img = lbFigure.querySelector("img");
    img.addEventListener("error", () => img.outerHTML = placeholder(item, current.label));
    lbCount.textContent = `${index + 1} / ${list.length}`;
    const multi = list.length > 1;
    document.getElementById("lbPrev").style.display = multi ? "" : "none";
    document.getElementById("lbNext").style.display = multi ? "" : "none";
  }

  function openLightbox(list, index, trigger, label) {
    current = { list, index, trigger, label };
    showLightbox();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    document.getElementById("lbClose").focus();
  }
  function closeLightbox() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    current.trigger && current.trigger.focus();
  }
  function step(d) {
    const n = current.list.length;
    current.index = (current.index + d + n) % n;
    showLightbox();
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", () => step(-1));
  document.getElementById("lbNext").addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // Swipe di HP
  let sx = null;
  lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    sx = null;
  });

  setupGallery({ data: CERTIFICATES, gridId: "certGrid",  filtersId: "certFilters",  label: "Sertifikat" });
  setupGallery({ data: PHOTOS,       gridId: "photoGrid", filtersId: "photoFilters", label: "Foto" });
})();
