import Alpine from "../vendor/alpinejs/module.esm.js";

window.Alpine = Alpine;

const registrations = [import("./img-onerror.js"), import("./legacy-toggle.js")];

if (document.querySelector('[x-data="mapComponent"]')) {
  registrations.push(import("./map-component.js"));
}

await Promise.all(registrations);

Alpine.start();
