// Service Worker for WorksOffline.in
// Strategy: Network First with Cache Fallback
// This ensures users always get the latest content when online

const CACHE_NAME = 'worksoffline-v2';
const STATIC_CACHE = 'worksoffline-static-v2';

// Static assets that rarely change - can be cached longer
const staticAssets = [
  '/manifest.json',
];

// Install event - cache only essential static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing new service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(staticAssets);
      })
  );
  // Force the waiting service worker to become active
  self.skipWaiting();
});

// Activate event - clean up ALL old caches immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete any cache that doesn't match current version
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - Network First strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(networkFirstWithCache(request));
});

// Network First strategy - always try network, fallback to cache
async function networkFirstWithCache(request) {
  try {
    // Try to fetch from network first
    const networkResponse = await fetch(request);
    
    // If successful, update the cache and return the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      // Clone the response before caching (response can only be used once)
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try to get from cache
    console.log('[SW] Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    // If it's a navigation request (HTML page), return a fallback
    if (request.mode === 'navigate') {
      const cache = await caches.open(CACHE_NAME);
      const fallback = await cache.match('/');
      if (fallback) {
        return fallback;
      }
    }
    
    // Nothing in cache, return error
    throw error;
  }
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting triggered by client');
    self.skipWaiting();
  }
});

