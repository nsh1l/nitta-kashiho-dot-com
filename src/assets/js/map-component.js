function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function registerMapComponent() {
  if (!window.Alpine) return;

  window.Alpine.data("mapComponent", () => ({
    map: null,
    resizeObserver: null,

    init() {
      this.$nextTick(() => {
        this.mountMap();
      });
    },

    mountMap() {
      const container = this.$el;
      if (!container || container.dataset.mapInitialized === "true") return;
      if (!window.maplibregl) {
        console.warn("MapLibre GL JS is not available.");
        return;
      }

      const lat = Number.parseFloat(container.dataset.lat || "");
      const lng = Number.parseFloat(container.dataset.lng || "");
      const company = container.dataset.company || "";
      const pref = container.dataset.pref || "";
      const city = container.dataset.city || "";
      const street = container.dataset.street || "";

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        console.warn("Invalid coordinates:", { lat, lng });
        return;
      }

      if (typeof maplibregl.setWorkerUrl === "function") {
        maplibregl.setWorkerUrl("/assets/vendor/maplibre-gl/maplibre-gl-csp-worker.js");
      }

      const popupHtml = [
        `<strong>${escapeHtml(company)}</strong>`,
        `${escapeHtml(pref)} ${escapeHtml(city)} ${escapeHtml(street)}`.trim(),
      ].join("<br>");

      try {
        this.map = new maplibregl.Map({
          container,
          style: {
            version: 8,
            sources: {
              osm: {
                type: "raster",
                tiles: [
                  "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
                ],
                tileSize: 256,
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              },
            },
            layers: [
              {
                id: "osm",
                type: "raster",
                source: "osm",
                minzoom: 0,
                maxzoom: 19,
              },
            ],
          },
          center: [lng, lat],
          zoom: 14,
        });

        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 25,
        }).setHTML(popupHtml);

        new maplibregl.Marker({ color: "#d97706" })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map)
          .togglePopup();

        this.resizeObserver = new ResizeObserver(() => {
          this.map?.resize();
        });
        this.resizeObserver.observe(container);
        container.dataset.mapInitialized = "true";
      } catch (error) {
        console.error("MapLibre initialization error:", error);
      }
    },
  }));
}

if (window.Alpine?.version) {
  registerMapComponent();
} else {
  document.addEventListener("alpine:init", registerMapComponent);
}
