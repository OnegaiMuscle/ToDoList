const cacheName = "ToDoList"
const contentToCache = [
  "/",
	"/index.html",
	"/style.css",
	"/app.js",
	"/sw.js",
]

self.addEventListener("install", (e) => {
	console.log("Service Worker installed");
	e.waitUntil(
    caches.open(cacheName)
			.then(cache =>{return cache.addAll(contentToCache);
		})
	)
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  )
})
