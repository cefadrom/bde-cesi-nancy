import type { Knex } from 'knex';


const EVENTS_FOLDER_ID = '2db8c911-b8e3-439a-bfc7-4198bde16725';


export async function up(knex: Knex) {
    await knex('directus_folders').insert({
        id: EVENTS_FOLDER_ID,
        name: 'Évènements',
    });
}

export async function down(knex: Knex) {
    await knex('directus_folders')
        .where({ id: EVENTS_FOLDER_ID })
        .del();
}
