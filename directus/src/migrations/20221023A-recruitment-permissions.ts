import { MigrationConfig } from '@types';

export default {
    async up(knex) {
        await knex('directus_permissions').insert({
            role: null,
            collection: 'recruitment',
            action: 'read',
            permissions: { '_and': [ { 'visible': { '_eq': true } } ] },
            validation: {},
            presets: null,
            fields: 'id,title,subtitle,description',
        });
    },
    async down(knex) {
        await knex('directus_permissions').where({
            role: null,
            collection: 'recruitment',
            action: 'read',
        }).del();
    },
} as MigrationConfig;
