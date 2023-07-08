import type { Knex } from 'knex';


const USER_ROLE_ID = '71df4bc0-8079-4d6d-b7e6-5d69929f4269';
const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);


export async function up(knex: Knex) {
    await knex('directus_permissions')
        .where({
            role: USER_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
        })
        .orWhere({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
        })
        .update({
            permissions: json(knex, { '_and': [ { 'id': { '_eq': '$CURRENT_USER' } } ] }),
        });
}

export async function down(knex: Knex) {
    await knex('directus_permissions')
        .where({
            role: USER_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
        })
        .orWhere({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
        })
        .update({
            permissions: null,
        });
}
