import { MigrationConfig } from '@types';

export default {
    async up(knex) {
        await knex
            .schema
            .alterTable('directus_sessions', (table) => {
                table.string('user_agent', 511).alter();
            })
            .alterTable('directus_activity', (table) => {
                table.string('user_agent', 511).alter();
            });
    },
    async down(knex) {
        await knex
            .schema
            .alterTable('directus_sessions', (table) => {
                table.string('user_agent', 255).alter();
            })
            .alterTable('directus_activity', (table) => {
                table.string('user_agent', 255).alter();
            });
    },
} as MigrationConfig;
