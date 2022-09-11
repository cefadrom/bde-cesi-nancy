import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ cookies }) => {
    const refreshToken = cookies.get('directus_refresh_token');

    return { hasRefreshToken: !!refreshToken };
};
