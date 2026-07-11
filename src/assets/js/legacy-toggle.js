function registerLegacyToggle() {
  if (!window.Alpine) return;

  window.Alpine.data("legacyToggle", () => ({
    show: false,

    init() {
      window.setTimeout(() => {
        this.show = true;
      }, 500);
    },
  }));
}

if (window.Alpine?.version) {
  registerLegacyToggle();
} else {
  document.addEventListener("alpine:init", registerLegacyToggle);
}
