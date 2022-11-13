import type { Directus, LoginStatus, UserProfile } from '$lib/types';
import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export const USER_PROFILE_KEY = 'me';
export const DIRECTUS_KEY = 'directus';
export const LOGIN_STATUS_KEY = 'loginStatus';

export const getUserProfile = <Nullable = null>() => {
    type UserProfileStore = Nullable extends boolean ? Writable<UserProfile> | null : Writable<UserProfile>;
    return getContext<UserProfileStore>(USER_PROFILE_KEY);
};
export const getDirectus = () => getContext<Directus>(DIRECTUS_KEY);
export const getLoginStatus = () => getContext<Writable<LoginStatus>>(LOGIN_STATUS_KEY);
