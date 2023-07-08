import type { Knex } from 'knex';


const USER_ROLE_ID = '71df4bc0-8079-4d6d-b7e6-5d69929f4269';
const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';


export async function up(knex: Knex) {
    await knex('directus_permissions').insert([
        {
            role: USER_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
            permissions: null,
            validation: null,
            presets: null,
            fields: 'promotion,divider-adpygi',
        },
        {
            role: USER_ROLE_ID,
            collection: 'promotions',
            action: 'read',
            permissions: { _and: [ { code: { _eq: '$CURRENT_USER.promotion' } } ] },
            validation: null,
            presets: null,
            fields: 'code,name',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
            permissions: null,
            validation: null,
            presets: null,
            fields: 'promotion,divider-adpygi',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'promotions',
            action: 'read',
            permissions: { _and: [ { code: { _eq: '$CURRENT_USER.promotion' } } ] },
            validation: null,
            presets: null,
            fields: 'code,name',
        },
    ]);
}

export async function down(knex: Knex) {
    await knex('directus_permissions').where({
        role: USER_ROLE_ID,
        collection: 'directus_users',
        action: 'read',
    }).orWhere({
        role: USER_ROLE_ID,
        collection: 'promotions',
        action: 'read',
    }).orWhere({
        role: COMMUNICATION_ROLE_ID,
        collection: 'directus_users',
        action: 'read',
    }).orWhere({
        role: COMMUNICATION_ROLE_ID,
        collection: 'promotions',
        action: 'read',
    }).del();
}
