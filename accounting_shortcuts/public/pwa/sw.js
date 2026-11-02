/**
 * Accounting Shortcuts Service Worker (PWA Desktop Edition)
 */

const CACHE_NAME = 'accounting-shortcuts-pwa-v1';
const PRECACHE_ASSETS = [
  '/assets/accounting_shortcuts/pwa/manifest.json',
  '/assets/accounting_shortcuts/pwa/icon.svg',
  '/assets/accounting_shortcuts/pwa/icon-192.png',
  '/assets/accounting_shortcuts/pwa/icon-512.png',
  '/assets/accounting_shortcuts/css/accounting_shortcuts.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api') || url.pathname.includes('cmd=')) return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
