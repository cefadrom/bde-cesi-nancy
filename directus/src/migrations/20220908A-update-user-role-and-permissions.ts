import { MigrationConfig } from '@types';

const USER_ROLE_ID = process.env.AUTH_MICROSOFT_DEFAULT_ROLE_ID;
if (typeof USER_ROLE_ID !== 'string') {
    throw new Error('Error on migration 20220819B-default-user: env AUTH_MICROSOFT_DEFAULT_ROLE_ID is not set');
}

export default {
    async up(knex) {
        await knex('directus_roles')
            .where({ id: USER_ROLE_ID })
            .update({
                name: 'Utilisateur',
                description: 'Rôle de base des utilisateurs lors de la première connexion. Aucun accès particulier n\'est accordé.',
            });

        await knex('directus_permissions')
            .where({
                role: USER_ROLE_ID,
                collection: 'directus_files',
                action: 'read',
            })
            .orWhere({
                role: USER_ROLE_ID,
                collection: 'directus_folders',
                action: 'read',
            })
            .del();
    },
    async down(knex) {
        await knex('directus_roles')
            .where({ id: USER_ROLE_ID })
            .update({
                name: 'User',
                description: 'Basic role from for users, with no special access',
            });

        await knex('directus_permissions')
            .insert([
                {
                    role: USER_ROLE_ID,
                    collection: 'directus_files',
                    action: 'read',
                    permissions: {},
                    validation: {},
                    presets: null,
                    fields: '*',
                },
                {
                    role: USER_ROLE_ID,
                    collection: 'directus_folders',
                    action: 'read',
                    permissions: {},
                    validation: {},
                    presets: null,
                    fields: '*',
                },
            ]);
    },
} as MigrationConfig;
