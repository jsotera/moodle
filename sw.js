const CACHE_NAME = "prom-lmgi-1791456299600";
const PRECACHE_URLS = [
  "./",
  "./assets/css/course.css",
  "./assets/img/UT2.1.object.png",
  "./assets/img/UT2.2.code_completion.png",
  "./assets/img/UT2.3.debug.png",
  "./assets/img/UT2.4.estados.png",
  "./assets/img/UT2.5.composition.png",
  "./assets/img/logo-maria-ana-sanz.jpg",
  "./assets/img/logo-maria-ana-sanz.png",
  "./assets/img/logo.png",
  "./assets/js/course.js",
  "./assets/js/pwa-register.js",
  "./assets/pwa/icon-192.png",
  "./assets/pwa/icon-512.png",
  "./assets/pwa/maskable-512.png",
  "./index.html",
  "./lmgi/assets/css/course.css",
  "./lmgi/assets/img/UT2.1.object.png",
  "./lmgi/assets/img/UT2.2.code_completion.png",
  "./lmgi/assets/img/UT2.3.debug.png",
  "./lmgi/assets/img/UT2.4.estados.png",
  "./lmgi/assets/img/UT2.5.composition.png",
  "./lmgi/assets/img/logo-maria-ana-sanz.jpg",
  "./lmgi/assets/img/logo-maria-ana-sanz.png",
  "./lmgi/assets/img/logo.png",
  "./lmgi/assets/js/course.js",
  "./lmgi/assets/js/pwa-register.js",
  "./lmgi/assets/js/search-data.js",
  "./lmgi/assets/pwa/icon-192.png",
  "./lmgi/assets/pwa/icon-512.png",
  "./lmgi/assets/pwa/maskable-512.png",
  "./lmgi/index.html",
  "./lmgi/ut01-ejercicios.html",
  "./lmgi/ut01-teoria.html",
  "./lmgi/ut01.html",
  "./lmgi/ut02-ejercicios.html",
  "./lmgi/ut02-teoria.html",
  "./lmgi/ut02.html",
  "./lmgi/ut03-ejercicios.html",
  "./lmgi/ut03-teoria.html",
  "./lmgi/ut03.html",
  "./lmgi/ut04-ejercicios.html",
  "./lmgi/ut04-teoria.html",
  "./lmgi/ut04.html",
  "./lmgi/ut05-ejercicios.html",
  "./lmgi/ut05-teoria.html",
  "./lmgi/ut05.html",
  "./lmgi/ut06-ejercicios.html",
  "./lmgi/ut06-teoria.html",
  "./lmgi/ut06.html",
  "./lmgi/ut07-ejercicios.html",
  "./lmgi/ut07-teoria.html",
  "./lmgi/ut07.html",
  "./lmgi/ut08-ejercicios.html",
  "./lmgi/ut08-teoria.html",
  "./lmgi/ut08.html",
  "./lmgi/ut09-ejercicios.html",
  "./lmgi/ut09-teoria.html",
  "./lmgi/ut09.html",
  "./manifest.webmanifest",
  "./prom/assets/css/course.css",
  "./prom/assets/img/UT2.1.object.png",
  "./prom/assets/img/UT2.2.code_completion.png",
  "./prom/assets/img/UT2.3.debug.png",
  "./prom/assets/img/UT2.4.estados.png",
  "./prom/assets/img/UT2.5.composition.png",
  "./prom/assets/img/logo-maria-ana-sanz.jpg",
  "./prom/assets/img/logo-maria-ana-sanz.png",
  "./prom/assets/img/logo.png",
  "./prom/assets/js/course.js",
  "./prom/assets/js/pwa-register.js",
  "./prom/assets/js/search-data.js",
  "./prom/assets/pwa/icon-192.png",
  "./prom/assets/pwa/icon-512.png",
  "./prom/assets/pwa/maskable-512.png",
  "./prom/index.html",
  "./prom/ut01-ejercicios.html",
  "./prom/ut01-teoria.html",
  "./prom/ut01.html",
  "./prom/ut02-ejercicios.html",
  "./prom/ut02-teoria.html",
  "./prom/ut02.html",
  "./prom/ut03-ejercicios.html",
  "./prom/ut03-teoria.html",
  "./prom/ut03.html",
  "./prom/ut04-ejercicios.html",
  "./prom/ut04-teoria.html",
  "./prom/ut04.html",
  "./prom/ut05-ejercicios.html",
  "./prom/ut05-teoria.html",
  "./prom/ut05.html",
  "./prom/ut06-ejercicios.html",
  "./prom/ut06-teoria.html",
  "./prom/ut06.html",
  "./prom/ut07-ejercicios.html",
  "./prom/ut07-teoria.html",
  "./prom/ut07.html",
  "./prom/ut08-ejercicios.html",
  "./prom/ut08-teoria.html",
  "./prom/ut08.html",
  "./prom/ut09-ejercicios.html",
  "./prom/ut09-teoria.html",
  "./prom/ut09.html",
  "./prom/ut10-ejercicios.html",
  "./prom/ut10-teoria.html",
  "./prom/ut10.html",
  "./sw.js"
];
const CACHEABLE_DESTINATIONS = new Set(["document", "style", "script", "image", "font"]);

function shouldSkip(request) {
  const url = new URL(request.url);
  return url.pathname.includes("/assets/downloads/")
    || url.pathname.endsWith(".zip")
    || url.pathname.includes("/projects/")
    || url.pathname.includes("/questions/");
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET" || shouldSkip(request)) {
    return;
  }

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const cacheable = sameOrigin || CACHEABLE_DESTINATIONS.has(request.destination);

  if (!cacheable) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => (
      fetch(request)
        .then((response) => {
          if (response && (response.ok || response.type === "opaque")) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cache.match(request)
          .then((cachedResponse) => cachedResponse || cache.match("./index.html")))
    ))
  );
});
