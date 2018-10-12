'use strict';

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
}, false);

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
}, false);

self.addEventListener('push', event => {
    if (!event.data) {
        return;
    }

    const parsedData = event.data.json();

    const { notification, data } = parsedData;
    const { title, body, icon } = notification;

    event.waitUntil(self.registration.showNotification(title, { body, icon, data }));
}, false);

self.addEventListener('notificationclick', event => {
    // ServiceWorkerRegistration#showNotificationで指定されたURLへ遷移する
    event.waitUntil(self.clients.openWindow(event.notification.data.url));
}, false);
