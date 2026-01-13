const CACHE_NAME = 'guide-installateur-v999';
const FILES_TO_CACHE = [
  '/APPLI-OPEX/',
  '/APPLI-OPEX/index.html',
  '/APPLI-OPEX/css/style.css',
  '/APPLI-OPEX/js/app.js',
  '/APPLI-OPEX/pages/module1.html',
  '/APPLI-OPEX/pages/module2.html',
  '/APPLI-OPEX/images/icon-192.png',
  '/APPLI-OPEX/images/icon-512.png',
  '/APPLI-OPEX/images/fond-acceuil.jpg'
];

// Installation du service worker et mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

// Interception des requêtes : cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
