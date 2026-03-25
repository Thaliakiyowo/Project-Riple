/* ══════════════════════════════════════════════
   RIPPLE — Theme Manager (shared)
   Handles dark/light toggle + settings panel
══════════════════════════════════════════════ */

const RippleTheme = (() => {
  const STORAGE_KEY = "ripple_theme";

  /* ── Get saved theme or default to dark ── */
  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || "dark";
  }

  /* ── Apply theme to <html> element ── */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update all switch elements
    document.querySelectorAll(".theme-switch").forEach((sw) => {
      sw.classList.toggle("on", theme === "light");
    });

    // Update icon & label in toggle rows
    document.querySelectorAll(".theme-toggle-icon").forEach((el) => {
      el.textContent = theme === "light" ? "🌙" : "☀️";
    });
    document.querySelectorAll(".theme-toggle-text").forEach((el) => {
      el.textContent = theme === "light" ? "Mode Gelap" : "Mode Terang";
    });
    document.querySelectorAll(".theme-toggle-sub").forEach((el) => {
      el.textContent =
        theme === "light"
          ? "Klik untuk beralih ke mode gelap"
          : "Klik untuk beralih ke mode terang";
    });
  }

  /* ── Toggle between dark/light ── */
  function toggle() {
    const current = getSavedTheme();
    applyTheme(current === "dark" ? "light" : "dark");
  }

  /* ── Init: apply saved theme immediately ── */
  function init() {
    applyTheme(getSavedTheme());
  }

  /* ── Build & inject Settings Panel HTML ── */
  function injectSettingsPanel() {
    const existing = document.getElementById("settingsOverlay");
    if (existing) return;

    const overlay = document.createElement("div");
    overlay.className = "settings-overlay";
    overlay.id = "settingsOverlay";
    overlay.innerHTML = `
      <div class="settings-panel">
        <div class="settings-title">Pengaturan</div>
        <div class="settings-subtitle">Kustomisasi RIPPLE</div>
        <button class="settings-close" onclick="RippleTheme.closeSettings()" title="Tutup">✕</button>

        <div class="settings-section">
          <div class="settings-section-title">Tampilan</div>
          <div class="theme-toggle-row" onclick="RippleTheme.toggle()">
            <div class="theme-toggle-label">
              <div class="theme-toggle-icon">☀️</div>
              <div>
                <div class="theme-toggle-text">Mode Terang</div>
                <div class="theme-toggle-sub">Klik untuk beralih ke mode terang</div>
              </div>
            </div>
            <div class="theme-switch" id="mainThemeSwitch"></div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section-title">Profil</div>
          <div class="theme-toggle-row" onclick="RippleTheme.openProfileEdit()">
            <div class="theme-toggle-label">
              <div class="theme-toggle-icon">👤</div>
              <div>
                <div class="theme-toggle-text">Edit Profil</div>
                <div class="theme-toggle-sub">Ubah nama & informasi pengguna</div>
              </div>
            </div>
            <span style="color:var(--muted);font-size:12px">›</span>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section-title">Data</div>
          <div class="theme-toggle-row" onclick="RippleTheme.clearData()">
            <div class="theme-toggle-label">
              <div class="theme-toggle-icon">🗑️</div>
              <div>
                <div class="theme-toggle-text">Hapus Semua Data</div>
                <div class="theme-toggle-sub">Reset streak, history & profil</div>
              </div>
            </div>
            <span style="color:var(--red);font-size:12px">!</span>
          </div>
        </div>

        <div style="
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          font-family: 'Space Mono', monospace;
          font-size: 7px;
          color: var(--dim);
          text-align: center;
          letter-spacing: 0.08em;
        ">
          RIPPLE · Membangun Peradaban Satu Hari
        </div>
      </div>
    `;

    // Close on backdrop click
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeSettings();
    });

    document.body.appendChild(overlay);

    // Sync switch state
    applyTheme(getSavedTheme());
  }

  /* ── Open settings ── */
  function openSettings() {
    injectSettingsPanel();
    requestAnimationFrame(() => {
      document.getElementById("settingsOverlay").classList.add("open");
    });
  }

  /* ── Close settings ── */
  function closeSettings() {
    const el = document.getElementById("settingsOverlay");
    if (el) el.classList.remove("open");
  }

  /* ── Open profile edit (uses existing modal if available) ── */
  function openProfileEdit() {
    closeSettings();
    // Try to open existing profile modal (ripple_mind or daily_input)
    const profileModal = document.getElementById("profileModal");
    if (profileModal) {
      profileModal.classList.add("show");
      return;
    }
    // Fallback: simple prompt
    const current = JSON.parse(localStorage.getItem("ripple_user") || "null");
    const name = prompt("Masukkan namamu:", current?.name || "");
    if (name !== null && name.trim()) {
      localStorage.setItem(
        "ripple_user",
        JSON.stringify({ name: name.trim() }),
      );
      // Update UI elements
      const nameEls = document.querySelectorAll("#uName, #uNm, #uAvatar, #uAv");
      nameEls.forEach((el) => {
        if (el.id === "uName" || el.id === "uNm") el.textContent = name.trim();
        if (el.id === "uAvatar" || el.id === "uAv")
          el.textContent = name.trim()[0].toUpperCase();
      });
    }
  }

  /* ── Clear all Ripple data ── */
  function clearData() {
    if (
      confirm(
        "Hapus semua data Ripple? Ini akan menghapus streak, history, dan profil kamu.",
      )
    ) {
      ["ripple_history", "ripple_streak", "ripple_last_date"].forEach((k) =>
        localStorage.removeItem(k),
      );
      closeSettings();
      alert("Data berhasil dihapus. Segarkan halaman untuk mulai dari awal.");
    }
  }

  return {
    init,
    toggle,
    applyTheme,
    openSettings,
    closeSettings,
    openProfileEdit,
    clearData,
  };
})();

// Init immediately (before DOM is ready, so no flash)
RippleTheme.init();
