// public/service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installed!');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated!');
});

self.addEventListener('fetch', (event) => {
    // console.log('SW fetching:', event.request.url);
});
