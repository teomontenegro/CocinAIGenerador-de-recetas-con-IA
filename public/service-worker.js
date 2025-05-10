self.addEventListener("install", e => {
  console.log("Service Worker instalado");
  e.waitUntil(
    caches.open("cocinai-cache").then(cache => {
      return cache.addAll(["/index.html", "/style.css", "/script.js", "/logo.png"]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});