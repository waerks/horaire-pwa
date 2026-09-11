const CACHE = "horaire-ifapme-v1";
const APP_SHELL = ["/", "/manifest.webmanifest", "/icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("/"))));
});
self.addEventListener("message", event => {
  if (event.data?.type === "SHOW_REMINDER") {
    self.registration.showNotification(event.data.title, { body:event.data.body, icon:"/icon.svg", tag:event.data.tag });
  }
});
