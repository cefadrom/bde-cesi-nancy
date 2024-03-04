import type { Knex } from 'knex';

const BUREAU_ROLE = '87ab5db5-589a-4834-8233-6cd3ca79aae6';
const COMMUNICATION_ROLE = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';
const CAFET_ROLE = 'af32a550-a3c4-47fa-b418-bcd35b9a0ffe';

export async function up(knex: Knex) {
    await knex('directus_permissions').insert([
        {
            role: null,
            collection: 'banners',
            action: 'read',
            permissions: { _and: [ { status: { _eq: 'visible' } } ] },
            validation: null,
            presets: null,
            fields: 'id,title,message,foreground_color,background_color',
        },
        {
            role: BUREAU_ROLE,
            collection: 'banners',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: BUREAU_ROLE,
            collection: 'banners',
            action: 'create',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: BUREAU_ROLE,
            collection: 'banners',
            action: 'update',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: COMMUNICATION_ROLE,
            collection: 'banners',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: COMMUNICATION_ROLE,
            collection: 'banners',
            action: 'create',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: COMMUNICATION_ROLE,
            collection: 'banners',
            action: 'update',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: CAFET_ROLE,
            collection: 'banners',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: CAFET_ROLE,
            collection: 'banners',
            action: 'create',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: CAFET_ROLE,
            collection: 'banners',
            action: 'update',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
    ]);
}

export async function down(knex: Knex) {
    await knex('directus_permissions').where({ collection: 'banners' }).del();
}
