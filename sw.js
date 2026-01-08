// sw.js
const CACHE_NAME = 'guide-installateur-v999';

// Ici on met les chemins **relatifs à la racine du repo GitHub Pages**
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/pages/module1.html',
  '/pages/module2.html',
  '/images/icon-192.jpg',
  '/images/icon-512.jpg'
];

self.addEventListener('install', event => {
  console.log('Service Worker: Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activate');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        // Serve le fichier depuis le cache
        return response;
      }
      // Sinon, fetch normal
      return fetch(event.request);
    })
  );
});

