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
    import type { RootLayoutLoad } from './+layout.server';

    export let data: RootLayoutLoad = { me: null };

    const directus = new Directus(env.PUBLIC_DIRECTUS_URL);
    const me = writable<UserProfile | null>(data.me);
    const loginStatus = writable<LoginStatus>(data.me ? 'LOGGED_IN' : 'LOGGED_OUT');

    setContext('directus', directus);
    setContext('me', me);
    setContext('loginStatus', loginStatus);

    // Refresh the token for the logged-in user, so directus can access the API
    onMount(async () => {
        // Don't try to refresh the token if we're not logged in
        if ($loginStatus === 'LOGGED_OUT')
            return;

        // Don't refresh if we're on the login page, let it handle it
        if ($page.url.pathname === '/login')
            return;

        try {
            await directus.auth.refresh();
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
