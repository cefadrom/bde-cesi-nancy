import { dev } from '$app/environment';
import { env as _env } from '$env/dynamic/private';
import { env } from '$env/dynamic/public';
import { fetchUserProfile } from '$lib/api/fetchUserProfile';
import type { UserProfile } from '$lib/types';
import { Directus, MemoryStorage } from '@directus/sdk';
import type { ServerLoad } from '@sveltejs/kit';

const { PUBLIC_DIRECTUS_URL } = env;
const { REFRESH_TOKEN_COOKIE_DOMAIN } = _env;

export interface RootLayoutLoad {
    me: UserProfile | null;
}

export const load: ServerLoad = async ({ cookies, request }) => {
    const refreshToken = cookies.get('directus_refresh_token');

    let me: null | UserProfile = null;

    // Cannot use the `url` from sveltekit, or it will trigger a call to this load function
    // when navigating inside the app
    if (refreshToken && new URL(request.url).pathname !== '/login') {
        try {
            const directus = new Directus(PUBLIC_DIRECTUS_URL!, {
                storage: new MemoryStorage(),
            });
            directus.storage.set('auth_refresh_token', refreshToken);
            const res = await directus.auth.refresh();

            if (!res) {
                throw new Error('Cannot refresh token');
            }

            me = await fetchUserProfile(directus);

            cookies.set(
                'directus_refresh_token',
                res.refresh_token!,
                {
                    domain: REFRESH_TOKEN_COOKIE_DOMAIN,
                    path: '/',
                    httpOnly: true,
                    secure: !dev,
                    sameSite: dev ? 'lax' : 'none',
                },
            );
        } catch {
        }
    }

    return { me } as RootLayoutLoad;
};
