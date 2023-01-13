import type { PushSubscription, User } from '@bde-cesi-nancy/types';
import { Accountability } from '@directus/shared/src/types/accountability';
import type { EndpointConfig } from '@types';
import { Knex } from 'knex';
import { v4 as uuid } from 'uuid';
import webpush from 'web-push';
import { PushPayloadSchema } from './push-payload-schema';
import { IValidSubscriptions, PushSettingsSchema } from './push-settings-schema';


const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';
const BUREAU_ROLE_ID = '87ab5db5-589a-4834-8233-6cd3ca79aae6';

function doSubscriptionInclude(subscription: IValidSubscriptions, include: IValidSubscriptions) {
    return include.some((i) => subscription.includes(i));
}

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);


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
            const subscriptions = await context.database<PushSubscription>('push_subscriptions')
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
            const existingSubscription = await context.database<PushSubscription>('push_subscriptions')
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
                    await context.database<PushSubscription>('push_subscriptions')
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

            await context.database<PushSubscription>('push_subscriptions').insert({
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


        router.patch('/settings', async (req, res) => {
            const { user, role, admin } = (req.accountability as Accountability);

            if (!user)
                return res.status(401).json({
                    errors: [
                        { message: 'You must be logged in.' },
                    ],
                });

            const { error, value } = PushSettingsSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    errors: [
                        { message: error.message },
                    ],
                });
            }

            const subscriptions: IValidSubscriptions = value.subscriptions;

            // Check if the subscriptions respect the user's role
            // - contact is reserved for communication, bureau and admin
            // - unauthorized-login and helloasso-log is reserved for bureau and admin
            if (subscriptions &&
                ((doSubscriptionInclude(subscriptions, [ 'contact' ]) && !admin && role !== COMMUNICATION_ROLE_ID && role !== BUREAU_ROLE_ID)
                    || (doSubscriptionInclude(subscriptions, [ 'unauthorized-login', 'helloasso-log' ]) && !admin && role !== BUREAU_ROLE_ID)))
                return res.status(403).json({
                    errors: [
                        { message: 'You don\'t have the permission to subscribe to this.' },
                    ],
                });

            await context.database<User>('directus_users')
                // @ts-ignore too boring to make typescript happy
                .update({ subscriptions: json(context.database, subscriptions) })
                .where({ id: req.accountability.user });

            res.sendStatus(200);
            return;
        });
    },
} as EndpointConfig;
