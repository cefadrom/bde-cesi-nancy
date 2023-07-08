import type { Knex } from 'knex';

export async function up(knex: Knex) {
    await knex
        .schema
        .alterTable('directus_sessions', (table) => {
            table.string('user_agent', 511).alter();
        })
        .alterTable('directus_activity', (table) => {
            table.string('user_agent', 511).alter();
        });
}

export async function down(knex: Knex) {
    await knex
        .schema
        .alterTable('directus_sessions', (table) => {
            table.string('user_agent', 255).alter();
        })
        .alterTable('directus_activity', (table) => {
            table.string('user_agent', 255).alter();
        });
}
