import type { Knex } from 'knex';

const EVENTS_FOLDER_ID = '2db8c911-b8e3-439a-bfc7-4198bde16725';
const CLUBS_FOLDER_ID = 'd6db3bfe-50fa-4e91-bc12-9fb5c8458dea';
const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);


export async function up(knex: Knex) {
    await knex('directus_permissions')
        .where({
            role: null,
            collection: 'directus_files',
            action: 'read',
        })
        .orWhere({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_folders',
            action: 'read',
        })
        .update({
            permissions: json(
                knex,
                {
                    _and: [ {
                        _or: [
                            { folder: { _eq: CLUBS_FOLDER_ID } },
                            { folder: { _eq: EVENTS_FOLDER_ID } },
                        ],
                    } ],
                }),
        });

    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'read',
        })
        .update({
            permissions: json(
                knex,
                {
                    _and: [ {
                        _or: [
                            { folder: { _eq: CLUBS_FOLDER_ID } },
                            { folder: { _eq: EVENTS_FOLDER_ID } },
                            { folder: { _null: true } },
                        ],
                    } ],
                },
            ),
        });

    await knex('directus_permissions')
        .where(
            {
                'role': COMMUNICATION_ROLE_ID,
                'collection': 'directus_files',
                'action': 'create',
            },
        )
        .update({
            validation: json(
                knex,
                {
                    _and: [ {
                        _or: [
                            { folder: { _eq: CLUBS_FOLDER_ID } },
                            { folder: { _eq: EVENTS_FOLDER_ID } },
                        ],
                    } ],
                },
            ),
        });

    await knex('directus_permissions').insert([
        {
            role: null,
            collection: 'events',
            action: 'read',
            permissions: json(knex, { _and: [ { visible: { _eq: true } } ] }),
            validation: null,
            presets: null,
            fields: 'id,name,description,poster,visible,date_start,date_end,hide_hours,cta_link,cta_text',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'events',
            action: 'create',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'events',
            action: 'read',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
        {
            role: COMMUNICATION_ROLE_ID,
            collection: 'events',
            action: 'update',
            permissions: {},
            validation: {},
            presets: null,
            fields: '*',
        },
    ]);
}

export async function down(knex: Knex) {
    await knex('directus_permissions')
        .where({
            role: null,
            collection: 'directus_files',
            action: 'read',
        })
        .orWhere({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_folders',
            action: 'read',
        })
        .update({
            permissions: json(
                knex,
                { _and: [ { folder: { _eq: CLUBS_FOLDER_ID } } ] },
            ),
        });

    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'read',
        })
        .update({
            permissions: json(
                knex,
                {
                    _and: [ {
                        _or: [
                            { folder: { _eq: CLUBS_FOLDER_ID } },
                            { folder: { _null: true } },
                        ],
                    } ],
                },
            ),
        });

    await knex('directus_permissions')
        .where({
            role: COMMUNICATION_ROLE_ID,
            collection: 'directus_files',
            action: 'create',
        })
        .update({
            validation: json(
                knex,
                { _and: [ { folder: { _eq: CLUBS_FOLDER_ID } } ] },
            ),
        });

    await knex('directus_permissions')
        .where({
            role: null,
            collection: 'events',
            action: 'read',
        })
        .orWhere({
            role: COMMUNICATION_ROLE_ID,
            collection: 'events',
            action: 'create',
        })
        .orWhere({
            role: COMMUNICATION_ROLE_ID,
            collection: 'events',
            action: 'read',
        })
        .orWhere({
            role: COMMUNICATION_ROLE_ID,
            collection: 'events',
            action: 'update',
        })
        .del();
}
