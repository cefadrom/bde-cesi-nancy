const VERSION = 'v1';
declare const self: ServiceWorkerGlobalScope;

// Cannot use env variables in service worker
const PUBLIC_WEB_URL = 'https://bdecesinancy.fr';


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


interface NotificationPayloadData {
    title: string;
    category: string;
}

self.addEventListener('push', evt => {
    if (evt.data?.text() === 'ping')
        return;

    const payload: NotificationOptions = evt.data?.json() || {};
    const { title } = payload.data as NotificationPayloadData;

    evt.waitUntil(
        self.registration.showNotification(title, payload),
    );
});


self.addEventListener('notificationclick', evt => {
    evt.notification.close();
    evt.waitUntil(openLink(evt.notification.data.link));
});


/**
 * Open the specified path. If a page with the domain is already open, we change its URL and focus it.
 * Otherwise, we open a new page.
 * @param link { string } The link to open. If it's invalid, we open the root of the domain.
 */
async function openLink(link?: string | undefined) {
    const url = new URL(link || '', PUBLIC_WEB_URL);
    const clients = await self.clients.matchAll({ type: 'window' });

    for (const client of clients) {
        if (client.url.startsWith(url.origin) && 'navigate' in client) {
            // An existing page with the domain is open, we change its URL and focus it
            const newClient = await client.navigate(url);
            return newClient?.focus();
        }
    }

    // No page with the domain is open, we open a new page
    await self.clients.openWindow(url);
}


export {};
