import type { Notification } from '@bde-cesi-nancy/types';
import type { EndpointConfig } from '@types';
import { v4 as uuid } from 'uuid';
import webpush from 'web-push';
import { PushPayloadSchema } from './push-payload-schema';

export default {
    id: 'push',
    handler(router, context) {
        router.post('/subscribe', async (req, res) => {
            if (!req.accountability?.user)
                return res.status(401).json({
                    errors: [
                        { message: 'You must be logged in.' },
                    ],
                });

            const pushSubscription = PushPayloadSchema.validate(req.body);
            if (pushSubscription.error) {
                return res.status(400).json({
                    errors: [
                        { message: pushSubscription.error.message },
                    ],
                });
            }

            const { endpoint, keys } = pushSubscription.value;

            // Check if the user has more than 10 subscriptions
            const subscriptions = await context.database<Notification>('notifications')
                .select('id')
                .where({ user_created: req.accountability.user });
            if (subscriptions.length >= 10) {
                return res.status(400).json({
                    errors: [
                        { message: 'You can\'t have more than 10 browsers with notifications enabled.' },
                    ],
                });
            }

            // Check if the subscription already exists
            const existingSubscription = await context.database<Notification>('notifications')
                .select('id')
                .where({ user_created: req.accountability.user, endpoint });

            try {
                await webpush.sendNotification(
                    pushSubscription.value,
                    'ping',
                    {
                        vapidDetails: {
                            subject: context.env.VAPID_SUBJECT!,
                            publicKey: context.env.PUBLIC_VAPID_KEY!,
                            privateKey: context.env.PRIVATE_VAPID_KEY!,
                        },
                        timeout: 2000,
                        TTL: 60,
                    },
                );
            } catch (e) {
                // Delete the existing subscription if it exists
                if (existingSubscription.length > 0)
                    await context.database<Notification>('notifications')
                        .where({ id: existingSubscription[0]!.id })
                        .delete();

                // Return the error
                return res.status(400).json({
                    errors: [
                        { message: 'The subscription is invalid.' },
                    ],
                });
            }

            // If the subscription already exists, don't create it again
            if (existingSubscription.length > 0) {
                res.sendStatus(200);
                return;
            }

            await context.database<Notification>('notifications').insert({
                id: uuid(),
                user_created: req.accountability.user,
                date_created: new Date(),
                endpoint,
                auth: keys.auth,
                p256dh: keys.p256dh,
            });

            res.sendStatus(201);
            return;
        });
    },
} as EndpointConfig;
