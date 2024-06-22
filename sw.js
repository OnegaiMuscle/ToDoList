const cacheName = "ToDoList"
const contentToCache = [
  "/",
	"/index.html",
	"/style.css",
	"/app.js",
	"/sw.js",
]

self.addEventListener("install", (e) => {
	console.log("Service Worker installé");
	e.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName);
			await cache.addAll(contentToCache);
		})()
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(fetch(event.request).then((res) => {
		let response = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, response);
        });
		return res
	}).catch((err) => {
		return caches.match(event.request)
	})
	);
});

function fetchAndCachePage(url) {
  fetch(url)
      .then(response => response.text())
      .then(body => {
          // Créez une nouvelle réponse avec le corps modifié
          const newResponse = new Response(body, {
              headers: { 'Content-Type': 'text/html' }
          });
          caches.open(cacheName)
              .then(cache => {
                  cache.put(url, newResponse);
              });
      });
}

self.addEventListener('message', event => {
  if (event.data && event.data.action === 'update-page') {
      fetchAndCachePage(event.data.url);
  }
});


