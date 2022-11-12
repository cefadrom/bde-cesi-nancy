import type { Promotion, Role, User } from '@bde-cesi-nancy/types';
import type { Directus as IDirectus } from '@directus/sdk';

export type Directus = IDirectus;

export type LoginStatus = 'LOGGED_OUT' | 'LOGGING_IN' | 'LOGGED_IN';

export type UserProfile = Pick<
    User<Promotion, null, Pick<Role, 'id' | 'name' | 'admin_access'>>,
    'id' | 'first_name' | 'last_name' | 'email' | 'membership_status' | 'subscriptions' | 'promotion' | 'role'
>;
