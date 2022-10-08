import { env } from '$env/dynamic/public';
import type { Event } from '@bde-cesi-nancy/types';
import type { Load } from '@sveltejs/kit';

type RawEventData = { data?: Event[] };


let queryFilters = new URLSearchParams({
    limit: '10',
    sort: 'date_start',
    filter: JSON.stringify(
        {
            _or: [
                { date_start: { _gte: '$NOW' } },
                { date_end: { _gte: '$NOW' } },
            ],
        },
    ),
}).toString();


/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ fetch }) => {
    try {
        const res = await fetch(`${env.PUBLIC_DIRECTUS_URL}/items/events?${queryFilters}`);
        const events = await res.json() as RawEventData;
        return {
            events: events
                    ?.data
                    ?.map(event => ({
                        ...event,
                        poster: `${env.PUBLIC_DIRECTUS_URL}/assets/${event.poster}`,
                        date_start: new Date(event.date_start),
                        date_end: event.date_end && new Date(event.date_end),
                    }))
                || [],
        };
    } catch (e) {
        console.error(e);
        return { events: [] };
    }
};
