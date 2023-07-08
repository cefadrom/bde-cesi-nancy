import type { Contact } from '@bde-cesi-nancy/types';
import { defineEndpoint } from '@directus/extensions-sdk';
import { Accountability } from '@directus/types';
import { contactFormSchema } from './utils/contact-form-schema';

export default defineEndpoint({
    id: 'contact',
    handler(router, context) {
        router.post('/', async (req, res) => {
            const { error, value } = contactFormSchema.validate(req.body);

            if (error)
                return res.status(400).json({
                    error: error.message,
                });

            const accountability = (req as any).accountability as Accountability | null;

            const previousContactsCountRaw = await context
                .database<Contact>('contact')
                .count()
                .where(builder => {
                    builder.where('ip', accountability?.ip ?? 'x-no-ip')
                        .orWhere('email', value.email)
                        .orWhere('user_created', accountability?.user || 'x-no-user');
                })
                .andWhere('date_created', '>', new Date(Date.now() - 24 * 60 * 60 * 1000));

            const previousContactCount = previousContactsCountRaw[0]?.['count(*)'];
            if (typeof previousContactCount !== 'number' || previousContactCount >= 3)
                return res.status(429).json({
                    error: 'Vous avez atteint le nombre maximum de demandes de contact. Réessayez demain.',
                });

            const contactService = new context.services.ItemsService(
                'contact',
                { schema: (req as any).schema },
            );

            const newContactID: string = await contactService.createOne({
                name: `${value.lastName} ${value.firstName}`,
                email: value.email,
                ip: accountability?.ip,
                category: value.category,
                subject: value.subject,
                message: value.message,
            });

            // Directus doesn't allow to set the user_created field, so we have to do it manually
            await context.database<Contact>('contact')
                .update({ user_created: accountability?.user || undefined })
                .where({ id: newContactID });

            return res.sendStatus(201);
        });
    },
});
