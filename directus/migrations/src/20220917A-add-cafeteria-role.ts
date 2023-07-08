import type { Knex } from 'knex';


const CAFET_ROLE_ID = 'af32a550-a3c4-47fa-b418-bcd35b9a0ffe';


export async function up(knex: Knex) {
    await knex('directus_roles').insert({
        id: CAFET_ROLE_ID,
        name: 'Pôle cafet',
        icon: 'coffee',
        description: 'Utilisateur capable d\'administrer la cafet',
        ip_access: null,
        enforce_tfa: 0,
        admin_access: 0,
        app_access: 1,
    });

    await knex('directus_permissions').insert([
        {
            role: CAFET_ROLE_ID,
            collection: 'directus_users',
            action: 'update',
            permissions: { _and: [ { id: { _eq: '$CURRENT_USER' } } ] },
            validation: null,
            presets: null,
            fields: 'language,theme',
        },
        {
            role: CAFET_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
            permissions: {},
            validation: null,
            presets: null,
            fields: 'first_name,last_name,promotion,email,membership_status,membership,status,role,divider-adpygi',
        },
        {
            role: CAFET_ROLE_ID,
            collection: 'promotions',
            action: 'read',
            permissions: {},
            validation: null,
            presets: null,
            fields: 'code,name',
        },
        {
            role: CAFET_ROLE_ID,
            collection: 'memberships',
            action: 'read',
            permissions: { _and: [ { id: { _eq: '$CURRENT_USER.membership' } } ] },
            validation: null,
            presets: null,
            fields: '*',
        },
        {
            role: CAFET_ROLE_ID,
            collection: 'directus_roles',
            action: 'read',
            permissions: {},
            validation: null,
            presets: null,
            fields: 'icon,id,name,description',
        },
    ]);
}

export async function down(knex: Knex) {
    await knex('directus_roles').where('id', CAFET_ROLE_ID).del();
    await knex('directus_permissions').where('role', CAFET_ROLE_ID).del();
}
