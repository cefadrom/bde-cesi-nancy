import type { EndpointConfig } from '@types';
import type { HelloAssoMembershipItem, HelloassoOrderCallback, TokenStore } from './helloasso';
import type { Membership, User } from '@bde-cesi-nancy/types';
import nodeFetch from 'node-fetch';
import { helloAssoAuth } from './helloAssoAuth';
import { v4 as uuid } from 'uuid';
import { EventEmitter } from 'node:events';
import { helloAssoLog } from './helloAssoLog';

const HELLO_ASSO_ENDPOINT = 'https://api.helloasso.com';
let helloAssoTokens = {} as TokenStore;

interface MembershipEmitterPayload {
    userID: string,
}

export default {
    id: 'helloasso',
    handler(router, context) {

        const HELLO_ASSO_CLIENT: string = context.env.HELLO_ASSO_CLIENT;
        const HELLO_ASSO_SECRET: string = context.env.HELLO_ASSO_SECRET;
        const HELLO_ASSO_ORGANIZATION: string = context.env.HELLO_ASSO_ORGANIZATION;
        const allowedForms: string | string[] = context.env.HELLO_ASSO_ALLOWED_MEMBERSHIPS_FORMS;
        const HELLO_ASSO_ALLOWED_MEMBERSHIPS_FORMS: string[] = Array.isArray(allowedForms) ? allowedForms : [ allowedForms ];

        const { ItemsService } = context.services;

        // Directus won't stop the interval inside this function on extension reloading, so if you're working on this
        // extension, it's highly recommended to restart the container every 20 minutes to clear the timers and avoid
        // many token refreshes in the background
        helloAssoAuth(
            HELLO_ASSO_CLIENT,
            HELLO_ASSO_SECRET,
            HELLO_ASSO_ENDPOINT,
            key => (helloAssoTokens.access = key),
        );

        const eventEmitter = new EventEmitter();

        router.post('/', async (req, res) => {

            // Validate the request and verify membership information

            const order = req.body as HelloassoOrderCallback;

            const callbackMembership = order?.data?.items?.find(i => i?.type === 'Membership');

            if (!order
                || ![ 'Order', 'Payment' ].includes(order.eventType)
                || !callbackMembership?.id
                || ![ 'Processed', 'Registered' ].includes(callbackMembership.state)) {
                await helloAssoLog(context.database, order, false, 'Invalid order');
                return res.sendStatus(204);
            }

            let membershipDetails: HelloAssoMembershipItem;
            try {
                const membershipDetailsRes = await nodeFetch(`${HELLO_ASSO_ENDPOINT}/v5/items/${callbackMembership.id}?withDetails=true`, {
                    headers: {
                        'Authorization': `Bearer ${helloAssoTokens.access}`,
                    },
                });
                if (!membershipDetailsRes.ok)
                    throw new Error(`HelloAsso API returned ${membershipDetailsRes.status} ${membershipDetailsRes.statusText}`);
                membershipDetails = await membershipDetailsRes.json() as HelloAssoMembershipItem;
            } catch (e) {
                await helloAssoLog(context.database,
                    order,
                    false,
                    `Failed to fetch membership details: ${(e as Error).message}`,
                );
                return res.sendStatus(204);
            }

            if (!HELLO_ASSO_ALLOWED_MEMBERSHIPS_FORMS.includes(membershipDetails.order.formSlug)
                || membershipDetails.order.organizationSlug.replace(/ /g, '-') !== HELLO_ASSO_ORGANIZATION) {
                await helloAssoLog(context.database, order, false, 'Invalid membership form or organization');
                return res.sendStatus(204);
            }

            // Membership verified, store in the database and update the corresponding user

            const order_id = membershipDetails.order.id.toString();
            const membership_id = membershipDetails.id.toString();

            const duplicatedMemberships = await context.database<Membership>('memberships')
                .where({ order_id })
                .orWhere({ membership_id })
                .select('id', 'order_id');

            if (duplicatedMemberships.length > 0) {
                await helloAssoLog(context.database,
                    order,
                    false,
                    `Duplicate membership (${duplicatedMemberships.map(m => m.order_id).join(', ')})`,
                );
                return res.sendStatus(204);
            }

            const membershipDbID = uuid();
            const adherentMail = membershipDetails.customFields.find(f => f.name.toLowerCase().includes('mail'))?.answer;

            await context.database<Membership>('memberships').insert({
                id: membershipDbID,
                order_id,
                membership_id,
                order_date: new Date(membershipDetails.order.date),
                order_form: membershipDetails.order.formSlug as 'adhesion-bde' | 'cotisation-bde',
                order_amount: membershipDetails.amount / 100,
                order_initial_amount: membershipDetails.initialAmount / 100,
                adherent_name: `${membershipDetails.user.firstName} ${membershipDetails.user.lastName}`,
                adherent_email: adherentMail,
                payer_name: `${membershipDetails.payer.firstName} ${membershipDetails.payer.lastName}`,
                payer_email: membershipDetails.payer.email,
            });

            const membershipUser = await context
                .database<User>('directus_users')
                .select([ 'id', 'email' ])
                .where({ email: membershipDetails.payer.email })
                .orWhere({ email: adherentMail });

            if (membershipUser.length === 0) {
                await helloAssoLog(context.database, order, true, 'No user found', membershipDbID);
                return res.sendStatus(204);
            }

            if (membershipUser.length > 1) {
                await helloAssoLog(
                    context.database,
                    order,
                    true,
                    `Multiple users found (${membershipUser.map(u => u.email).join(', ')})`,
                    membershipDbID,
                );
                return res.sendStatus(204);
            }

            const membershipUserID = membershipUser[0]!.id;

            const userService = new ItemsService('directus_users', { schema: (req as any).schema });
            await userService.updateOne(
                membershipUserID,
                {
                    membership: membershipDbID,
                    membership_status: membershipDetails.order.formName.toLowerCase().includes('cotis')
                        ? 'cotisant'
                        : 'adherent',
                },
            );

            eventEmitter.emit('membership', { userID: membershipUserID } as MembershipEmitterPayload);

            await helloAssoLog(context.database, order, true, null, membershipDbID);
            return res.sendStatus(204);
        });


        // Server Sent Event to notify the frontend of a new membership
        router.get('/hook/:userID', async (req, res) => {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
            });

            const userID = req.params.userID;

            function sendConfirmation({ userID: eventUserID }: MembershipEmitterPayload) {
                if (eventUserID === userID)
                    res.write('data: ok\n\n');
            }

            eventEmitter.on('membership', sendConfirmation);

            res.on('close', () => {
                eventEmitter.off('membership', sendConfirmation);
            });
        });
    },
} as EndpointConfig;
