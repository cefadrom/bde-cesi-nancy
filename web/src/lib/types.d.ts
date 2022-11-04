import type { Promotion, Role, User } from '@bde-cesi-nancy/types';
import type { Directus as IDirectus } from '@directus/sdk';

export type Directus = IDirectus;

export type LoginStatus = 'LOGGED_OUT' | 'LOGGING_IN' | 'LOGGED_IN';

export type UserProfile = User<Promotion, string, Pick<Role, 'id' | 'name' | 'admin_access'>>;
