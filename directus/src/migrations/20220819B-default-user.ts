import type { MigrationConfig } from '@types';

const USER_ROLE_ID = process.env.AUTH_MICROSOFT_DEFAULT_ROLE_ID;
if (typeof USER_ROLE_ID !== 'string') {
    throw new Error('Error on migration 20220819B-default-user: env AUTH_MICROSOFT_DEFAULT_ROLE_ID is not set');
}

export default {
    up: async (knex) => {
        await knex('directus_roles').insert({
            'id': USER_ROLE_ID,
            'name': 'User',
            'icon': 'person',
            'description': 'Basic role from for users, with no special access',
            'ip_access': null,
            'enforce_tfa': 0,
            'admin_access': 0,
            'app_access': 1,
        });
        return knex('directus_permissions').insert([
            {
                'role': USER_ROLE_ID,
                'collection': 'directus_files',
                'action': 'read',
                'permissions': {},
                'validation': {},
                'presets': null,
                'fields': '*',
            },
            {
                'role': USER_ROLE_ID,
                'collection': 'directus_folders',
                'action': 'read',
                'permissions': {},
                'validation': {},
                'presets': null,
                'fields': '*',
            },
            {
                'role': USER_ROLE_ID,
                'collection': 'directus_users',
                'action': 'update',
                'permissions': { '_and': [ { 'id': { '_eq': '$CURRENT_USER' } } ] },
                'validation': null,
                'presets': null,
                'fields': 'language,theme',
            },
        ]);
    },
    down: async (knex) => {
        await knex('directus_roles').where({ 'id': USER_ROLE_ID }).delete();
        return knex('directus_permissions').where({ 'role': USER_ROLE_ID }).delete();
    },
} as MigrationConfig;
