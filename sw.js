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
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(response => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;}
            var responseToCache = response.clone();

            caches.open(cacheName
            )
              .then(cache => {
                cache.put(event.request, responseToCache);
          });
        return response
      }
  )
})
  )
})
