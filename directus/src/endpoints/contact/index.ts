import type { Contact } from '@bde-cesi-nancy/types';
import type { EndpointConfig } from '@types';
import { v4 as uuid } from 'uuid';
import { contactFormSchema } from './utils/contact-form-schema';

export default {
    id: 'contact',
    handler(router, context) {
        router.post('/', async (req, res) => {
            const { error, value } = contactFormSchema.validate(req.body);

            if (error)
                return res.status(400).json({
                    error: error.message,
                });

            const ip = req.accountability.ip;

            const previousContactsCountRaw = await context
                .database<Contact>('contact')
                .count()
                .where(builder => {
                    builder.where('ip', ip)
                        .orWhere('email', value.email)
                        .orWhere('user_created', req.accountability.user || 'x-no-user');
                })
                .andWhere('date_created', '>', new Date(Date.now() - 24 * 60 * 60 * 1000));

            const previousContactCount = previousContactsCountRaw[0]?.['count(*)'];
            if (typeof previousContactCount !== 'number' || previousContactCount >= 3)
                return res.status(429).json({
                    error: 'Vous avez atteint le nombre maximum de demandes de contact. Réessayez demain.',
                });

            await context.database<Contact>('contact').insert({
                id: uuid(),
                date_created: new Date(),
                user_created: req.accountability.user || null,
                name: `${value.lastName} ${value.firstName}`,
                email: value.email,
                ip,
                category: value.category,
                subject: value.subject,
                message: value.message,
            });

            return res.sendStatus(201);
        });
    },
} as EndpointConfig;
