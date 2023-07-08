import type { Knex } from 'knex';

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);

export async function up(knex: Knex) {
    await knex('directus_permissions').insert([
        {
            role: null,
            collection: 'organization_chart',
            action: 'read',
            permissions: json(knex, { _and: [ { _or: [ { archived: { _eq: false } }, { archived: { _null: true } } ] } ] }),
            validation: null,
            presets: null,
            fields: 'id,sort,account,pole,role',
        },
    ]);
}

export async function down(knex: Knex) {
    await knex('directus_permissions')
        .where({
            role: null,
            collection: 'organization_chart',
            action: 'read',
        })
        .del();
}
