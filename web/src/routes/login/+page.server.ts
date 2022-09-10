import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: ServerLoad = ({ cookies }) => {
    const refreshToken = cookies.get('directus_refresh_token');

    if (!refreshToken)
        throw redirect(302, '/members');

    cookies.delete('directus_refresh_token');

    return { refreshToken };
};
