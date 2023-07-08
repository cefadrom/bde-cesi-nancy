import Joi from 'joi';

// Push subscription schema
export const PushPayloadSchema = Joi.object({
    endpoint: Joi
        .string()
        .uri()
        .trim()
        .min(10)
        .max(1023)
        .required(),
    expirationTime: Joi
        .number()
        .positive()
        .allow(null),
    keys: Joi
        .object({
            p256dh: Joi
                .string()
                .trim()
                .min(10)
                .max(255)
                .required(),
            auth: Joi
                .string()
                .trim()
                .min(10)
                .max(255)
                .required(),
        }),
});
