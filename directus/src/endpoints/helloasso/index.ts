import type { EndpointConfig } from '@types';
import type { HelloAssoMembershipItem, HelloassoOrderCallback, TokenStore } from './helloasso';
import type { Membership, User } from '@bde-cesi-nancy/types';
import nodeFetch from 'node-fetch';
import { helloAssoAuth } from './helloAssoAuth';
import { v4 as uuid } from 'uuid';

const HELLO_ASSO_ENDPOINT = 'https://api.helloasso.com';
let helloAssoTokens = {} as TokenStore;

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

        router.post('/', async (req, res) => {

            // Validate the request and verify membership information

            const order = req.body as HelloassoOrderCallback;

            context.logger.info(`HelloAsso: received order ${JSON.stringify(order)}`);

            if (!order
                || order.eventType !== 'Order'
                || order.data.items.length !== 1
                || order.data.items[0].type !== 'Membership'
                || ![ 'Processed', 'Registered' ].includes(order.data.items[0].state))
                return res.sendStatus(204);

            const membershipID = order.data.items[0].id;

            let membershipDetails: HelloAssoMembershipItem;
            try {
                const membershipDetailsRes = await nodeFetch(`${HELLO_ASSO_ENDPOINT}/v5/items/${membershipID}?withDetails=true`, {
                    headers: {
                        'Authorization': `Bearer ${helloAssoTokens.access}`,
                    },
                });
                if (!membershipDetailsRes.ok)
                    throw new Error(`HelloAsso API returned ${membershipDetailsRes.status} ${membershipDetailsRes.statusText}`);
                membershipDetails = await membershipDetailsRes.json() as HelloAssoMembershipItem;
            } catch (e) {
                context.logger.error(`HelloAsso: ${e}`);
                return res.sendStatus(204);
            }

            if (!HELLO_ASSO_ALLOWED_MEMBERSHIPS_FORMS.includes(membershipDetails.order.formSlug)
                || membershipDetails.order.organizationSlug.replace(/ /g, '-') !== HELLO_ASSO_ORGANIZATION)
                return res.sendStatus(204);

            // Membership verified, store in the database and update the corresponding user

            const order_id = membershipDetails.order.id.toString();
            const membership_id = membershipDetails.id.toString();

            const duplicatedMemberships = await context.database<Membership>('memberships')
                .where({ order_id })
                .orWhere({ membership_id })
                .select('id');

            if (duplicatedMemberships.length > 0) {
                context.logger.warn(`HelloAsso: ${duplicatedMemberships.length} duplicates of order ${order_id} with membership ${membership_id}`);
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
                order_amount: membershipDetails.amount,
                order_initial_amount: membershipDetails.initialAmount,
                adherent_name: `${membershipDetails.user.firstName} ${membershipDetails.user.lastName}`,
                adherent_email: adherentMail,
                payer_name: `${membershipDetails.payer.firstName} ${membershipDetails.payer.lastName}`,
                payer_email: membershipDetails.payer.email,
            });

            const membershipUser = await context
                .database<User>('directus_users')
                .select([ 'id' ])
                .where({ email: membershipDetails.payer.email })
                .orWhere({ email: adherentMail });

            if (membershipUser.length === 0) {
                context.logger.warn(`HelloAsso: no user found for order ${order_id} with membership ${membership_id}`);
                return res.sendStatus(204);
            }

            if (membershipUser.length > 1) {
                context.logger.warn(`HelloAsso: ${membershipUser.length} users found for order ${order_id} with membership ${membership_id}`);
                return res.sendStatus(204);
            }

            const userService = new ItemsService('directus_users', { schema: (req as any).schema });
            await userService.updateOne(
                membershipUser[0]!.id,
                {
                    membership: membershipDbID,
                    membership_status: membershipDetails.order.formName.includes('cotis') ? 'cotisant' : 'adherent',
                },
            );

            return res.sendStatus(204);
        });
    },
} as EndpointConfig;
