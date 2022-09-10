<script lang="ts">
    import { goto } from '$app/navigation';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { Directus, LoginStatus } from '$lib/types';
    import LoadingSpinner from '@bde-cesi-nancy/components/src/LoadingSpinner/LoadingSpinner.svelte';
    import type { User } from '@bde-cesi-nancy/types';
    import { getContext, onMount } from 'svelte';

    export let data: { refreshToken?: string };

    const directus = getContext<Directus>('directus');
    const me = getContext<User>('me');
    const loginStatus = getContext<LoginStatus>('loginStatus');

    let error: string | null = null;

    onMount(async () => {
        try {

            $loginStatus = 'LOGGING_IN';

            if (!data.refreshToken)
                throw new Error('No refresh token provided');

            // Set refresh token to storage and delete potential old access token
            directus
                .storage
                .set('auth_refresh_token', data.refreshToken);
            directus
                .storage
                .delete('auth_token');

            // Get new access token
            await directus
                .auth
                .refresh();

            // Load user
            $me = await directus.users.me.read() as User;
            $loginStatus = 'LOGGED_IN';

            // Redirect to member page
            await goto('/member-dashboard');
        } catch (err) {
            console.error(err);
            error = err.message;
            $loginStatus = 'LOGGED_OUT';
        }
    });
</script>


<Meta title="Connexion en cours" noindex/>


<SectionContainer header>
    {#if !error}
        <LoadingSpinner/>
    {:else}
        <h1 class="header-1">Erreur</h1>
        <p class="body">{error}</p>
    {/if}
</SectionContainer>
