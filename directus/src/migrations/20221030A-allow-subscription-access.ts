import type { MigrationConfig } from '@types';
import type { Knex } from 'knex';


const USER_ROLE_ID = '71df4bc0-8079-4d6d-b7e6-5d69929f4269';
const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';
const CAFET_ROLE_ID = 'af32a550-a3c4-47fa-b418-bcd35b9a0ffe';


async function setFields(knex: Knex, base: string, cafet: string) {
    await knex('directus_permissions')
        .whereIn('role', [ USER_ROLE_ID, COMMUNICATION_ROLE_ID ])
        .andWhere('collection', 'directus_users')
        .andWhere('action', 'read')
        .update({
            fields: base,
        });

    await knex('directus_permissions')
        .where({
            role: CAFET_ROLE_ID,
            collection: 'directus_users',
            action: 'read',
        })
        .update({
            fields: cafet,
        });
}


export default {
    async up(knex) {
        await setFields(
            knex,
            'promotion,divider-adpygi,membership_status,membership,subscriptions',
            'first_name,last_name,promotion,email,membership_status,membership,status,role,divider-adpygi,subscriptions',
        );
    },
    async down(knex) {
        await setFields(
            knex,
            'promotion,divider-adpygi,membership_status,membership',
            'first_name,last_name,promotion,email,membership_status,membership,status,role,divider-adpygi',
        );
    },
} as MigrationConfig;
