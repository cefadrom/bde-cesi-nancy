import { env } from '$env/dynamic/public';
import type { Recruitment } from '@bde-cesi-nancy/types';
import type { Load } from '@sveltejs/kit';

type RawRecruitmentData = { data?: Recruitment[] };

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ fetch }) => {
    try {
        const res = await fetch(`${env.PUBLIC_DIRECTUS_URL}/items/recruitment`);
        const recruitment = await res.json() as RawRecruitmentData;
        return {
            recruitment: recruitment.data,
        };
    } catch (e) {
        console.error(e);
        return { recruitment: [] };
    }
};
