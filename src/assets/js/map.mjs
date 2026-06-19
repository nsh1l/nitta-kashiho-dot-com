/**
 * MapLibre GL JS initialization for 新田菓子舗 store locator
 * Uses free OpenStreetMap raster tiles — no API key required
 */

document.addEventListener("alpine:init", () => {
  Alpine.data("mapComponent", () => ({
    initMap() {
      this.$nextTick(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const lat = parseFloat(container.dataset.lat);
        const lng = parseFloat(container.dataset.lng);
        const company = container.dataset.company || "";
        const pref = container.dataset.pref || "";
        const city = container.dataset.city || "";
        const street = container.dataset.street || "";

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          console.warn("Invalid coordinates:", { lat, lng });
          return;
        }

        try {
          const map = new maplibregl.Map({
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

          const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
            `<strong>${company}</strong><br>${pref} ${city} ${street}`
          );

          new maplibregl.Marker({ color: "#d97706" })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);

          // Ensure map resizes correctly
          const ro = new ResizeObserver(() => {
            map.resize();
          });
          ro.observe(container);
        } catch (error) {
          console.error("MapLibre initialization error:", error);
        }
      });
    },
  }));
});