import type { MigrationConfig } from '@types';
import type { Knex } from 'knex';

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);

export default {
    async up(knex) {
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
    },
    async down(knex) {
        await knex('directus_permissions')
            .where({
                role: null,
                collection: 'organization_chart',
                action: 'read',
            })
            .del();
    },
} as MigrationConfig;
