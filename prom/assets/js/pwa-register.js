(function () {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const currentScript = document.currentScript;
  const serviceWorkerUrl = currentScript?.dataset.serviceWorker || "./sw.js";
  const serviceWorkerScope = currentScript?.dataset.scope || "./";

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(serviceWorkerUrl, { scope: serviceWorkerScope }).catch(() => {
      // La PWA es una mejora progresiva: si falla el registro, la web sigue funcionando.
    });
  });
})();
