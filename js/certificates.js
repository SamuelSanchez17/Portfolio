// ─── Certificate Image Zoom Modal ─────────────────────────────────────────────
// Each certificate image opens in an isolated modal: no cross-cert navigation.
// Reuses the same .img-modal CSS already present in app.css (same as projects).

document.addEventListener("DOMContentLoaded", () => {

  // ── Build modal ───────────────────────────────────────────────────────────
  const modal = document.createElement("div");
  modal.id = "img-modal";
  modal.className = "img-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Certificate preview");
  modal.innerHTML = `
    <div class="img-modal-backdrop"></div>
    <div class="img-modal-box">
      <button class="img-modal-close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <img class="img-modal-img" src="" alt="" />
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector(".img-modal-img");

  // ── Open / close ──────────────────────────────────────────────────────────
  function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ── Wire up thumbnail clicks ──────────────────────────────────────────────
  document.querySelectorAll(".cert-snapshot").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openModal(img.src, img.alt));
  });

  // ── Controls ──────────────────────────────────────────────────────────────
  modal.querySelector(".img-modal-backdrop").addEventListener("click", closeModal);
  modal.querySelector(".img-modal-close").addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
  });
});

