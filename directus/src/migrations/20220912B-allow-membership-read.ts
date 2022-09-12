import type { MigrationConfig } from '@types';
import { Knex } from 'knex';


const USER_ROLE_ID = '71df4bc0-8079-4d6d-b7e6-5d69929f4269';
const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);


export default {
    async up(knex) {
        await knex('directus_permissions')
            .where({
                role: USER_ROLE_ID,
                collection: 'directus_users',
                action: 'read',
            })
            .orWhere({
                role: COMMUNICATION_ROLE_ID,
                collection: 'directus_users',
                action: 'read',
            })
            .update({
                fields: 'promotion,divider-adpygi,membership_status,membership',
            });

        await knex('directus_permissions')
            .insert([
                {
                    role: USER_ROLE_ID,
                    collection: 'memberships',
                    action: 'read',
                    permissions: json(knex, { _and: [ { id: { _eq: '$CURRENT_USER.membership' } } ] }),
                    fields: '*',
                },
                {
                    role: COMMUNICATION_ROLE_ID,
                    collection: 'memberships',
                    action: 'read',
                    permissions: json(knex, { _and: [ { id: { _eq: '$CURRENT_USER.membership' } } ] }),
                    fields: '*',
                },
            ]);
    },
    async down(knex) {
        await knex('directus_permissions')
            .where({
                role: USER_ROLE_ID,
                collection: 'directus_users',
                action: 'read',
            })
            .orWhere({
                role: COMMUNICATION_ROLE_ID,
                collection: 'directus_users',
                action: 'read',
            })
            .update({
                fields: 'promotion,divider-adpygi',
            });

        await knex('directus_permissions')
            .where({
                role: USER_ROLE_ID,
                collection: 'memberships',
                action: 'read',
            })
            .orWhere({
                role: COMMUNICATION_ROLE_ID,
                collection: 'memberships',
                action: 'read',
            })
            .del();
    },
} as MigrationConfig;
