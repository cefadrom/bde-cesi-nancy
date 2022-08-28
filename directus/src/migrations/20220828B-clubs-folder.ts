import { MigrationConfig } from '@types';

const CLUBS_FOLDER_ID = 'd6db3bfe-50fa-4e91-bc12-9fb5c8458dea';

export default {
    async up(knex) {
        await knex('directus_folders').insert({
            id: CLUBS_FOLDER_ID,
            name: 'Clubs',
            parent: null,
        });

        await knex('directus_permissions').insert({
            role: null,
            collection: 'directus_files',
            action: 'read',
            permissions: { _and: [ { folder: { _eq: CLUBS_FOLDER_ID } } ] },
            validation: {},
            presets: null,
            fields: 'id',
        });
    },
    async down(knex) {
        await knex('directus_folders').where({
            id: CLUBS_FOLDER_ID,
        }).del();

        await knex('directus_permissions')
            .where({
                role: null,
                collection: 'directus_files',
                action: 'read',
            })
            .del();
    },
} as MigrationConfig;
