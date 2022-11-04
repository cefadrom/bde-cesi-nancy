import type { Directus, UserProfile } from '$lib/types';

export function getUserProfile(directus: Directus) {
    return directus.users.me.read(
        {
            fields: [ '*', 'promotion.*', 'role.id', 'role.name', 'role.admin_access' ],
        }) as Promise<UserProfile>;
}
