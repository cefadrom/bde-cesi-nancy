import { defineEndpoint } from '@directus/extensions-sdk';
import { EventEmitter } from 'node:events';
import { extractMembershipFromNotification } from './utils/extractMembershipFromNotification';
import { fetchMembershipDetails } from './utils/fetchMembershipDetails';
import { helloAssoAuth } from './utils/helloAssoAuth';
import type { Notification, TokenStore } from './utils/helloAssoDefinitions';
import { helloAssoLog } from './utils/helloAssoLog';
import { saveMembership } from './utils/saveMembership';
import { updateUser } from './utils/updateUser';
import { verifyOrganizationAndForm } from './utils/verifyOrganizationAndForm';

const HELLO_ASSO_ENDPOINT = 'https://api.helloasso.com';
let helloAssoTokens = {} as TokenStore;

interface MembershipEmitterPayload {
    userID: string,
}

export default defineEndpoint({
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

            const order = req.body as Notification;
            const logService = new ItemsService('helloasso_logs', { schema: (req as any).schema });

            // Verify that the notification is for a new membership
            const {
                success: extractFromNotificationSuccess,
                error: extractFromNotificationError,
                membership: notificationMembership,
                paymentID,
            } = extractMembershipFromNotification(order);

            if (!extractFromNotificationSuccess || !notificationMembership) {
                await helloAssoLog(logService, order, false, extractFromNotificationError);
                return res.sendStatus(204);
            }

            // Get fresh data about the membership from HelloAsso API
            const {
                success: fetchMembershipSuccess,
                error: fetchMembershipError,
                membership,
                payment,
            } = await fetchMembershipDetails(notificationMembership, paymentID, helloAssoTokens, HELLO_ASSO_ENDPOINT);

            if (!fetchMembershipSuccess || !membership) {
                await helloAssoLog(logService, order, false, fetchMembershipError);
                return res.sendStatus(204);
            }

            // Verify that the membership is for the right organization and form
            const {
                success: verifyOrganizationAndFormSuccess,
                error: verifyOrganizationAndFormError,
            } = verifyOrganizationAndForm(membership, HELLO_ASSO_ALLOWED_MEMBERSHIPS_FORMS, HELLO_ASSO_ORGANIZATION);

            if (!verifyOrganizationAndFormSuccess) {
                await helloAssoLog(logService, order, false, verifyOrganizationAndFormError);
                return res.sendStatus(204);
            }

            // Membership verified, store in the database and update the corresponding user
            const {
                success: saveMembershipSuccess,
                error: saveMembershipError,
                dbMembership,
                membershipUser,
            } = await saveMembership(context.database, membership, payment);

            if (!saveMembershipSuccess || !dbMembership) {
                await helloAssoLog(logService, order, false, saveMembershipError);
                return res.sendStatus(204);
            }

            // If no user is found, still call it a success but show an error
            if (!membershipUser) {
                await helloAssoLog(logService, order, true, 'No user found', dbMembership.id);
                return res.sendStatus(204);
            }

            const userService = new ItemsService('directus_users', { schema: (req as any).schema });
            const { userUpgraded } = await updateUser(userService, membershipUser, dbMembership);

            if (userUpgraded)
                eventEmitter.emit('membership', { userID: membershipUser.id } as MembershipEmitterPayload);

            await helloAssoLog(logService, order, true, null, dbMembership.id);
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
});
