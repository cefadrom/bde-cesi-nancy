import type { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex('directus_folders').insert({
        'id': 'f324901c-135c-4def-8531-e8783ea27d84',
        'name': 'Comptes CESI',
        'parent': null,
    });
}

export async function down(knex: Knex) {
    return knex('directus_folders').where({
        'id': 'f324901c-135c-4def-8531-e8783ea27d84',
    }).del();
}
