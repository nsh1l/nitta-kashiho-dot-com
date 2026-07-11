document.addEventListener("alpine:init", () => {
  window.Alpine.data("image", () => ({
    fallback: "/assets/img/404.jpg",

    handleError(e) {
      const el = e.target;

      if (el.dataset.errored) return;

      el.dataset.errored = "true";
      el.src = el.dataset.fallback || this.fallback;
    },
  }));
});
