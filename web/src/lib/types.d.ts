import type { Directus as IDirectus } from '@directus/sdk';

export type Directus = IDirectus;

export type LoginStatus = 'LOGGED_OUT' | 'LOGGING_IN' | 'LOGGED_IN';
