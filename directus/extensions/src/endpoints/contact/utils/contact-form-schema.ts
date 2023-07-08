import type { IContactFormData } from '@bde-cesi-nancy/types/api';
import Joi from 'joi';


const JoiName = Joi
    .string()
    .min(2)
    .max(63)
    .required()
    .trim();


export const contactFormSchema = Joi.object<IContactFormData>({
    firstName: JoiName,

    lastName: JoiName,

    email: Joi
        .string()
        .email()
        .required()
        .trim(),

    category: Joi
        .string()
        .required()
        .valid('bureau', 'club', 'communication', 'info', 'autre'),

    subject: Joi
        .string()
        .min(2)
        .max(127)
        .required()
        .trim(),

    message: Joi
        .string()
        .min(2)
        .max(1024)
        .required()
        .trim(),
});
