import type { Knex } from 'knex';

const ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';

export async function up(knex: Knex) {
    await knex('directus_roles').insert({
        id: ROLE_ID,
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
            role: ROLE_ID,
            collection: 'contact',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: ROLE_ID,
            collection: 'contact',
            action: 'update',
            permissions: null,
            validation: null,
            presets: null,
            fields: 'resolved',
        },
        {
            role: ROLE_ID,
            collection: 'directus_folders',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: ROLE_ID,
            collection: 'directus_files',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: ROLE_ID,
            collection: 'directus_files',
            action: 'create',
            permissions: null,
            validation: {},
            presets: null,
            fields: null,
        },
        {
            role: ROLE_ID,
            collection: 'directus_files',
            action: 'update',
            permissions: { _and: [ { uploaded_by: { _eq: '$CURRENT_USER' } } ] },
            validation: null,
            presets: null,
            fields: null,
        },
        {
            role: ROLE_ID,
            collection: 'directus_files',
            action: 'delete',
            permissions: { _and: [ { uploaded_by: { _eq: '$CURRENT_USER' } } ] },
            validation: null,
            presets: null,
            fields: null,
        },
    ]);
}

export async function down(knex: Knex) {
    await knex('directus_roles')
        .where({ id: ROLE_ID })
        .del();
    await knex('directus_permissions')
        .where('role', ROLE_ID)
        .del();
}
