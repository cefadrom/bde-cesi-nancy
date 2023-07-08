import type { Knex } from 'knex';


export async function up(knex: Knex) {
    await knex('directus_permissions').insert({
        role: null,
        collection: 'recruitment',
        action: 'read',
        permissions: { '_and': [ { 'visible': { '_eq': true } } ] },
        validation: {},
        presets: null,
        fields: 'id,title,subtitle,description',
    });
}


export async function down(knex: Knex) {
    await knex('directus_permissions').where({
        role: null,
        collection: 'recruitment',
        action: 'read',
    }).del();
}
