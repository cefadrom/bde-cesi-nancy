import Joi from 'joi';

export const validSubscriptions = [
    'announcement',
    'club',
    'event',
    'contact',
    'unauthorized-login',
    'helloasso-log',
] as const;

export type IValidSubscriptions = (typeof validSubscriptions[number])[];

// An array that can contain announcement, club or event
export const PushSettingsSchema = Joi.object({
    subscriptions: Joi
        .array()
        .required()
        .allow(null)
        .items(Joi
            .string()
            .valid(...validSubscriptions),
        ),
});
