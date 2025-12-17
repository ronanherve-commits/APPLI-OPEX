const CACHE_NAME = 'guide-installateur-v7';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './pages/module1.html',
  './pages/module2.html',
  './images/icon-192.jpg',
  './images/icon-512.jpg'
];

// Installer le service worker et mettre en cache les fichiers
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activer le service worker et supprimer les anciens caches
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepter les requêtes et retourner depuis le cache si disponible
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      if (resp) return resp;
      return fetch(evt.request).catch(() => {
        // Si hors ligne et navigation, retourner index.html
        if (evt.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
