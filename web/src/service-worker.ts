const VERSION = 'v1';
declare const self: ServiceWorkerGlobalScope;


self.addEventListener('install', evt => {
    self.skipWaiting();
    evt.waitUntil((async () => {
        const cache = await caches.open(VERSION);
        await cache.add('/pwa/offline.min.html');
    })());
});


self.addEventListener('activate', evt => {
    self.clients.claim();
    evt.waitUntil((async () => {
        await Promise.all((await caches.keys()).map(key => {
            if (!key.includes(VERSION))
                return caches.delete(key);
        }));
    })());
});


self.addEventListener('fetch', evt => {
    if (evt.request.mode === 'navigate')
        evt.respondWith((async () => {
            try {
                return (await evt.preloadResponse) || (await fetch(evt.request));
            } catch {
                const cache = await caches.open(VERSION);
                return await cache.match('/pwa/offline.min.html');
            }
        })());
});


export {};
