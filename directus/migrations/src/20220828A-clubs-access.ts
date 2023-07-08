import type { Knex } from 'knex';

const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';


export async function up(knex: Knex) {
    await knex('directus_permissions').insert([
        {
            role: null,
            collection: 'clubs',
            action: 'read',
            permissions: { _and: [ { visible: { _eq: true } } ] },
            validation: {},
            presets: null,
            fields: 'id,name,description,president_name,contact_email,visible,thumbnail',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'clubs',
            action: 'create',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'clubs',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'clubs',
            action: 'update',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
    ]);
}

export async function down(knex: Knex) {
    await knex('directus_permissions')
        .where({ collection: 'clubs' })
        .del();
}
