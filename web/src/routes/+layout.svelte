<script lang="ts">
    import { page } from '$app/stores';
    import { env } from '$env/dynamic/public';
    import '$lib/global.css';
    import type { LoginStatus, UserProfile } from '$lib/types';
    import Footer from '@bde-cesi-nancy/components/src/Footer/Footer.svelte';
    import Header from '@bde-cesi-nancy/components/src/Header/Header.svelte';
    import { Directus } from '@directus/sdk';
    import { onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { getUserProfile } from '$lib/api/getUserProfile';

    export let data: { hasRefreshToken: boolean };

    const directus = new Directus(env.PUBLIC_DIRECTUS_URL);
    const me = writable<UserProfile | null>(null);
    const loginStatus = writable<LoginStatus>('LOGGING_IN');

    setContext('directus', directus);
    setContext('me', me);
    setContext('loginStatus', loginStatus);

    // Tries to connect if a valid token is found
    onMount(async () => {
        // Don't refresh if we're on the login page, let it handle it
        if ($page.url.pathname === '/login')
            return;

        // Don't even try to refresh if there is no refresh cookie
        if (!data.hasRefreshToken) {
            loginStatus.set('LOGGED_OUT');
            return;
        }

        try {
            await directus.auth.refresh();
            $me = await getUserProfile(directus);
            $loginStatus = 'LOGGED_IN';
        } catch {
            $loginStatus = 'LOGGED_OUT';
        }
    });
</script>


<style>
    main {
        min-height: 100vh;
    }
</style>


<Header/>
<main>
    <slot/>
</main>
<Footer/>
