import { MigrationConfig } from '@types';


const EVENTS_FOLDER_ID = '2db8c911-b8e3-439a-bfc7-4198bde16725';


export default {
    async up(knex) {
        await knex('directus_folders').insert({
            id: EVENTS_FOLDER_ID,
            name: 'Évènements',
        });
    },
    async down(knex) {
        await knex('directus_folders')
            .where({ id: EVENTS_FOLDER_ID })
            .del();
    },
} as MigrationConfig;
