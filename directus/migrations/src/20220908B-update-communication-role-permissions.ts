import type { Knex } from 'knex';

const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';
const CLUBS_FOLDER_ID = 'd6db3bfe-50fa-4e91-bc12-9fb5c8458dea';

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);

export async function up(knex: Knex) {
    await knex('directus_permissions')
        .insert({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_users',
            action: 'update',
            permissions: { _and: [ { id: { _eq: '$CURRENT_USER' } } ] },
            validation: null,
            presets: null,
            fields: 'language,theme',
        });

    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_folders',
            action: 'read',
        })
        .update({
            permissions: json(knex, { _and: [ { id: { _eq: CLUBS_FOLDER_ID } } ] }),
        });

    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'read',
        })
        .update({
            permissions: json(knex, { _and: [ { _or: [ { folder: { _eq: CLUBS_FOLDER_ID } }, { folder: { _null: true } } ] } ] }),
        });
    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'create',
        })
        .update({
            validation: json(knex, { _and: [ { folder: { _eq: CLUBS_FOLDER_ID } } ] }),
        });
    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'update',
        })
        .update({
            fields: 'title,description,tags,location,filename_disk,filename_download',
        });
}

export async function down(knex: Knex) {
    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_users',
            action: 'update',
        })
        .del();

    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_folders',
            action: 'read',
        })
        .update({
            permissions: json(knex, {}),
        });

    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'read',
        })
        .update({
            permissions: json(knex, {}),
        });
    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'create',
        })
        .update({
            validation: json(knex, {}),
        });
    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'update',
        })
        .update({
            fields: json(knex, {}),
        });
}
