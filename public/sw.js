// Simple Service Worker for Development
const CACHE_NAME = 'speakeasy-dev-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - simple passthrough for development
self.addEventListener('fetch', (event) => {
  // Just pass through all requests without caching for development
  event.respondWith(fetch(event.request));
});

console.log('Service Worker: Loaded (Development Mode)');