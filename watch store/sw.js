const staticCacheName = 'site-static-v8';
const dynamicCacheName = 'site-dynamic-v8';
const assets = [
  '/',
  '/index.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/pages/view.html',
  '/pages/customer.html',
  '/js/app.js',
  '/js/materialize.min.js',
  '/js/ui.js',
  '/pages/about.html',
  '/pages/contact.html',
  '/watch.mp4',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/js/firebase.js',
];

self.addEventListener('install', evt => {
  console.log('SW Installed', evt);
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('Caching assets');
      cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  console.log('SW Activated', evt);
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt => {
  console.log('Fetching', evt.request.url);
  if (
    evt.request.url.indexOf('firestore.googleapis.com') === -1 &&
    evt.request.url.indexOf('firebase-firestore') === -1 &&
    evt.request.url.indexOf('firebase') === -1
  ) {
    evt.respondWith(
      caches.match(evt.request, { ignoreSearch: true }).then(cacheRes => {
        return (
          cacheRes ||
          fetch(evt.request)
            .then(fetchRes => {
              return caches.open(dynamicCacheName).then(cache => {
                cache.put(evt.request.url, fetchRes.clone());
                return fetchRes;
              });
            })
            .catch(() => {
              // Return custom offline page or default image
            })
        );
      })
    );
  }
});