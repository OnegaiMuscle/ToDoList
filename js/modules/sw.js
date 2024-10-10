const cacheName = 'ToDoList';
const filesToCache = [
  './',
  './index.html',
  './style.css',
  './favicon.svg',
  './js/app.js',
  './js/modules/sw.js',
  './js/modules/domWrapper.js',
  './js/modules/localStorageWrapper.js',
  './js/modules/taskHelper.js',
  './js/modules/sortHelper.js',
];

const addContentToCache = async (content) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(content);
};

self.addEventListener('install', (e) => {
  e.waitUntil(addContentToCache(filesToCache));
});

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  };
  const responseFromNetwork = await fetch(request);
  if (!responseFromNetwork.ok || responseFromNetwork.type !== 'basic') {
    return responseFromNetwork;
  };
  const responseToCache = responseFromNetwork.clone();
  const cache = await caches.open(cacheName);
  await cache.put(request, responseToCache);
  return responseFromNetwork;
};

self.addEventListener('fetch', (e) => {
  e.respondWith(cacheFirst(e.request));
});
