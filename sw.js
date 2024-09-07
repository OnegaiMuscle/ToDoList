const cacheName = "ToDoList";
const contentToCache = [
  "./",
	"./index.html",
	"./style.css",
	"./app.js",
	"./sw.js",
];

self.addEventListener('install', function(event) {
  // Effectuer l'installation et ouvrir le cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Ressource trouvée dans le cache
        if (response) {
          return response;
        }
        // Ressource non trouvée dans le cache, la récupérer du réseau
        return fetch(event.request);
      }
    )
  );
});
