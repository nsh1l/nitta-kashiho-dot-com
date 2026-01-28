document.addEventListener("alpine:init", () => {
  Alpine.data("mapComponent", () => ({
    initMap() {
      setTimeout(() => {
        const mapContainer = document.getElementById("map");
        if (!mapContainer) return;

        const lat = parseFloat(mapContainer.dataset.lat);
        const lng = parseFloat(mapContainer.dataset.lng);
        const company = mapContainer.dataset.company || "";
        const pref = mapContainer.dataset.pref || "";
        const city = mapContainer.dataset.city || "";
        const street = mapContainer.dataset.street || "";

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        const map = L.map(mapContainer).setView([lat, lng], 18);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`${company}<br>${pref} ${city} ${street}`)
          .openPopup();
      }, 100);
    },
  }));
});
