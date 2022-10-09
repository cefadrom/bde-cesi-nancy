import { MigrationConfig } from '@types';
import type { Knex } from 'knex';

// Weird workaround to update json, because it crashes by default
const json = (knex: Knex, value: any) => knex.raw(`('${JSON.stringify(value)}')`);

export default {
    async up(knex) {
        await knex('directus_settings').update({
            storage_asset_transform: 'presets',
            storage_asset_presets: json(knex, [ {
                fit: 'inside',
                key: 'event-thumb',
                width: 300,
                format: 'webp',
                height: 300,
                quality: 80,
                transforms: [],
                withoutEnlargement: true,
            }, {
                fit: 'inside',
                key: 'club-thumb',
                width: 240,
                format: 'webp',
                height: 240,
                quality: 95,
                transforms: [],
                withoutEnlargement: true,
            } ]),
        });
    },
    async down(knex) {
        await knex('directus_settings').update({
            storage_asset_transform: 'all',
            storage_asset_presets: null,
        });
    },
} as MigrationConfig;
