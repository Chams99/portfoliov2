// Chamsado Messenger Service Worker
// Following 2025 PWA Best Practices

const CACHE_VERSION = 'chamsado-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const MAX_DYNAMIC_CACHE_SIZE = 50;

// Resources to cache immediately on install
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './images/logo.png',
    './images/loginpage.png',
    './images/lightmode.png',
    './images/darkmode.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Utility function to limit cache size
const limitCacheSize = async (cacheName, maxSize) => {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxSize) {
        await cache.delete(keys[0]);
        await limitCacheSize(cacheName, maxSize);
    }
};

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch(err => console.error('[SW] Cache failed:', err))
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys
                        .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
                        .map(key => {
                            console.log('[SW] Removing old cache:', key);
                            return caches.delete(key);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch Event - Network first, fallback to cache strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests for CDN resources (let browser handle them)
    if (url.origin !== location.origin) {
        // For CDN resources like Font Awesome, use cache-first strategy
        if (request.url.includes('cdnjs.cloudflare.com')) {
            event.respondWith(
                caches.match(request)
                    .then(cachedResponse => cachedResponse || fetch(request))
            );
        }
        return;
    }

    // For same-origin requests, use network-first strategy with cache fallback
    event.respondWith(
        fetch(request)
            .then(async (networkResponse) => {
                // Clone the response before caching
                const responseClone = networkResponse.clone();
                
                // Cache successful responses
                if (networkResponse.ok) {
                    const cache = await caches.open(DYNAMIC_CACHE);
                    await cache.put(request, responseClone);
                    await limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
                }
                
                return networkResponse;
            })
            .catch(async () => {
                // Network failed, try cache
                const cachedResponse = await caches.match(request);
                
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // If HTML page requested and not in cache, return offline page or error
                if (request.headers.get('accept').includes('text/html')) {
                    const cache = await caches.open(STATIC_CACHE);
                    return cache.match('./index.html');
                }
                
                // For other resources, return a basic error response
                return new Response('Network error occurred', {
                    status: 408,
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
    );
});

// Background sync for offline actions (if supported)
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);
    if (event.tag === 'sync-messages') {
        event.waitUntil(
            // Handle message syncing when back online
            Promise.resolve()
        );
    }
});

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
    console.log('[SW] Push notification received:', event);
    const data = event.data ? event.data.json() : {};
    
    const options = {
        body: data.body || 'New message received',
        icon: './images/logo.png',
        badge: './images/logo.png',
        vibrate: [200, 100, 200],
        data: data
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'Chamsado Messenger', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || './')
    );
});

console.log('[SW] Service Worker loaded successfully');

