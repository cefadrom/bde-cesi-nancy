import type { Notification } from '@bde-cesi-nancy/types';
import { defineHook } from '@directus/extensions-sdk';
import webpush from 'web-push';


interface PushSubscription {
    endpoint: string;
    auth: string;
    p256dh: string;
    user_id: string;
    user_email: string;
    subscription_id: string;
}


export default defineHook(({ action }, { database, env }) => {
    action('notifications.items.create', async ({ payload, key }) => {
        const notification = payload as Notification;
        const pushes: PushSubscription[] = await database('push_subscriptions')
            .select(
                'endpoint',
                'auth',
                'p256dh',
                'directus_users.id as user_id',
                'directus_users.email as user_email',
                'push_subscriptions.id as subscription_id',
            )
            .leftJoin('directus_users', 'directus_users.id', 'push_subscriptions.user_created')
            .where(database.raw(`JSON_CONTAINS(subscriptions, '"${notification.category}"')`));

        let notificationPayload: NotificationOptions = {
            body: notification.body,
            data: {
                title: notification.title,
                category: notification.category,
                link: notification.link,
            },
            icon: '/pwa/android-chrome-512x512.png',
            image: notification.image && `${env.PUBLIC_URL}/assets/${notification.image}`,
            badge: '/brand/simple.svg',
            lang: 'fr',
        };

        let sentNotifications = 0, failedNotifications = 0, logs = '';

        for (const push of pushes) {
            try {
                await webpush.sendNotification(
                    {
                        endpoint: push.endpoint,
                        keys: {
                            auth: push.auth,
                            p256dh: push.p256dh,
                        },
                    },
                    JSON.stringify(notificationPayload),
                    {
                        vapidDetails: {
                            subject: env.VAPID_SUBJECT!,
                            publicKey: env.PUBLIC_VAPID_KEY!,
                            privateKey: env.PRIVATE_VAPID_KEY!,
                        },
                        timeout: 2000,
                        TTL: 86400,
                    },
                );
                sentNotifications++;
                logs += `[SENT] ${push.user_email} (sub ${push.subscription_id})\n\n`;
            } catch (e) {
                await database('push_subscriptions')
                    .delete()
                    .where('id', push.subscription_id);
                failedNotifications++;
                logs += `[FAIL] ${push.user_email} (sub ${push.subscription_id})\n${e instanceof Error ? e.message : e}\n\n`;
            }
        }

        await database<Notification>('notifications')
            .update({
                sent_notifications: sentNotifications,
                failed_notifications: failedNotifications,
                logs,
                sent: true,
            })
            .where('id', key);
    });
});
