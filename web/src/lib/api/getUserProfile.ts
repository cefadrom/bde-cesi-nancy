import type { Directus } from '$lib/types';
import type { User, Promotion } from '@bde-cesi-nancy/types';

export function getUserProfile(directus: Directus) {
    return directus.users.me.read({ fields: [ '*', 'promotion.*' ] }) as Promise<User<Promotion>>;
}
