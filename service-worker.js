const CACHE_NAME = 'guide-installateur-v9';
const FILES_TO_CACHE = [
  '/APPLI-OPEX/',
  '/APPLI-OPEX/index.html',
  '/APPLI-OPEX/css/style.css',
  '/APPLI-OPEX/js/app.js',
  '/APPLI-OPEX/pages/module1.html',
  '/APPLI-OPEX/pages/module2.html',
  '/APPLI-OPEX/images/icon-192.jpg',
  '/APPLI-OPEX/images/icon-512.jpg'
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.map(key => { if(key !== CACHE_NAME) return caches.delete(key); }))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      if(resp) return resp;
      return fetch(evt.request).catch(() => {
        if(evt.request.mode === 'navigate') return caches.match('/APPLI-OPEX/index.html');
      });
    })
  );
});
