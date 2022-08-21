import { MigrationConfig } from '@types';

export default {
    up(knex) {
        return knex('directus_folders').insert({
            'id': 'f324901c-135c-4def-8531-e8783ea27d84',
            'name': 'Comptes CESI',
            'parent': null,
        });
    },
    down(knex) {
        return knex('directus_folders').where({
            'id': 'f324901c-135c-4def-8531-e8783ea27d84',
        }).del();
    },
} as MigrationConfig;
