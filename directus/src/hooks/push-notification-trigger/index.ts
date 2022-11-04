import type {
    Club,
    Contact,
    Event,
    HelloassoLog,
    Membership,
    Notification,
    UnauthorizedLogin,
} from '@bde-cesi-nancy/types';
import type { HookConfig } from '@types';


interface CreateMeta<P> {
    payload: Omit<P, 'id'>;
    key: string;
}


interface UpdateMeta<P> {
    payload: Partial<P>;
    keys: string[];
}


export default (({ action }, { services, database, env }) => {

    // ---------- CLUBS ----------

    action('clubs.items.create', async (meta, { schema }) => {
        const { payload, key } = meta as CreateMeta<Club>;
        if (payload.visible)
            await announceClub(payload, key, schema);
    });

    action('clubs.items.update', async (meta, { schema }) => {
        const { payload, keys } = meta as UpdateMeta<Club>;

        if (!payload.visible)
            return;

        for (const key of keys) {
            // Test if the club has already been announced
            const notification = await database<Notification>('notifications')
                .where({ collection: 'clubs', item: key })
                .select('id');

            // If not, announce it
            if (notification.length === 0)
                await announceClub(null, key, schema);
        }
    });

    async function announceClub(club: Omit<Club, 'id'> | null, key: string, schema: any) {

        if (!club)
            club = await database('clubs')
                .select('*')
                .where({ id: key })
                .first() as Club;

        const notificationService = new services.ItemsService('notifications', { schema });
        return notificationService.createOne({
            title: `Nouveau club : ${club.name} !`,
            body: club.description,
            category: 'club',
            link: '/clubs#clubs',
            image: club.thumbnail,
            collection: 'clubs',
            item: key,
        } as Notification);
    }


    // ---------- EVENTS ----------

    action('events.items.create', async (meta, { schema }) => {
        const { payload, key } = meta as CreateMeta<Event>;
        if (payload.visible)
            await announceEvent(payload, key, schema);
    });

    action('events.items.update', async (meta, { schema }) => {
        const { payload, keys } = meta as UpdateMeta<Event>;

        if (!payload.visible)
            return;

        for (const key of keys) {
            // Test if the event has already been announced
            const notification = await database<Notification>('notifications')
                .where({ collection: 'events', item: key })
                .select('id');

            // If not, announce it
            if (notification.length === 0)
                await announceEvent(null, key, schema);
        }
    });

    async function announceEvent(event: Omit<Event, 'id'> | null, key: string, schema: any) {
        if (!event)
            event = await database('events')
                .select('*')
                .where({ id: key })
                .first() as Event;

        const notificationService = new services.ItemsService('notifications', { schema });
        return notificationService.createOne({
            title: `${event.name} le ${formatDate(event.date_start)} !`,
            body: event.description,
            category: 'event',
            link: '/events',
            image: event.poster,
            collection: 'events',
            item: key,
        } as Notification);
    }


    // ---------- CONTACT ----------

    action('contact.items.create', async (meta, { schema }) => {
        const { payload, key } = meta as CreateMeta<Contact>;

        const notificationService = new services.ItemsService('notifications', { schema });
        return notificationService.createOne({
            title: payload.subject,
            body: payload.message,
            category: 'contact',
            link: `${env.PUBLIC_URL}/admin/content/contact/${key}`,
            collection: 'contact',
            item: key,
        });
    });


    // ---------- UNAUTHORIZED_LOGINS ----------

    action('unauthorized_logins.items.create', async (meta, { schema }) => {
        const { payload, key } = meta as CreateMeta<UnauthorizedLogin>;

        const notificationService = new services.ItemsService('notifications', { schema });
        return notificationService.createOne({
            title: 'Connexion refusée',
            body: `Tentative de ${payload.name} depuis ${payload.email}`,
            category: 'unauthorized-login',
            link: `${env.PUBLIC_URL}/admin/content/unauthorized_login/${key}`,
            collection: 'unauthorized_logins',
            item: key,
        });
    });


    // ---------- HELLOASSO LOGS ----------

    action('helloasso_logs.items.create', async (meta, { schema }) => {
        const { payload, key } = meta as CreateMeta<HelloassoLog>;

        let membership: Pick<Membership, 'adherent_name' | 'order_form' | 'order_amount'> | undefined;
        if (payload.result_membership)
            membership = await database<Membership>('memberships')
                .select('adherent_name', 'order_form', 'order_amount')
                .where({ id: payload.result_membership })
                .first();

        const notificationService = new services.ItemsService('notifications', { schema });
        return notificationService.createOne({
            title: `${formatEventType(payload.event_type)} HelloAsso`,
            body: payload.reject_reason || !membership
                ? `Erreur : ${payload.reject_reason}`
                : `${membership.order_form === 'adhesion-bde' ? 'Adhésion' : 'Cotisation'} de ${membership.adherent_name} pour ${membership.order_amount}€`,
            category: 'helloasso-log',
            link: `${env.PUBLIC_URL}/admin/content/helloasso_logs/${key}`,
            collection: 'helloasso_logs',
            item: key,
        });
    });

}) as HookConfig;


const formatDate = (date: Date) => date.toLocaleDateString(
    'fr',
    {
        day: 'numeric',
        month: 'long',
        // Display year if it's not the current year
        year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
    },
);

function formatEventType(type: HelloassoLog['event_type']) {
    switch (type) {
        case 'Order':
            return 'Nouvelle commande';
        case 'Payment':
            return 'Nouveau paiement';
        case 'Form':
            return 'Nouveau formulaire';
    }
}
