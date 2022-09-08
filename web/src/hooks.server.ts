import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
    if (request.url.startsWith(publicEnv.PUBLIC_DIRECTUS_URL))
        request = new Request(
            request.url.replace(publicEnv.PUBLIC_DIRECTUS_URL, privateEnv.DIRECTUS_LOCAL_URL),
            request,
        );

    return fetch(request);
};
