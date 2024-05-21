const cacheName = "ToDoList"
const contentToCache = [
  "./",
	"./index.html",
	"./style.css",
	"./app.js",
	"./sw.js",
]

self.addEventListener("install", (e) => {
	console.log("Service Worker installed");
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
