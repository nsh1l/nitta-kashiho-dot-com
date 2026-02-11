// src/assets/js/access.mjs

// Alpine.js が確実に初期化されるまで待機
function waitForAlpine() {
  return new Promise((resolve) => {
    const checkAlpine = () => {
      if (typeof Alpine !== 'undefined' && Alpine.version) {
        resolve();
      } else {
        requestAnimationFrame(checkAlpine);
      }
    };
    checkAlpine();
  });
}

await waitForAlpine();

// Alpine の初期化イベントを待つ
document.addEventListener("alpine:init", () => {
  Alpine.data("mapComponent", () => ({
    initMap() {
      this.$nextTick(() => {
        const mapContainer = document.getElementById("map");
        if (!mapContainer) return;

        const lat = parseFloat(mapContainer.dataset.lat);
        const lng = parseFloat(mapContainer.dataset.lng);
        const company = mapContainer.dataset.company || "";
        const pref = mapContainer.dataset.pref || "";
        const city = mapContainer.dataset.city || "";
        const street = mapContainer.dataset.street || "";

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          console.warn("Invalid coordinates:", { lat, lng });
          return;
        }

        try {
          const map = L.map(mapContainer).setView([lat, lng], 18);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`${company}<br>${pref} ${city} ${street}`)
            .openPopup();
            
          console.log("Map initialized successfully");
        } catch (error) {
          console.error("Map initialization error:", error);
        }
      });
    },
  }));
});