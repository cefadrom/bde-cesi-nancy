import { env } from '$env/dynamic/public';
import type { Club } from '@bde-cesi-nancy/types';
import type { Load } from '@sveltejs/kit';

type RawClubData = { data?: Club[] };

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ fetch }) => {
    try {
        const res = await fetch(`${env.PUBLIC_DIRECTUS_URL}/items/clubs?limit=25`);
        const clubs = await res.json() as RawClubData;
        return {
            clubs: clubs
                    ?.data
                    ?.map(club => ({ ...club, thumbnail: `${env.PUBLIC_DIRECTUS_URL}/assets/${club.thumbnail}` }))
                || [],
        };
    } catch (e) {
        console.error(e);
        return { clubs: [] };
    }
};
