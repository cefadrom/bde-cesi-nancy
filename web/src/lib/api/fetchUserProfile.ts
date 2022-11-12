import type { Directus, UserProfile } from '$lib/types';

export function fetchUserProfile(directus: Directus) {
    return directus.users.me.read(
        {
            fields: [
                'id',
                'first_name',
                'last_name',
                'email',
                'membership_status',
                'subscriptions',
                'promotion.*',
                'role.id',
                'role.name',
                'role.admin_access' ],
        }) as Promise<UserProfile>;
}
