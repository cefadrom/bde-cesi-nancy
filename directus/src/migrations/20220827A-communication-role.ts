import type { MigrationConfig } from '@types';

export default {
    async up(knex) {
        await knex('directus_roles').insert({
            id: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
            name: 'Pôle Communication',
            icon: 'campaign',
            description: 'Utilisateur chargé de la communication du BDE',
            ip_access: null,
            enforce_tfa: 0,
            admin_access: 0,
            app_access: 1,
        });

        await knex('directus_permissions').insert([
            {
                id: 4,
                role: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
                collection: 'contact',
                action: 'read',
                permissions: {},
                validation: {},
                presets: null,
                fields: '*',
            },
            {
                id: 5,
                role: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
                collection: 'contact',
                action: 'update',
                permissions: null,
                validation: null,
                presets: null,
                fields: 'resolved',
            },
            {
                id: 6,
                role: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
                collection: 'directus_folders',
                action: 'read',
                permissions: {},
                validation: {},
                presets: null,
                fields: '*',
            },
            {
                id: 7,
                role: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
                collection: 'directus_files',
                action: 'read',
                permissions: {},
                validation: {},
                presets: null,
                fields: '*',
            },
            {
                id: 8,
                role: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
                collection: 'directus_files',
                action: 'create',
                permissions: null,
                validation: {},
                presets: null,
                fields: null,
            },
            {
                id: 9,
                role: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
                collection: 'directus_files',
                action: 'update',
                permissions: { _and: [ { uploaded_by: { _eq: '$CURRENT_USER' } } ] },
                validation: null,
                presets: null,
                fields: null,
            },
            {
                id: 10,
                role: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75',
                collection: 'directus_files',
                action: 'delete',
                permissions: { _and: [ { uploaded_by: { _eq: '$CURRENT_USER' } } ] },
                validation: null,
                presets: null,
                fields: null,
            },
        ]);
    },
    async down(knex) {
        await knex('directus_roles')
            .where({ id: 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75' })
            .del();
        await knex('directus_permissions')
            .whereIn('id', [ 4, 5, 6, 7, 8, 9 ])
            .del();
    },
} as MigrationConfig;
